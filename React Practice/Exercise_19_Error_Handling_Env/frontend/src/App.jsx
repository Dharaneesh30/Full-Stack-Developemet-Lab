import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const Home = () => <div><h2>Home</h2><p>Welcome to our site!</p></div>;

const Products = () => (
  <div>
    <h2>Products</h2>
    <ul>
      <li><Link to="/products/1">Product 1</Link></li>
      <li><Link to="/products/2">Product 2</Link></li>
      <li><Link to="/products/3">Product 3</Link></li>
    </ul>
  </div>
);

const ProductDetails = () => {
  const { id } = useParams();
  return (
    <div>
      <h2>Product Details</h2>
      <p>Viewing details for product ID: {id}</p>
    </div>
  );
};

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/register', { username, password });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <br/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br/>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

const Login = ({ setAuthUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', { username, password });
      setMessage(res.data.message);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        const decoded = jwtDecode(res.data.token);
        setAuthUser(decoded);
        navigate('/dashboard');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <br/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br/>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

const Dashboard = ({ authUser }) => {
  const [protectedData, setProtectedData] = useState('');
  
  const fetchProtectedData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/protected', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProtectedData(res.data.message);
    } catch (err) {
      setProtectedData('Unauthorized access to protected API');
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Protected area! Welcome {authUser?.username}.</p>
      <button onClick={fetchProtectedData}>Test Protected API Access</button>
      {protectedData && <p>{protectedData}</p>}
    </div>
  );
};

const ProtectedRoute = ({ children, authUser }) => {
  if (!authUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const Navigation = ({ authUser, handleLogout }) => (
  <nav style={{ padding: '10px', background: '#eee', marginBottom: '20px' }}>
    <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
    <Link to="/products" style={{ marginRight: '10px' }}>Products</Link>
    {!authUser ? (
      <>
        <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
        <Link to="/register" style={{ marginRight: '10px' }}>Register</Link>
      </>
    ) : (
      <>
        <Link to="/dashboard" style={{ marginRight: '10px' }}>Dashboard</Link>
        <button onClick={handleLogout}>Logout</button>
      </>
    )}
  </nav>
);

const App = () => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Check if token expired
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          setAuthUser(null);
        } else {
          setAuthUser(decoded);
        }
      } catch (e) {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthUser(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <div style={{ fontFamily: 'Arial', margin: '20px' }}>
        <h1>React Router Exercise</h1>
        <Navigation authUser={authUser} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/login" element={authUser ? <Navigate to="/dashboard" replace /> : <Login setAuthUser={setAuthUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <ProtectedRoute authUser={authUser}>
              <Dashboard authUser={authUser} />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

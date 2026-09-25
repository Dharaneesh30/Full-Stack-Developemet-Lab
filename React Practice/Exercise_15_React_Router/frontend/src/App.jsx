import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

const Home = () => <div><h2>Home</h2><p>Welcome to our site!</p></div>;
const Login = () => <div><h2>Login</h2><p>Login form will go here</p></div>;
const Register = () => <div><h2>Register</h2><p>Registration form will go here</p></div>;
const Dashboard = () => <div><h2>Dashboard</h2><p>Protected area!</p></div>;

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

const Navigation = () => (
  <nav style={{ padding: '10px', background: '#eee', marginBottom: '20px' }}>
    <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
    <Link to="/products" style={{ marginRight: '10px' }}>Products</Link>
    <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
    <Link to="/register" style={{ marginRight: '10px' }}>Register</Link>
    <Link to="/dashboard">Dashboard</Link>
  </nav>
);

const App = () => {
  return (
    <Router>
      <div style={{ fontFamily: 'Arial', margin: '20px' }}>
        <h1>React Router Exercise</h1>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

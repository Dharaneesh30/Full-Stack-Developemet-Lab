import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/tasks';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (err) {
      setError('Failed to fetch tasks');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchTasks();
      } catch (err) {
        setError('Failed to delete task');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`${API_URL}/${id}`, { status: newStatus });
      fetchTasks();
    } catch (err) {
      setError('Failed to update status');
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Link to="/create"><button style={{ marginBottom: '15px' }}>Create New Task</button></Link>
      <div className="task-container">
        {tasks.map(task => (
          <div key={task._id} className="task-card">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>
              Status: 
              <select value={task.status} onChange={(e) => handleStatusChange(task._id, e.target.value)}>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </p>
            <Link to={`/edit/${task._id}`}><button>Edit</button></Link>
            <button onClick={() => handleDelete(task._id)} style={{ backgroundColor: 'red', color: 'white', marginLeft: '10px' }}>Delete</button>
          </div>
        ))}
        {tasks.length === 0 && <p>No tasks found.</p>}
      </div>
    </div>
  );
};

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  
  const [task, setTask] = useState({ title: '', description: '', status: 'Pending' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      axios.get(`${API_URL}/${id}`)
        .then(res => setTask(res.data))
        .catch(() => setError('Failed to fetch task details'));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.title.trim()) {
      return setError('Title is required');
    }
    setError('');

    try {
      if (isEdit) {
        await axios.put(`${API_URL}/${id}`, task);
      } else {
        await axios.post(API_URL, task);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div>
      <h2>{isEdit ? 'Edit Task' : 'Create Task'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} className="task-form">
        <label>Title</label>
        <br/>
        <input name="title" value={task.title} onChange={handleChange} required />
        <br/>
        <label>Description</label>
        <br/>
        <textarea name="description" value={task.description} onChange={handleChange} />
        <br/>
        <label>Status</label>
        <br/>
        <select name="status" value={task.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <br/><br/>
        <button type="submit">{isEdit ? 'Update Task' : 'Add Task'}</button>
        <Link to="/"><button type="button" style={{ marginLeft: '10px' }}>Cancel</button></Link>
      </form>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div style={{ fontFamily: 'Arial', margin: '20px' }}>
        <h1>Mini MERN - Task Management System</h1>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/create" element={<TaskForm />} />
          <Route path="/edit/:id" element={<TaskForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

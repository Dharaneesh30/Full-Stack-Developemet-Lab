
import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({ studentId: '', name: '', department: '', email: '', marks: '' });
  const [msg, setMsg] = useState('');

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3005/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setMsg(res.ok ? "Success: " + data.message : "Error: " + data.error);
    } catch(err) {
      setMsg("Network Error (Is backend running?)");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h1>POST Data to API</h1>
      {msg && <p style={{ color: 'blue' }}>{msg}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
        <input name="studentId" placeholder="Student ID" onChange={handleChange} required />
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="department" placeholder="Department" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="number" name="marks" placeholder="Marks" onChange={handleChange} required />
        <button type="submit">Submit POST</button>
      </form>
    </div>
  );
}
export default App;

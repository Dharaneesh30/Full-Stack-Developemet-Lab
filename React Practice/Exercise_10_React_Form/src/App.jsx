
import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({ name: '', regNo: '', department: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(null);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(formData);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h1>Controlled Form</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="regNo" placeholder="Reg No" onChange={handleChange} required />
        <input name="department" placeholder="Department" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input name="phone" placeholder="Phone" onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
      
      {submitted && (
        <div style={{ marginTop: '20px', padding: '10px', background: '#e0f7fa' }}>
          <h3>Submitted Data:</h3>
          <pre>{JSON.stringify(submitted, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
export default App;

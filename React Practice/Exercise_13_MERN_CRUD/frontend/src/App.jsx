
import React, { useState, useEffect } from 'react';

const API = 'http://localhost:3013/api/students';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ studentId: '', name: '', department: '' });

  const fetchStudents = () => fetch(API).then(r => r.json()).then(setStudents).catch(console.error);
  
  useEffect(() => { fetchStudents(); }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch(API, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(formData) });
    fetchStudents();
  };

  const handleDelete = async id => {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    fetchStudents();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>MERN CRUD App</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input name="studentId" placeholder="ID" onChange={e => setFormData({...formData, studentId: e.target.value})} />
        <input name="name" placeholder="Name" onChange={e => setFormData({...formData, name: e.target.value})} />
        <input name="department" placeholder="Dept" onChange={e => setFormData({...formData, department: e.target.value})} />
        <button type="submit">Add Student</button>
      </form>
      
      <ul>
        {students.length > 0 ? students.map(s => (
          <li key={s._id}>
            {s.name} ({s.department}) 
            <button onClick={() => handleDelete(s.studentId)} style={{marginLeft: '10px'}}>Delete</button>
          </li>
        )) : <p>Ensure MERN Backend is running!</p>}
      </ul>
    </div>
  );
}
export default App;

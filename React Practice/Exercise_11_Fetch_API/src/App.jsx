
import React, { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/students')
      .then(res => res.json())
      .then(data => { setStudents(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Fetch API Demo</h1>
      {loading ? <p>Loading...</p> : (
        <ul>
          {students.length > 0 ? students.map((s, i) => <li key={i}>{s.name} - {s.department}</li>) : <li>No students found in DB. Make sure Backend is running!</li>}
        </ul>
      )}
    </div>
  );
}
export default App;

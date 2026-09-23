
import React from 'react';

const StudentCard = ({ name, department, email }) => (
  <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px', borderRadius: '5px' }}>
    <h3>{name}</h3>
    <p>Dept: {department}</p>
    <p>Email: {email}</p>
  </div>
);

const StudentList = ({ students }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    {students.map((s, i) => (
      <StudentCard key={i} {...s} />
    ))}
  </div>
);

function App() {
  const data = [
    { name: "Alice Johnson", department: "Computer Science", email: "alice@example.com" },
    { name: "Bob Smith", department: "Information Technology", email: "bob@example.com" }
  ];
  return (
    <div style={{ padding: '20px' }}>
      <h1>Student Directory (React Props)</h1>
      <StudentList students={data} />
    </div>
  );
}

export default App;

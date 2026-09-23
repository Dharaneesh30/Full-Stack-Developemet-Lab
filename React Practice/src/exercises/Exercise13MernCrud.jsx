// Exercise 13 — Complete MERN CRUD Application
// Task: Develop a Student Management application implementing complete CRUD operations.
// Requirements: Add student, Display students, Edit student, Delete student, Use MongoDB as database.

import React, { useState } from "react";

function Exercise13MernCrud() {
  const [activeTab, setActiveTab] = useState("simulator");
  const [copiedCode, setCopiedCode] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(reactSourceCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const reactSourceCode = `// This exercise combines Exercises 11 (Read), 12 (Create), 
// and the concepts from Express PUT/DELETE into a single React Component.
// File: src/App.jsx

import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api/students';

function MernCrudApp() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ studentId: '', name: '', department: '', email: '', marks: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // READ (GET)
  const fetchStudents = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // CREATE (POST) / UPDATE (PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await fetch(\`\${API_URL}/\${editId}\`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
      setFormData({ studentId: '', name: '', department: '', email: '', marks: '' });
      setIsEditing(false);
      setEditId(null);
      fetchStudents(); // Refresh list
    } catch (err) {
      console.error("Submit Error:", err);
    }
  };

  // EDIT - Populate form
  const handleEdit = (student) => {
    setFormData({
      studentId: student.studentId,
      name: student.name,
      department: student.department,
      email: student.email,
      marks: student.marks
    });
    setIsEditing(true);
    setEditId(student.studentId);
  };

  // DELETE (DELETE)
  const handleDelete = async (studentId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await fetch(\`\${API_URL}/\${studentId}\`, { method: 'DELETE' });
        fetchStudents(); // Refresh list
      } catch (err) {
        console.error("Delete Error:", err);
      }
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center' }}>MERN Student Management System</h1>
      
      {/* FORM SECTION */}
      <div style={{ padding: '20px', border: '1px solid #ccc', marginBottom: '20px' }}>
        <h2>{isEditing ? 'Edit Student' : 'Add New Student'}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
          <input type="text" name="studentId" placeholder="Student ID" value={formData.studentId} onChange={handleChange} required disabled={isEditing} />
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="number" name="marks" placeholder="Marks" value={formData.marks} onChange={handleChange} required />
          <button type="submit" style={{ padding: '10px', background: isEditing ? '#ffc107' : '#28a745', border: 'none', cursor: 'pointer' }}>
            {isEditing ? 'Update Student' : 'Save Student'}
          </button>
          {isEditing && (
            <button type="button" onClick={() => { setIsEditing(false); setFormData({studentId:'', name:'', department:'', email:'', marks:''}) }}>
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      {/* TABLE SECTION */}
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>ID</th><th>Name</th><th>Dept</th><th>Marks</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s._id} style={{ borderBottom: '1px solid #ddd' }}>
              <td>{s.studentId}</td>
              <td>{s.name}</td>
              <td>{s.department}</td>
              <td>{s.marks}</td>
              <td>
                <button onClick={() => handleEdit(s)} style={{ marginRight: '5px', background: '#ffc107' }}>Edit</button>
                <button onClick={() => handleDelete(s.studentId)} style={{ background: '#dc3545', color: 'white' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MernCrudApp;`;

  return (
    <div className="exercise-container">
      <div className="exercise-header">
        <span className="exercise-number">Exercise 13</span>
        <div>
          <h2 className="exercise-title">Complete MERN CRUD Application</h2>
          <span className="marks-badge">Total: 10 Marks</span>
        </div>
      </div>

      <div className="exercise-question">
        <strong>Task:</strong> Develop a Student Management application implementing complete CRUD operations.<br/>
        <strong>Requirements:</strong> Add student, Display students, Edit student, Delete student, Use MongoDB as database.
      </div>

      <div className="evaluation-card">
        <h4>📋 Evaluation Rubric (10 Marks)</h4>
        <div className="rubric-grid rubric-5">
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">Create</span>
            <p className="rubric-desc">Successfully add a record to MongoDB via React form</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">Read</span>
            <p className="rubric-desc">Fetch and display all records in a table/list</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">Update</span>
            <p className="rubric-desc">Edit existing record and save changes via PUT API</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">Delete</span>
            <p className="rubric-desc">Remove a record via DELETE API</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">Integration</span>
            <p className="rubric-desc">Flawless React &lt;-&gt; Express &lt;-&gt; MongoDB data flow</p>
          </div>
        </div>
      </div>

      <div className="tab-buttons">
        <button className={`tab-btn ${activeTab === "simulator" ? "active" : ""}`} onClick={() => setActiveTab("simulator")}>⚛️ App Overview</button>
        <button className={`tab-btn ${activeTab === "code" ? "active" : ""}`} onClick={() => setActiveTab("code")}>💻 Complete MERN Source Code</button>
        <button className={`tab-btn ${activeTab === "viva" ? "active" : ""}`} onClick={() => setActiveTab("viva")}>🎯 Viva Questions</button>
      </div>

      {activeTab === "simulator" && (
        <div className="tab-content">
          <div className="exercise-section" style={{ backgroundColor: "#f8f9fa", padding: "30px", borderRadius: "8px", textAlign: "center" }}>
            
            <h3 style={{ marginTop: 0 }}>MERN Stack Architecture</h3>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", margin: "40px 0" }}>
                
                <div style={{ padding: "20px", background: "#61dafb", borderRadius: "8px", fontWeight: "bold", width: "120px" }}>
                    React.js<br/><span style={{ fontSize: "12px", fontWeight: "normal" }}>Frontend UI</span>
                </div>
                
                <div style={{ fontSize: "24px", color: "#888" }}>⇄</div>
                
                <div style={{ padding: "20px", background: "#68a063", color: "white", borderRadius: "8px", fontWeight: "bold", width: "120px" }}>
                    Express.js & Node.js<br/><span style={{ fontSize: "12px", fontWeight: "normal" }}>Backend API</span>
                </div>
                
                <div style={{ fontSize: "24px", color: "#888" }}>⇄</div>
                
                <div style={{ padding: "20px", background: "#47A248", color: "white", borderRadius: "8px", fontWeight: "bold", width: "120px" }}>
                    MongoDB<br/><span style={{ fontSize: "12px", fontWeight: "normal" }}>Database</span>
                </div>

            </div>
            
            <p style={{ color: "#666", maxWidth: "600px", margin: "0 auto" }}>
                This exercise brings together everything you've learned. You will use `useEffect` to <strong>Read</strong>, `useState` forms to <strong>Create</strong> and <strong>Update</strong>, and event handlers to <strong>Delete</strong>. Check the source code tab for the complete unified implementation.
            </p>

          </div>
        </div>
      )}

      {activeTab === "code" && (
        <div className="tab-content">
          <div className="exercise-section">
            <div className="section-header-row">
              <h3>React Complete CRUD Application</h3>
              <button className="copy-btn" onClick={copyCode}>{copiedCode ? "✓ Copied!" : "📋 Copy Code"}</button>
            </div>
            <pre className="code-block">{reactSourceCode}</pre>
          </div>
        </div>
      )}

      {activeTab === "viva" && (
        <div className="tab-content">
          <div className="exercise-section viva-points">
            <h3>🎯 Lab Exam Viva Questions</h3>
            <div className="viva-item">
              <p className="viva-q">Q1: What does MERN stand for?</p>
              <p className="viva-a"><strong>A:</strong> MongoDB (Database), Express.js (Backend Framework), React.js (Frontend Library), Node.js (Runtime Environment).</p>
            </div>
            <div className="viva-item">
              <p className="viva-q">Q2: Why do we need to call `fetchStudents()` again after a successful POST, PUT, or DELETE request?</p>
              <p className="viva-a"><strong>A:</strong> To synchronize the React frontend state with the MongoDB backend. Fetching the data again ensures the UI reflects the most current database state.</p>
            </div>
            <div className="viva-item">
              <p className="viva-q">Q3: How do we populate the form fields when the "Edit" button is clicked?</p>
              <p className="viva-a"><strong>A:</strong> We pass the specific student object to an `handleEdit` function, which updates the `formData` state with that student's details, causing the controlled inputs to display those values.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Exercise13MernCrud;

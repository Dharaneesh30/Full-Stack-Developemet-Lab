// Exercise 8 — React Components and Props
// Task: Create a React application to display a list of students using reusable components.
// Requirements:
// Create StudentList and StudentCard components.
// Pass student information using props.
// Display name, department and email.

import React, { useState } from "react";

// --- INNER COMPONENTS (Simulating the React App structure) ---

// 1. StudentCard Component
const StudentCard = ({ name, department, email }) => {
  return (
    <div style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        margin: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        minWidth: "250px"
    }}>
      <h3 style={{ margin: "0 0 8px 0", color: "#333" }}>{name}</h3>
      <p style={{ margin: "4px 0", color: "#666" }}><strong>Dept:</strong> {department}</p>
      <p style={{ margin: "4px 0", color: "#666" }}><strong>Email:</strong> {email}</p>
    </div>
  );
};

// 2. StudentList Component
const StudentList = ({ students }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px", padding: "16px" }}>
      {students.map((student, index) => (
        <StudentCard 
          key={index}
          name={student.name}
          department={student.department}
          email={student.email}
        />
      ))}
    </div>
  );
};

// -----------------------------------------------------------

function Exercise8ReactComponents() {
  const [activeTab, setActiveTab] = useState("simulator");
  const [copiedCode, setCopiedCode] = useState(false);

  // Sample data for the React App
  const studentsData = [
    { name: "Alice Johnson", department: "Computer Science", email: "alice@college.edu" },
    { name: "Bob Smith", department: "Information Technology", email: "bob@college.edu" },
    { name: "Charlie Brown", department: "Electronics", email: "charlie@college.edu" },
    { name: "Diana Prince", department: "Mechanical", email: "diana@college.edu" }
  ];

  const copyCode = () => {
    navigator.clipboard.writeText(reactSourceCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const reactSourceCode = `// src/App.jsx
import React from 'react';

// --- StudentCard Component ---
// Receives name, department, and email as props
const StudentCard = ({ name, department, email }) => {
  return (
    <div className="student-card">
      <h3>{name}</h3>
      <p><strong>Dept:</strong> {department}</p>
      <p><strong>Email:</strong> {email}</p>
    </div>
  );
};

// --- StudentList Component ---
// Receives a list of students as props and maps them to StudentCards
const StudentList = ({ students }) => {
  return (
    <div className="student-list">
      {students.map((student, index) => (
        <StudentCard 
          key={index}
          name={student.name}
          department={student.department}
          email={student.email}
        />
      ))}
    </div>
  );
};

// --- Main App Component ---
function App() {
  const studentsData = [
    { name: "Alice Johnson", department: "Computer Science", email: "alice@college.edu" },
    { name: "Bob Smith", department: "Information Technology", email: "bob@college.edu" },
    { name: "Charlie Brown", department: "Electronics", email: "charlie@college.edu" },
    { name: "Diana Prince", department: "Mechanical", email: "diana@college.edu" }
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Student Directory</h1>
      <StudentList students={studentsData} />
    </div>
  );
}

export default App;

/* Add this to your index.css */
/* 
.student-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.student-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  min-width: 250px;
}
.student-card h3 {
  margin-top: 0;
  color: #333;
}
*/`;

  return (
    <div className="exercise-container">
      <div className="exercise-header">
        <span className="exercise-number">Exercise 8</span>
        <div>
          <h2 className="exercise-title">React Components & Props</h2>
          <span className="marks-badge">Total: 10 Marks</span>
        </div>
      </div>

      <div className="exercise-question">
        <strong>Task:</strong> Create a React application to display a list of students using reusable components.<br/>
        <strong>Requirements:</strong> 
        <ul>
            <li>Create <code>StudentList</code> and <code>StudentCard</code> components.</li>
            <li>Pass student information using props.</li>
            <li>Display name, department and email.</li>
        </ul>
      </div>

      <div className="evaluation-card">
        <h4>📋 Evaluation Rubric (10 Marks)</h4>
        <div className="rubric-grid rubric-4">
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">React App Setup</span>
            <p className="rubric-desc">Correctly initialize React and define main App component</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">3 Marks</span>
            <span className="rubric-title">Component Creation</span>
            <p className="rubric-desc">Create distinct <code>StudentList</code> and <code>StudentCard</code> components</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">3 Marks</span>
            <span className="rubric-title">Props Implementation</span>
            <p className="rubric-desc">Pass data correctly using props from parent to child</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">UI / Output</span>
            <p className="rubric-desc">Rendered correctly displaying required fields</p>
          </div>
        </div>
      </div>

      <div className="tab-buttons">
        <button
          className={`tab-btn ${activeTab === "simulator" ? "active" : ""}`}
          onClick={() => setActiveTab("simulator")}
        >
          ⚛️ Live React Preview
        </button>
        <button
          className={`tab-btn ${activeTab === "code" ? "active" : ""}`}
          onClick={() => setActiveTab("code")}
        >
          💻 React Source Code
        </button>
        <button
          className={`tab-btn ${activeTab === "viva" ? "active" : ""}`}
          onClick={() => setActiveTab("viva")}
        >
          🎯 Lab Exam Viva Questions
        </button>
      </div>

      {activeTab === "simulator" && (
        <div className="tab-content">
          <div className="exercise-section" style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "8px" }}>
            <div className="section-header-row">
              <h3>React Live Output Preview</h3>
            </div>
            
            {/* THIS IS THE LIVE RENDER OF THE COMPONENT */}
            <div style={{ backgroundColor: "#f0f2f5", padding: "20px", borderRadius: "8px", border: "1px dashed #ccc" }}>
              <h2 style={{ textAlign: "center", color: "#333", marginTop: 0 }}>Student Directory</h2>
              <StudentList students={studentsData} />
            </div>

          </div>
        </div>
      )}

      {activeTab === "code" && (
        <div className="tab-content">
          <div className="exercise-section">
            <div className="section-header-row">
              <h3>React Implementation (App.jsx)</h3>
              <button className="copy-btn" onClick={copyCode}>
                {copiedCode ? "✓ Copied!" : "📋 Copy Code"}
              </button>
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
              <p className="viva-q">Q1: What are "props" in React?</p>
              <p className="viva-a">
                <strong>A:</strong> Props (short for properties) are a mechanism for passing data from a parent component to a child component in React. They are read-only in the child component.
              </p>
            </div>
            <div className="viva-item">
              <p className="viva-q">Q2: Why do we need a <code>key</code> prop when mapping over an array in React?</p>
              <p className="viva-a">
                <strong>A:</strong> Keys help React identify which items have changed, are added, or are removed. They are necessary for efficient re-rendering of lists. Using index as key is okay for static lists, but unique IDs are preferred.
              </p>
            </div>
            <div className="viva-item">
              <p className="viva-q">Q3: What is the difference between a functional component and a class component?</p>
              <p className="viva-a">
                <strong>A:</strong> Functional components are simpler, written as JavaScript functions, and use Hooks for state and lifecycle methods (in modern React). Class components require extending <code>React.Component</code> and have a <code>render()</code> method.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Exercise8ReactComponents;

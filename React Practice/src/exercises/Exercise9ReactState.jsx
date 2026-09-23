// Exercise 9 — React State using useState
// Task: Create a React application demonstrating state management using useState.
// Requirements: Create a student counter, add and remove students using buttons, display the current count, demonstrate state update.

import React, { useState } from "react";

function Exercise9ReactState() {
  const [activeTab, setActiveTab] = useState("simulator");
  const [copiedCode, setCopiedCode] = useState(false);

  // --- Live Interactive State (Simulator) ---
  const [studentCount, setStudentCount] = useState(0);
  const [log, setLog] = useState([]);

  const handleAdd = () => {
    setStudentCount(prev => prev + 1);
    setLog(prev => [{ time: new Date().toLocaleTimeString(), action: 'Added student' }, ...prev].slice(0, 5));
  };

  const handleRemove = () => {
    if (studentCount > 0) {
      setStudentCount(prev => prev - 1);
      setLog(prev => [{ time: new Date().toLocaleTimeString(), action: 'Removed student' }, ...prev].slice(0, 5));
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(reactSourceCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const reactSourceCode = `// App.jsx
import React, { useState } from 'react';
import './App.css';

function StudentCounter() {
  // 1. useState Implementation
  const [studentCount, setStudentCount] = useState(0);

  // 2. Event Handling & State Updates
  const handleAddStudent = () => {
    setStudentCount(prevCount => prevCount + 1);
  };

  const handleRemoveStudent = () => {
    if (studentCount > 0) {
      setStudentCount(prevCount => prevCount - 1);
    }
  };

  const handleReset = () => {
    setStudentCount(0);
  };

  // 3. UI and Output
  return (
    <div className="counter-container">
      <h2>Student Counter Dashboard</h2>
      
      <div className="count-display">
        <h3>Current Students:</h3>
        <div className="number-badge">{studentCount}</div>
      </div>

      <div className="button-group">
        <button className="btn btn-primary" onClick={handleAddStudent}>
          ➕ Add Student
        </button>
        <button 
          className="btn btn-danger" 
          onClick={handleRemoveStudent}
          disabled={studentCount === 0}
        >
          ➖ Remove Student
        </button>
        <button className="btn btn-secondary" onClick={handleReset}>
          🔄 Reset
        </button>
      </div>
    </div>
  );
}

export default StudentCounter;

/* App.css additions:
.counter-container { padding: 20px; border: 1px solid #ccc; border-radius: 8px; max-width: 400px; text-align: center; margin: 20px auto; }
.count-display { margin: 20px 0; }
.number-badge { font-size: 48px; font-weight: bold; color: #007bff; background: #e9ecef; border-radius: 50%; width: 80px; height: 80px; line-height: 80px; margin: 0 auto; }
.button-group { display: flex; justify-content: center; gap: 10px; }
.btn { padding: 10px 15px; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; }
.btn-primary { background: #28a745; color: white; }
.btn-danger { background: #dc3545; color: white; }
.btn-danger:disabled { background: #f5c6cb; cursor: not-allowed; }
.btn-secondary { background: #6c757d; color: white; }
*/`;

  return (
    <div className="exercise-container">
      <div className="exercise-header">
        <span className="exercise-number">Exercise 9</span>
        <div>
          <h2 className="exercise-title">React State using useState</h2>
          <span className="marks-badge">Total: 10 Marks</span>
        </div>
      </div>

      <div className="exercise-question">
        <strong>Task:</strong> Create a React application demonstrating state management using <code>useState</code>.<br/>
        <strong>Requirements:</strong> Create a student counter, add and remove students using buttons, display the current count, demonstrate state update.
      </div>

      <div className="evaluation-card">
        <h4>📋 Evaluation Rubric (10 Marks)</h4>
        <div className="rubric-grid rubric-4">
          <div className="rubric-item">
            <span className="rubric-marks">4 Marks</span>
            <span className="rubric-title">useState Implementation</span>
            <p className="rubric-desc">Correct syntax and initialization of state hook</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">Event Handling</span>
            <p className="rubric-desc">Binding <code>onClick</code> handlers to buttons</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">State Updates</span>
            <p className="rubric-desc">Proper usage of setter function for increment/decrement</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">UI / Output</span>
            <p className="rubric-desc">Display the dynamic count correctly on screen</p>
          </div>
        </div>
      </div>

      <div className="tab-buttons">
        <button className={`tab-btn ${activeTab === "simulator" ? "active" : ""}`} onClick={() => setActiveTab("simulator")}>⚛️ Live App Preview</button>
        <button className={`tab-btn ${activeTab === "code" ? "active" : ""}`} onClick={() => setActiveTab("code")}>💻 React Source Code</button>
        <button className={`tab-btn ${activeTab === "viva" ? "active" : ""}`} onClick={() => setActiveTab("viva")}>🎯 Viva Questions</button>
      </div>

      {activeTab === "simulator" && (
        <div className="tab-content">
          <div className="exercise-section" style={{ backgroundColor: "#f8f9fa", padding: "30px", borderRadius: "8px", textAlign: "center" }}>
            
            <div style={{ backgroundColor: "#fff", padding: "30px", borderRadius: "12px", border: "1px solid #e0e0e0", maxWidth: "450px", margin: "0 auto", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
              <h2 style={{ marginTop: 0, color: "#333" }}>Student Capacity Counter</h2>
              <p style={{ color: "#666" }}>Managing lab attendance</p>

              <div style={{ margin: "30px 0" }}>
                <div style={{
                  fontSize: "64px", 
                  fontWeight: "bold", 
                  color: "#3b82f6", 
                  background: "#eff6ff", 
                  width: "120px", 
                  height: "120px", 
                  borderRadius: "50%", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  margin: "0 auto",
                  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)"
                }}>
                  {studentCount}
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                <button onClick={handleAdd} style={{ padding: "12px 24px", background: "#10b981", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "16px" }}>
                  + Add Student
                </button>
                <button onClick={handleRemove} disabled={studentCount === 0} style={{ padding: "12px 24px", background: studentCount === 0 ? "#fca5a5" : "#ef4444", color: "white", border: "none", borderRadius: "6px", cursor: studentCount === 0 ? "not-allowed" : "pointer", fontWeight: "bold", fontSize: "16px" }}>
                  - Remove Student
                </button>
              </div>
            </div>

            <div style={{ maxWidth: "450px", margin: "20px auto 0", textAlign: "left", fontSize: "14px", color: "#666" }}>
                <strong>State Update Log:</strong>
                <ul style={{ paddingLeft: "20px" }}>
                    {log.length === 0 ? <li>No actions yet</li> : log.map((entry, idx) => (
                        <li key={idx}><code>{entry.time}</code> - {entry.action}</li>
                    ))}
                </ul>
            </div>

          </div>
        </div>
      )}

      {activeTab === "code" && (
        <div className="tab-content">
          <div className="exercise-section">
            <div className="section-header-row">
              <h3>React Component using useState</h3>
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
              <p className="viva-q">Q1: What is a Hook in React?</p>
              <p className="viva-a"><strong>A:</strong> Hooks are functions that let you "hook into" React state and lifecycle features from function components. They cannot be used in class components.</p>
            </div>
            <div className="viva-item">
              <p className="viva-q">Q2: What does `useState` return?</p>
              <p className="viva-a"><strong>A:</strong> It returns an array with exactly two values: the current state value, and a setter function that lets you update it.</p>
            </div>
            <div className="viva-item">
              <p className="viva-q">Q3: Why should we use `setCount(prev =&gt; prev + 1)` instead of `setCount(count + 1)`?</p>
              <p className="viva-a"><strong>A:</strong> State updates can be asynchronous. If you rely on the previous state to calculate the next state, passing an updater function `prev =&gt; prev + 1` guarantees you are working with the most recent state value.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Exercise9ReactState;

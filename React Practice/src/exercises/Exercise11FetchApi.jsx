// Exercise 11 — Fetch API using useEffect
// Task: Retrieve student information from an Express REST API and display it in React.
// Requirements: Use useEffect(), use fetch() to call GET API, display returned students, handle loading/error states.

import React, { useState, useEffect } from "react";

function Exercise11FetchApi() {
  const [activeTab, setActiveTab] = useState("simulator");
  const [copiedCode, setCopiedCode] = useState(false);

  // Live state
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // For simulation purposes we'll fetch real local or fallback to hardcoded
  const fetchStudents = async () => {
    setIsLoading(true);
    setError(null);
    setStudents([]);

    try {
      // Trying to fetch from local API if server is running
      const response = await fetch("http://localhost:5000/api/students");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setStudents(data);
    } catch (err) {
      // Simulation fallback if Express server isn't running
      console.log("Express server not found, using simulation data.");
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setStudents([
        { _id: "1", regNo: "23CSE001", name: "Mock Fetch Data 1", department: "CSE", email: "mock1@college.edu" },
        { _id: "2", regNo: "23IT002", name: "Mock Fetch Data 2", department: "IT", email: "mock2@college.edu" },
        { _id: "3", regNo: "23ECE003", name: "Mock Fetch Data 3", department: "ECE", email: "mock3@college.edu" }
      ]);
      // If we wanted to simulate error: setError("Failed to fetch data from API (Simulated)");
    } finally {
      setIsLoading(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(reactSourceCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const reactSourceCode = `import React, { useState, useEffect } from 'react';

function StudentListAPI() {
  // 1. State for Data, Loading, and Error
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. useEffect to trigger fetch on component mount
  useEffect(() => {
    fetchStudents();
  }, []); // Empty dependency array means this runs once on mount

  // 3. fetch API implementation
  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      setError(null); // Reset errors

      const response = await fetch('http://localhost:5000/api/students');
      
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      const data = await response.json();
      setStudents(data);
    } catch (err) {
      console.error("Failed to fetch students:", err);
      setError(err.message || "Failed to connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Loading State Handling
  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Loading students data... ⏳</h2>
      </div>
    );
  }

  // 4. Error State Handling
  if (error) {
    return (
      <div style={{ color: 'red', padding: '20px', border: '1px solid red' }}>
        <h2>Error loading data! ❌</h2>
        <p>{error}</p>
        <button onClick={fetchStudents}>Retry</button>
      </div>
    );
  }

  // 5. Data Display
  return (
    <div style={{ maxWidth: '800px', margin: '20px auto' }}>
      <h2>Student Directory (Fetched from API)</h2>
      
      <button onClick={fetchStudents} style={{ marginBottom: '20px' }}>
        Refresh Data
      </button>

      {students.length === 0 ? (
        <p>No students found in the database.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Reg No</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Department</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.regNo || student.studentId}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.department}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentListAPI;`;

  return (
    <div className="exercise-container">
      <div className="exercise-header">
        <span className="exercise-number">Exercise 11</span>
        <div>
          <h2 className="exercise-title">Fetch API using useEffect</h2>
          <span className="marks-badge">Total: 10 Marks</span>
        </div>
      </div>

      <div className="exercise-question">
        <strong>Task:</strong> Retrieve student information from an Express REST API and display it in React.<br/>
        <strong>Requirements:</strong> Use <code>useEffect()</code>, use <code>fetch()</code> to call GET API, display returned students, handle loading/error states.
      </div>

      <div className="evaluation-card">
        <h4>📋 Evaluation Rubric (10 Marks)</h4>
        <div className="rubric-grid rubric-4">
          <div className="rubric-item">
            <span className="rubric-marks">3 Marks</span>
            <span className="rubric-title">useEffect Implementation</span>
            <p className="rubric-desc">Proper usage of useEffect with empty dependency array</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">3 Marks</span>
            <span className="rubric-title">API Connectivity</span>
            <p className="rubric-desc">Use <code>fetch()</code> with promises or async/await</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">Data Display</span>
            <p className="rubric-desc">Map over state array to display list/table of students</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">Loading/Error States</span>
            <p className="rubric-desc">Handle asynchronous states gracefully</p>
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
          <div className="exercise-section" style={{ backgroundColor: "#f8f9fa", padding: "30px", borderRadius: "8px" }}>
            
            <div style={{ backgroundColor: "#fff", padding: "24px", borderRadius: "8px", border: "1px solid #ddd" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <h3 style={{ margin: 0 }}>Student Directory (API Fetched)</h3>
                  <button onClick={fetchStudents} className="btn-primary" disabled={isLoading}>
                      {isLoading ? "Fetching..." : "Fetch Students API"}
                  </button>
              </div>

              {isLoading ? (
                  <div style={{ padding: "40px", textAlign: "center", backgroundColor: "#f0f9ff", borderRadius: "8px", border: "1px dashed #bae6fd" }}>
                      <div className="pulse-dot" style={{ display: "inline-block", marginRight: "10px" }}></div>
                      <strong style={{ color: "#0369a1" }}>Loading Data via Fetch API...</strong>
                  </div>
              ) : error ? (
                  <div style={{ padding: "20px", backgroundColor: "#fef2f2", borderRadius: "8px", border: "1px solid #fca5a5", color: "#b91c1c" }}>
                      <strong>Error:</strong> {error}
                  </div>
              ) : students.length === 0 ? (
                  <div style={{ padding: "40px", textAlign: "center", color: "#888", border: "1px dashed #ccc", borderRadius: "8px" }}>
                      No data loaded. Click 'Fetch Students API' to trigger fetch.
                  </div>
              ) : (
                  <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                          <thead>
                              <tr style={{ backgroundColor: "#f1f5f9", borderBottom: "2px solid #cbd5e1" }}>
                                  <th style={{ padding: "12px 16px" }}>Reg No / ID</th>
                                  <th style={{ padding: "12px 16px" }}>Name</th>
                                  <th style={{ padding: "12px 16px" }}>Department</th>
                                  <th style={{ padding: "12px 16px" }}>Email</th>
                              </tr>
                          </thead>
                          <tbody>
                              {students.map((s, idx) => (
                                  <tr key={idx} style={{ borderBottom: "1px solid #e2e8f0" }}>
                                      <td style={{ padding: "12px 16px", fontWeight: "bold", color: "#334155" }}>{s.regNo || s.studentId}</td>
                                      <td style={{ padding: "12px 16px" }}>{s.name}</td>
                                      <td style={{ padding: "12px 16px" }}>{s.department}</td>
                                      <td style={{ padding: "12px 16px" }}>{s.email}</td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
              )}
            </div>

          </div>
        </div>
      )}

      {activeTab === "code" && (
        <div className="tab-content">
          <div className="exercise-section">
            <div className="section-header-row">
              <h3>React Fetch & useEffect Implementation</h3>
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
              <p className="viva-q">Q1: What is the purpose of the empty array `[]` in `useEffect`?</p>
              <p className="viva-a"><strong>A:</strong> The empty dependency array tells React that this effect does not depend on any state or props, so it should only run exactly once after the initial render (similar to `componentDidMount` in class components).</p>
            </div>
            <div className="viva-item">
              <p className="viva-q">Q2: Why do we need a separate `isLoading` state?</p>
              <p className="viva-a"><strong>A:</strong> Network requests take time. We need `isLoading` to conditionally render a loading spinner or message so the user knows data is being fetched, rather than seeing an empty list.</p>
            </div>
            <div className="viva-item">
              <p className="viva-q">Q3: What does `response.json()` do in the fetch API?</p>
              <p className="viva-a"><strong>A:</strong> It asynchronously parses the response body as JSON. Since `fetch` only returns the Response object initially, `.json()` reads the body stream to completion and returns a promise resolving to the JSON object.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Exercise11FetchApi;

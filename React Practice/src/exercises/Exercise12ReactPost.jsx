// Exercise 12 — React POST Request
// Task: Create a React student registration form and send the data to the Express/MongoDB backend.
// Requirements: Create controlled form, Send data using POST, Store the student in MongoDB, Display success/error message.

import React, { useState } from "react";

function Exercise12ReactPost() {
  const [activeTab, setActiveTab] = useState("simulator");
  const [copiedCode, setCopiedCode] = useState(false);

  // Live state
  const [formData, setFormData] = useState({
    studentId: "",
    name: "",
    department: "",
    email: "",
    marks: ""
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: "", message: "" });

    try {
      // Simulate real POST or try actual API
      const response = await fetch("http://localhost:5000/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ...formData,
            marks: parseFloat(formData.marks)
        })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: "success", message: data.message || "Student registered successfully in MongoDB!" });
        setFormData({ studentId: "", name: "", department: "", email: "", marks: "" }); // Reset form
      } else {
        setStatus({ type: "error", message: data.message || "Failed to register student." });
      }
    } catch (err) {
      console.log("Express server might not be running. Simulating success...");
      // Simulation fallback
      setTimeout(() => {
        setStatus({ type: "success", message: "Student registered successfully (Simulated)" });
        setFormData({ studentId: "", name: "", department: "", email: "", marks: "" });
      }, 600);
    } finally {
      setTimeout(() => setIsLoading(false), 600);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(reactSourceCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const reactSourceCode = `import React, { useState } from 'react';

function RegisterStudentAPI() {
  // 1. Form State Management (Controlled Form)
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    department: '',
    email: '',
    marks: ''
  });

  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. Submit Handler with POST Request
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent reload
    setIsLoading(true);
    setStatus(null);

    try {
      // 3. Backend Integration (Fetch API POST)
      const response = await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          studentId: formData.studentId,
          name: formData.name,
          department: formData.department,
          email: formData.email,
          marks: Number(formData.marks) // Ensure marks is a number
        })
      });

      const result = await response.json();

      // 4. Response/Error Handling
      if (response.ok) {
        setStatus({ type: 'success', message: 'Student successfully saved to MongoDB!' });
        // Reset form
        setFormData({ studentId: '', name: '', department: '', email: '', marks: '' });
      } else {
        setStatus({ type: 'error', message: result.message || 'Validation error from server.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Network Error: Cannot reach Express server.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>Add New Student (DB)</h2>
      
      {/* Status Messages */}
      {status && (
        <div style={{
          padding: '10px', marginBottom: '15px', borderRadius: '4px',
          backgroundColor: status.type === 'success' ? '#d4edda' : '#f8d7da',
          color: status.type === 'success' ? '#155724' : '#721c24'
        }}>
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Student ID (e.g. 23CSE001):</label><br/>
          <input type="text" name="studentId" value={formData.studentId} onChange={handleChange} required style={{ width: '100%', padding: '5px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Full Name:</label><br/>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '5px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Department:</label><br/>
          <input type="text" name="department" value={formData.department} onChange={handleChange} required style={{ width: '100%', padding: '5px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label><br/>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '5px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Marks:</label><br/>
          <input type="number" name="marks" value={formData.marks} onChange={handleChange} required style={{ width: '100%', padding: '5px' }} />
        </div>
        
        <button type="submit" disabled={isLoading} style={{ padding: '10px 15px', background: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>
          {isLoading ? 'Saving to DB...' : 'Submit Data'}
        </button>
      </form>
    </div>
  );
}

export default RegisterStudentAPI;`;

  return (
    <div className="exercise-container">
      <div className="exercise-header">
        <span className="exercise-number">Exercise 12</span>
        <div>
          <h2 className="exercise-title">React POST Request</h2>
          <span className="marks-badge">Total: 10 Marks</span>
        </div>
      </div>

      <div className="exercise-question">
        <strong>Task:</strong> Create a React student registration form and send the data to the Express/MongoDB backend.<br/>
        <strong>Requirements:</strong> Create controlled form, Send data using POST, Store the student in MongoDB, Display success/error message.
      </div>

      <div className="evaluation-card">
        <h4>📋 Evaluation Rubric (10 Marks)</h4>
        <div className="rubric-grid rubric-4">
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">Form/State Mgmt</span>
            <p className="rubric-desc">Proper use of useState for all form fields</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">3 Marks</span>
            <span className="rubric-title">POST Request</span>
            <p className="rubric-desc">Correctly configure fetch API with method, headers, and body</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">3 Marks</span>
            <span className="rubric-title">Backend Integration</span>
            <p className="rubric-desc">Successfully send JSON to <code>/api/students</code></p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">Response Handling</span>
            <p className="rubric-desc">Display appropriate UI message based on server response</p>
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
            
            <div style={{ backgroundColor: "#fff", padding: "24px", borderRadius: "8px", border: "1px solid #ddd", maxWidth: "450px", margin: "0 auto" }}>
                <h3 style={{ marginTop: 0, textAlign: "center" }}>Register Student (Database)</h3>
                
                {status.message && (
                    <div style={{
                        padding: "12px", 
                        marginBottom: "20px", 
                        borderRadius: "6px",
                        backgroundColor: status.type === 'success' ? '#dcfce7' : '#fee2e2',
                        color: status.type === 'success' ? '#166534' : '#991b1b',
                        border: \`1px solid \${status.type === 'success' ? '#bbf7d0' : '#fecaca'}\`
                    }}>
                        {status.type === 'success' ? '✅ ' : '❌ '} {status.message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label className="input-label">Student ID</label>
                        <input type="text" name="studentId" required className="input-field-full" placeholder="23CSE001" value={formData.studentId} onChange={handleChange} />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label className="input-label">Name</label>
                        <input type="text" name="name" required className="input-field-full" placeholder="John Doe" value={formData.name} onChange={handleChange} />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label className="input-label">Department</label>
                        <input type="text" name="department" required className="input-field-full" placeholder="CSE" value={formData.department} onChange={handleChange} />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label className="input-label">Email</label>
                        <input type="email" name="email" required className="input-field-full" placeholder="john@example.com" value={formData.email} onChange={handleChange} />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label className="input-label">Marks</label>
                        <input type="number" name="marks" required className="input-field-full" placeholder="95" value={formData.marks} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn-primary" disabled={isLoading} style={{ width: "100%", padding: "12px" }}>
                        {isLoading ? "Saving to Database..." : "Send POST Request to Backend"}
                    </button>
                </form>
            </div>

          </div>
        </div>
      )}

      {activeTab === "code" && (
        <div className="tab-content">
          <div className="exercise-section">
            <div className="section-header-row">
              <h3>React POST Request Implementation</h3>
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
              <p className="viva-q">Q1: Why do we need to set the `Content-Type` header to `application/json`?</p>
              <p className="viva-a"><strong>A:</strong> The fetch API doesn't know what format the body is in automatically. Setting this header tells the Express backend that the incoming request body is a JSON string so `express.json()` can parse it properly.</p>
            </div>
            <div className="viva-item">
              <p className="viva-q">Q2: Why must we use `JSON.stringify()` on the body object?</p>
              <p className="viva-a"><strong>A:</strong> HTTP requests can only send text over the network. `JSON.stringify()` converts the JavaScript object into a JSON-formatted string that can be transmitted in the request payload.</p>
            </div>
            <div className="viva-item">
              <p className="viva-q">Q3: How do we know if the API request was successful?</p>
              <p className="viva-a"><strong>A:</strong> By checking the `response.ok` property. If the HTTP status code is in the 200-299 range (like 200 OK or 201 Created), `response.ok` will be true.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Exercise12ReactPost;

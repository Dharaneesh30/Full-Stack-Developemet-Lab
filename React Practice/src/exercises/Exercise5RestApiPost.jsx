// Exercise 5 — REST API using POST
// Task: Create an API to add a new student.
// Endpoint: POST /api/students

import React, { useState } from "react";

function Exercise5RestApiPost() {
  const [activeTab, setActiveTab] = useState("simulator"); // 'simulator' | 'code' | 'viva'
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  // Request state
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentDept, setStudentDept] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentMarks, setStudentMarks] = useState("");

  const [simulateError, setSimulateError] = useState(false);
  const [simulateValidationError, setSimulateValidationError] = useState(false);

  // Response state
  const [isLoading, setIsLoading] = useState(false);
  const [responseState, setResponseState] = useState(null);

  const requestUrl = `http://localhost:5000/api/students`;

  const handleSendRequest = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (simulateError) {
        setResponseState({
          status: 500,
          statusText: "Internal Server Error",
          duration: "21ms",
          size: "142 B",
          contentType: "application/json; charset=utf-8",
          data: {
            error: "Internal Server Error",
            message: "Failed to insert student into MongoDB",
          },
        });
        return;
      }

      if (simulateValidationError || !studentId || !studentName || !studentDept || !studentEmail || !studentMarks) {
        setResponseState({
          status: 400,
          statusText: "Bad Request",
          duration: "5ms",
          size: "95 B",
          contentType: "application/json; charset=utf-8",
          data: {
            error: "Validation Error",
            message: "All fields (ID, Name, Department, Email, Marks) are required.",
          },
        });
        return;
      }

      const newStudent = {
        _id: "66e9a01f9a05",
        studentId: studentId,
        name: studentName,
        department: studentDept,
        email: studentEmail,
        marks: parseFloat(studentMarks)
      };

      const jsonStr = JSON.stringify(newStudent);
      setResponseState({
        status: 201,
        statusText: "Created",
        duration: `${(Math.random() * 8 + 10).toFixed(1)}ms`,
        size: `${jsonStr.length} B`,
        contentType: "application/json; charset=utf-8",
        data: {
            message: "Student added successfully",
            student: newStudent
        },
      });
    }, 450);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(apiSourceCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const copyJson = () => {
    if (responseState) {
      navigator.clipboard.writeText(JSON.stringify(responseState.data, null, 2));
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2000);
    }
  };

  const apiSourceCode = `// server.js — Exercise 5: REST API using POST (/api/students)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json()); // Essential for handling request body

// 1. Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/CollegeDB')
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err.message));

// 2. Define Student Schema & Model
const studentSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    department: { type: String, required: true },
    email: { type: String, required: true },
    marks: { type: Number, required: true }
});

const Student = mongoose.model('Student', studentSchema);

// ============================================================
// 3. REST API Endpoint: POST /api/students
// ============================================================
app.post('/api/students', async (req, res) => {
    try {
        const { studentId, name, department, email, marks } = req.body;

        // Validation
        if (!studentId || !name || !department || !email || !marks) {
            return res.status(400).json({
                error: 'Validation Error',
                message: 'All fields (ID, Name, Department, Email, Marks) are required.'
            });
        }

        // MongoDB insertion
        const newStudent = new Student({
            studentId,
            name,
            department,
            email,
            marks
        });

        const savedStudent = await newStudent.save();

        // Correct response/status code (201 Created)
        res.status(201).json({
            message: 'Student added successfully',
            student: savedStudent
        });
    } catch (error) {
        console.error('Error adding student:', error.message);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to insert student into MongoDB',
            details: error.message
        });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(\`REST API Server running on http://localhost:\${PORT}\`);
});`;

  return (
    <div className="exercise-container">
      {/* Header */}
      <div className="exercise-header">
        <span className="exercise-number">Exercise 5</span>
        <div>
          <h2 className="exercise-title">REST API using POST</h2>
          <span className="marks-badge">Total: 10 Marks</span>
        </div>
      </div>

      {/* Task Box */}
      <div className="exercise-question">
        <strong>Task:</strong> Create an API to add a new student.
        <br />
        <strong>Endpoint:</strong> <code>POST /api/students</code>
        <br />
        <strong>Student fields:</strong> ID, Name, Department, Email, Marks
      </div>

      {/* Evaluation Rubric Grid */}
      <div className="evaluation-card">
        <h4>📋 Evaluation Rubric (10 Marks)</h4>
        <div className="rubric-grid rubric-5">
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">POST Route</span>
            <p className="rubric-desc">Correct <code>POST /api/students</code> route definition</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">Request Body</span>
            <p className="rubric-desc">Proper handling of <code>req.body</code> fields</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">3 Marks</span>
            <span className="rubric-title">DB Insertion</span>
            <p className="rubric-desc">Insert student document into MongoDB</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">Error Handling</span>
            <p className="rubric-desc">Validation & error handling (e.g., 400 Bad Request)</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">1 Mark</span>
            <span className="rubric-title">Status Code</span>
            <p className="rubric-desc">Correct 201 Created success response</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="tab-buttons">
        <button
          className={`tab-btn ${activeTab === "simulator" ? "active" : ""}`}
          onClick={() => setActiveTab("simulator")}
        >
          ⚡ Interactive REST API Client
        </button>
        <button
          className={`tab-btn ${activeTab === "code" ? "active" : ""}`}
          onClick={() => setActiveTab("code")}
        >
          💻 Express REST API Source Code
        </button>
        <button
          className={`tab-btn ${activeTab === "viva" ? "active" : ""}`}
          onClick={() => setActiveTab("viva")}
        >
          🎯 Lab Exam Viva Questions (Q&A)
        </button>
      </div>

      {/* TAB 1: SIMULATOR */}
      {activeTab === "simulator" && (
        <div className="tab-content">
          <div className="exercise-section">
            <div className="section-header-row">
              <h3>Interactive API Request Builder</h3>
              <div className="server-status-pill">
                <span className="pulse-dot"></span>
                <span>Express API Server: <strong>http://localhost:5000</strong></span>
              </div>
            </div>

            {/* Request Bar */}
            <div className="api-request-bar">
              <span className="method-pill-post" style={{ backgroundColor: "#10b981", color: "white", padding: "4px 8px", borderRadius: "4px", fontWeight: "bold" }}>POST</span>
              <span className="api-url-display">{requestUrl}</span>
              <button
                className="btn-primary"
                onClick={handleSendRequest}
                disabled={isLoading}
              >
                {isLoading ? "⏳ Sending..." : "🚀 Send Request"}
              </button>
            </div>

            {/* Request Body Grid */}
            <div className="api-params-card">
              <div className="params-header">
                <strong>Request Body (JSON)</strong>
                <span className="text-muted">Fields to insert</span>
              </div>
              <div className="params-grid">
                <div>
                  <label className="input-label">studentId</label>
                  <input
                    type="text"
                    className="input-field-full"
                    placeholder="e.g. 23CSE001"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                  />
                </div>
                <div>
                  <label className="input-label">name</label>
                  <input
                    type="text"
                    className="input-field-full"
                    placeholder="e.g. John Doe"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="input-label">department</label>
                  <input
                    type="text"
                    className="input-field-full"
                    placeholder="e.g. CSE"
                    value={studentDept}
                    onChange={(e) => setStudentDept(e.target.value)}
                  />
                </div>
                <div>
                  <label className="input-label">email</label>
                  <input
                    type="email"
                    className="input-field-full"
                    placeholder="e.g. john@example.com"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="input-label">marks</label>
                  <input
                    type="number"
                    className="input-field-full"
                    placeholder="e.g. 95"
                    value={studentMarks}
                    onChange={(e) => setStudentMarks(e.target.value)}
                  />
                </div>
              </div>

              {/* Error Simulation Toggle */}
              <div className="error-toggle-row">
                <label className="toggle-label" style={{ display: "block", marginBottom: "8px" }}>
                  <input
                    type="checkbox"
                    checked={simulateValidationError}
                    onChange={(e) => setSimulateValidationError(e.target.checked)}
                  />
                  <span>Simulate 400 Validation Error (Empty fields)</span>
                </label>
                <label className="toggle-label" style={{ display: "block" }}>
                  <input
                    type="checkbox"
                    checked={simulateError}
                    onChange={(e) => setSimulateError(e.target.checked)}
                  />
                  <span>Simulate 500 Database Error</span>
                </label>
              </div>
            </div>

            {/* Response Section */}
            {responseState && (
                <div className="api-response-card">
                <div className="response-status-bar">
                    <div className="status-group">
                    <span className="response-label">Response:</span>
                    <span
                        className={`status-pill ${
                        responseState.status === 201 || responseState.status === 200 ? "status-200" : "status-500"
                        }`}
                    >
                        {responseState.status} {responseState.statusText}
                    </span>
                    </div>
                    <div className="meta-group">
                    <span>⏱️ Time: <strong>{responseState.duration}</strong></span>
                    <span>📦 Size: <strong>{responseState.size}</strong></span>
                    <button className="copy-btn" onClick={copyJson}>
                        {copiedJson ? "✓ Copied!" : "📋 Copy JSON"}
                    </button>
                    </div>
                </div>

                {/* Response Headers */}
                <div className="response-headers-bar">
                    <code>Content-Type: {responseState.contentType}</code>
                </div>

                {/* JSON Body */}
                <pre className="code-block json-viewer" style={{ margin: 0 }}>
                    {JSON.stringify(responseState.data, null, 2)}
                </pre>
                </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: SOURCE CODE */}
      {activeTab === "code" && (
        <div className="tab-content">
          <div className="exercise-section">
            <div className="section-header-row">
              <h3>REST API POST Implementation (server.js)</h3>
              <button className="copy-btn" onClick={copyCode}>
                {copiedCode ? "✓ Copied!" : "📋 Copy Code"}
              </button>
            </div>
            <pre className="code-block">{apiSourceCode}</pre>
          </div>
        </div>
      )}

      {/* TAB 3: VIVA VOCE */}
      {activeTab === "viva" && (
        <div className="tab-content">
          <div className="exercise-section viva-points">
            <h3>🎯 Lab Exam Viva Questions & Answers</h3>
            <div className="viva-item">
              <p className="viva-q">Q1: Why do we need `express.json()` middleware?</p>
              <p className="viva-a">
                <strong>A:</strong> It parses incoming requests with JSON payloads and makes the parsed data available under `req.body`. Without it, `req.body` would be undefined for JSON requests.
              </p>
            </div>
            <div className="viva-item">
              <p className="viva-q">Q2: What is the significance of HTTP status code 201?</p>
              <p className="viva-a">
                <strong>A:</strong> `201 Created` indicates that the request has been fulfilled and has resulted in one or more new resources being created (like adding a new student).
              </p>
            </div>
            <div className="viva-item">
              <p className="viva-q">Q3: How does MongoDB generate the `_id` field?</p>
              <p className="viva-a">
                <strong>A:</strong> MongoDB automatically generates a unique 12-byte ObjectId for the `_id` field if one is not provided during insertion.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Exercise5RestApiPost;

// Exercise 7 — REST API using DELETE
// Task: Create an API to delete a student using student ID.
// Endpoint: DELETE /api/students/:id

import React, { useState } from "react";

function Exercise7RestApiDelete() {
  const [activeTab, setActiveTab] = useState("simulator");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  // Request state
  const [routeId, setRouteId] = useState("");
  const [simulateError, setSimulateError] = useState(false);
  const [simulateNotFound, setSimulateNotFound] = useState(false);

  // Response state
  const [isLoading, setIsLoading] = useState(false);
  const [responseState, setResponseState] = useState(null);

  const requestUrl = `http://localhost:5000/api/students/${routeId || ':id'}`;

  const handleSendRequest = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (!routeId) {
        setResponseState({
          status: 400,
          statusText: "Bad Request",
          duration: "2ms",
          size: "60 B",
          contentType: "application/json; charset=utf-8",
          data: { error: "Route parameter :id is required" },
        });
        return;
      }

      if (simulateError) {
        setResponseState({
          status: 500,
          statusText: "Internal Server Error",
          duration: "18ms",
          size: "120 B",
          contentType: "application/json; charset=utf-8",
          data: { error: "Internal Server Error", message: "Failed to delete student" },
        });
        return;
      }

      if (simulateNotFound) {
        setResponseState({
          status: 404,
          statusText: "Not Found",
          duration: "10ms",
          size: "80 B",
          contentType: "application/json; charset=utf-8",
          data: { error: "Not Found", message: "Student not found" },
        });
        return;
      }

      const jsonStr = JSON.stringify({ message: "Student deleted successfully" });
      setResponseState({
        status: 200,
        statusText: "OK",
        duration: `${(Math.random() * 8 + 10).toFixed(1)}ms`,
        size: `${jsonStr.length} B`,
        contentType: "application/json; charset=utf-8",
        data: { message: "Student deleted successfully", deletedId: routeId },
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

  const apiSourceCode = `// server.js — Exercise 7: REST API using DELETE (/api/students/:id)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/CollegeDB')
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err.message));

const studentSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    department: { type: String, required: true },
    email: { type: String, required: true },
    marks: { type: Number, required: true }
});

const Student = mongoose.model('Student', studentSchema);

// ============================================================
// 3. REST API Endpoint: DELETE /api/students/:id
// ============================================================
app.delete('/api/students/:id', async (req, res) => {
    try {
        const studentId = req.params.id; // Route parameter

        // MongoDB deletion using findOneAndDelete
        const deletedStudent = await Student.findOneAndDelete({ studentId: studentId });

        // Error/not-found handling
        if (!deletedStudent) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'Student with the given ID was not found.'
            });
        }

        // Success response
        res.status(200).json({
            message: 'Student deleted successfully',
            deletedStudent: deletedStudent
        });
    } catch (error) {
        console.error('Error deleting student:', error.message);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to delete student from MongoDB',
            details: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(\`REST API Server running on http://localhost:\${PORT}\`);
});`;

  return (
    <div className="exercise-container">
      <div className="exercise-header">
        <span className="exercise-number">Exercise 7</span>
        <div>
          <h2 className="exercise-title">REST API using DELETE</h2>
          <span className="marks-badge">Total: 10 Marks</span>
        </div>
      </div>

      <div className="exercise-question">
        <strong>Task:</strong> Create an API to delete a student using student ID.
        <br />
        <strong>Endpoint:</strong> <code>DELETE /api/students/:id</code>
      </div>

      <div className="evaluation-card">
        <h4>📋 Evaluation Rubric (10 Marks)</h4>
        <div className="rubric-grid rubric-5">
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">DELETE Route</span>
            <p className="rubric-desc">Correct <code>DELETE</code> route definition</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">ID Parameter</span>
            <p className="rubric-desc">Extracting ID from <code>req.params</code></p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">3 Marks</span>
            <span className="rubric-title">MongoDB Deletion</span>
            <p className="rubric-desc">Correctly deleting from database</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">1 Mark</span>
            <span className="rubric-title">Success Response</span>
            <p className="rubric-desc">Return proper success message (200 OK)</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">Error Handling</span>
            <p className="rubric-desc">Handle 404 (Not Found) and 500 (Server Error)</p>
          </div>
        </div>
      </div>

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
          🎯 Lab Exam Viva Questions
        </button>
      </div>

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

            <div className="api-request-bar">
              <span className="method-pill-delete" style={{ backgroundColor: "#ef4444", color: "white", padding: "4px 8px", borderRadius: "4px", fontWeight: "bold" }}>DELETE</span>
              <span className="api-url-display">{requestUrl}</span>
              <button
                className="btn-primary"
                onClick={handleSendRequest}
                disabled={isLoading}
              >
                {isLoading ? "⏳ Sending..." : "🚀 Send Request"}
              </button>
            </div>

            <div className="api-params-card">
              <div className="params-header">
                <strong>Route Parameter</strong>
              </div>
              <div>
                 <label className="input-label">Student ID (:id) <span style={{color: "red"}}>*</span></label>
                 <input
                    type="text"
                    className="input-field-full"
                    placeholder="e.g. 23CSE001"
                    value={routeId}
                    onChange={(e) => setRouteId(e.target.value)}
                 />
              </div>

              <div className="error-toggle-row" style={{ marginTop: "16px" }}>
                <label className="toggle-label" style={{ display: "block", marginBottom: "8px" }}>
                  <input
                    type="checkbox"
                    checked={simulateNotFound}
                    onChange={(e) => setSimulateNotFound(e.target.checked)}
                  />
                  <span>Simulate 404 Not Found (Student ID doesn't exist)</span>
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

            {responseState && (
                <div className="api-response-card">
                <div className="response-status-bar">
                    <div className="status-group">
                    <span className="response-label">Response:</span>
                    <span
                        className={`status-pill ${
                        responseState.status === 200 ? "status-200" : "status-500"
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

                <div className="response-headers-bar">
                    <code>Content-Type: {responseState.contentType}</code>
                </div>

                <pre className="code-block json-viewer" style={{ margin: 0 }}>
                    {JSON.stringify(responseState.data, null, 2)}
                </pre>
                </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "code" && (
        <div className="tab-content">
          <div className="exercise-section">
            <div className="section-header-row">
              <h3>REST API DELETE Implementation</h3>
              <button className="copy-btn" onClick={copyCode}>
                {copiedCode ? "✓ Copied!" : "📋 Copy Code"}
              </button>
            </div>
            <pre className="code-block">{apiSourceCode}</pre>
          </div>
        </div>
      )}

      {activeTab === "viva" && (
        <div className="tab-content">
          <div className="exercise-section viva-points">
            <h3>🎯 Lab Exam Viva Questions</h3>
            <div className="viva-item">
              <p className="viva-q">Q1: Why is DELETE considered idempotent?</p>
              <p className="viva-a">
                <strong>A:</strong> Deleting an already deleted resource should not change the state of the system further (even if the first call returns 200 and subsequent calls return 404, the server state remains unchanged).
              </p>
            </div>
            <div className="viva-item">
              <p className="viva-q">Q2: Should a DELETE request have a body?</p>
              <p className="viva-a">
                <strong>A:</strong> Generally, no. A DELETE request typically identifies the resource to delete via the URI (route parameters). While HTTP allows a body, it's considered bad practice in REST to rely on it for DELETE.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Exercise7RestApiDelete;

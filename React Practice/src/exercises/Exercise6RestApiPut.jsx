// Exercise 6 — REST API using PUT
// Task: Create an API to update student details.
// Endpoint: PUT /api/students/:id

import React, { useState } from "react";

function Exercise6RestApiPut() {
  const [activeTab, setActiveTab] = useState("simulator");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  // Request state
  const [routeId, setRouteId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentDept, setStudentDept] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentMarks, setStudentMarks] = useState("");

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
          data: { error: "Internal Server Error", message: "Failed to update student" },
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

      const updatedFields = {};
      if (studentName) updatedFields.name = studentName;
      if (studentDept) updatedFields.department = studentDept;
      if (studentEmail) updatedFields.email = studentEmail;
      if (studentMarks) updatedFields.marks = parseFloat(studentMarks);

      const updatedStudent = {
        _id: "66e9a01f9a05",
        studentId: routeId,
        name: studentName || "Existing Name",
        department: studentDept || "Existing Dept",
        email: studentEmail || "existing@email.com",
        marks: studentMarks ? parseFloat(studentMarks) : 85,
        ...updatedFields
      };

      const jsonStr = JSON.stringify(updatedStudent);
      setResponseState({
        status: 200,
        statusText: "OK",
        duration: `${(Math.random() * 8 + 10).toFixed(1)}ms`,
        size: `${jsonStr.length} B`,
        contentType: "application/json; charset=utf-8",
        data: {
            message: "Student updated successfully",
            student: updatedStudent
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

  const apiSourceCode = `// server.js — Exercise 6: REST API using PUT (/api/students/:id)
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
// 3. REST API Endpoint: PUT /api/students/:id
// ============================================================
app.put('/api/students/:id', async (req, res) => {
    try {
        const studentId = req.params.id; // Route parameter
        const updateData = req.body;     // Fields to update

        // MongoDB update using findOneAndUpdate
        const updatedStudent = await Student.findOneAndUpdate(
            { studentId: studentId },
            { $set: updateData },
            { new: true, runValidators: true } // Return updated doc, run validations
        );

        // Response/error handling if student not found
        if (!updatedStudent) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'Student with the given ID was not found.'
            });
        }

        // Return updated student
        res.status(200).json({
            message: 'Student updated successfully',
            student: updatedStudent
        });
    } catch (error) {
        console.error('Error updating student:', error.message);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to update student in MongoDB',
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
        <span className="exercise-number">Exercise 6</span>
        <div>
          <h2 className="exercise-title">REST API using PUT</h2>
          <span className="marks-badge">Total: 10 Marks</span>
        </div>
      </div>

      <div className="exercise-question">
        <strong>Task:</strong> Create an API to update student details.
        <br />
        <strong>Endpoint:</strong> <code>PUT /api/students/:id</code>
        <br />
        <strong>Requirements:</strong> Accept student ID as route parameter, update selected fields, return the updated student.
      </div>

      <div className="evaluation-card">
        <h4>📋 Evaluation Rubric (10 Marks)</h4>
        <div className="rubric-grid rubric-4">
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">Route Parameter</span>
            <p className="rubric-desc">Correctly extract <code>:id</code> from route</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">3 Marks</span>
            <span className="rubric-title">PUT Implementation</span>
            <p className="rubric-desc">Correct <code>PUT</code> method and logic</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">3 Marks</span>
            <span className="rubric-title">MongoDB Update</span>
            <p className="rubric-desc">Update document in database</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">Error Handling</span>
            <p className="rubric-desc">Handle 404 (Not Found) and 500 errors properly</p>
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
              <span className="method-pill-put" style={{ backgroundColor: "#f59e0b", color: "white", padding: "4px 8px", borderRadius: "4px", fontWeight: "bold" }}>PUT</span>
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
              <div style={{ marginBottom: "16px" }}>
                 <label className="input-label">Student ID (:id) <span style={{color: "red"}}>*</span></label>
                 <input
                    type="text"
                    className="input-field-full"
                    placeholder="e.g. 23CSE001"
                    value={routeId}
                    onChange={(e) => setRouteId(e.target.value)}
                 />
              </div>

              <div className="params-header">
                <strong>Request Body (JSON) - Fields to Update</strong>
              </div>
              <div className="params-grid">
                <div>
                  <label className="input-label">name</label>
                  <input
                    type="text"
                    className="input-field-full"
                    placeholder="e.g. John Updated"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="input-label">department</label>
                  <input
                    type="text"
                    className="input-field-full"
                    placeholder="e.g. IT"
                    value={studentDept}
                    onChange={(e) => setStudentDept(e.target.value)}
                  />
                </div>
                <div>
                  <label className="input-label">email</label>
                  <input
                    type="email"
                    className="input-field-full"
                    placeholder="e.g. new@example.com"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="input-label">marks</label>
                  <input
                    type="number"
                    className="input-field-full"
                    placeholder="e.g. 98"
                    value={studentMarks}
                    onChange={(e) => setStudentMarks(e.target.value)}
                  />
                </div>
              </div>

              <div className="error-toggle-row">
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
              <h3>REST API PUT Implementation</h3>
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
              <p className="viva-q">Q1: Difference between PUT and PATCH?</p>
              <p className="viva-a">
                <strong>A:</strong> PUT is typically used to replace an entire resource. PATCH is used to apply partial modifications to a resource. However, in practice, PUT is often used for partial updates as well using Mongoose's `$set` or `findOneAndUpdate`.
              </p>
            </div>
            <div className="viva-item">
              <p className="viva-q">Q2: How do you extract the `id` from `/api/students/:id`?</p>
              <p className="viva-a">
                <strong>A:</strong> Using Express's `req.params` object: `req.params.id`.
              </p>
            </div>
            <div className="viva-item">
              <p className="viva-q">Q3: What does the <code>&#123; new: true &#125;</code> option do in <code>findOneAndUpdate</code>?</p>
              <p className="viva-a">
                <strong>A:</strong> By default, Mongoose returns the original document before the update was applied. Passing <code>&#123; new: true &#125;</code> ensures that it returns the updated document instead.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Exercise6RestApiPut;

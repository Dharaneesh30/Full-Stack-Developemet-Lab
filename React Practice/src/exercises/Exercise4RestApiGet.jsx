// Exercise 4 — REST API using GET
// Task: Create an Express REST API to retrieve student information from MongoDB.
// Endpoint: GET /api/students

import React, { useState } from "react";

function Exercise4RestApiGet() {
  const [activeTab, setActiveTab] = useState("simulator"); // 'simulator' | 'code' | 'viva'
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  // API parameters
  const [deptParam, setDeptParam] = useState("ALL");
  const [minCgpaParam, setMinCgpaParam] = useState("");
  const [sortParam, setSortParam] = useState("none");
  const [simulateError, setSimulateError] = useState(false);

  // Response state
  const [isLoading, setIsLoading] = useState(false);
  const [responseState, setResponseState] = useState({
    status: 200,
    statusText: "OK",
    duration: "14ms",
    size: "648 B",
    contentType: "application/json; charset=utf-8",
    data: [
      { _id: "66e9a01f9a01", regNo: "23CSE001", name: "Arun", department: "CSE", cgpa: 8.5, email: "arun@college.edu" },
      { _id: "66e9a01f9a02", regNo: "23CSE002", name: "Bala", department: "CSE", cgpa: 7.8, email: "bala@college.edu" },
      { _id: "66e9a01f9a03", regNo: "23ECE001", name: "Charan", department: "ECE", cgpa: 8.9, email: "charan@college.edu" },
      { _id: "66e9a01f9a04", regNo: "23IT001", name: "Divya", department: "IT", cgpa: 9.2, email: "divya@college.edu" },
    ],
  });

  // Base dataset
  const baseStudents = [
    { _id: "66e9a01f9a01", regNo: "23CSE001", name: "Arun", department: "CSE", cgpa: 8.5, email: "arun@college.edu" },
    { _id: "66e9a01f9a02", regNo: "23CSE002", name: "Bala", department: "CSE", cgpa: 7.8, email: "bala@college.edu" },
    { _id: "66e9a01f9a03", regNo: "23ECE001", name: "Charan", department: "ECE", cgpa: 8.9, email: "charan@college.edu" },
    { _id: "66e9a01f9a04", regNo: "23IT001", name: "Divya", department: "IT", cgpa: 9.2, email: "divya@college.edu" },
  ];

  // Construct query string for display
  const buildQueryString = () => {
    const params = [];
    if (deptParam !== "ALL") params.push(`dept=${deptParam}`);
    if (minCgpaParam) params.push(`minCgpa=${minCgpaParam}`);
    if (sortParam !== "none") params.push(`sort=${sortParam}`);
    return params.length > 0 ? `?${params.join("&")}` : "";
  };

  const queryString = buildQueryString();
  const requestUrl = `http://localhost:5000/api/students${queryString}`;

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
            success: false,
            error: "Internal Server Error",
            message: "Failed to query students from MongoDB: MongooseError: operation timed out",
          },
        });
        return;
      }

      let filtered = [...baseStudents];
      if (deptParam !== "ALL") {
        filtered = filtered.filter((s) => s.department === deptParam);
      }
      if (minCgpaParam) {
        const minVal = parseFloat(minCgpaParam);
        if (!isNaN(minVal)) {
          filtered = filtered.filter((s) => s.cgpa >= minVal);
        }
      }
      if (sortParam === "cgpa_desc") {
        filtered.sort((a, b) => b.cgpa - a.cgpa);
      } else if (sortParam === "cgpa_asc") {
        filtered.sort((a, b) => a.cgpa - b.cgpa);
      }

      const jsonStr = JSON.stringify(filtered);
      setResponseState({
        status: 200,
        statusText: "OK",
        duration: `${(Math.random() * 8 + 10).toFixed(1)}ms`,
        size: `${jsonStr.length} B`,
        contentType: "application/json; charset=utf-8",
        data: filtered,
      });
    }, 450);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(apiSourceCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(responseState.data, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const apiSourceCode = `// server.js — Exercise 4: REST API using GET (/api/students)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// 1. Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/CollegeDB')
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err.message));

// 2. Define Student Schema & Model
const studentSchema = new mongoose.Schema({
    regNo: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    department: { type: String, required: true },
    cgpa: { type: Number, required: true },
    email: { type: String, required: true }
});

const Student = mongoose.model('Student', studentSchema);

// ============================================================
// 3. REST API Endpoint: GET /api/students
// Requirements:
// - Retrieve all students from MongoDB
// - Support optional query filters (dept, minCgpa)
// - Return response in JSON format with status 200
// - Handle errors appropriately with status 500
// ============================================================
app.get('/api/students', async (req, res) => {
    try {
        const { dept, minCgpa, sort } = req.query;
        let queryFilter = {};

        // Optional department filter
        if (dept) {
            queryFilter.department = dept;
        }

        // Optional minimum CGPA filter
        if (minCgpa) {
            queryFilter.cgpa = { $gte: parseFloat(minCgpa) };
        }

        // Database retrieval
        let studentsQuery = Student.find(queryFilter);

        // Optional sorting
        if (sort === 'cgpa_desc') {
            studentsQuery = studentsQuery.sort({ cgpa: -1 });
        } else if (sort === 'cgpa_asc') {
            studentsQuery = studentsQuery.sort({ cgpa: 1 });
        }

        const students = await studentsQuery;

        // Return data in JSON format with HTTP 200 OK
        res.status(200).json(students);
    } catch (error) {
        // Error handling with HTTP 500 Internal Server Error
        console.error('Error fetching students:', error.message);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to retrieve students from database',
            details: error.message
        });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(\`REST API Server running on http://localhost:\${PORT}\`);
    console.log(\`Endpoint ready: http://localhost:\${PORT}/api/students\`);
});`;

  return (
    <div className="exercise-container">
      {/* Header */}
      <div className="exercise-header">
        <span className="exercise-number">Exercise 4</span>
        <div>
          <h2 className="exercise-title">REST API using GET</h2>
          <span className="marks-badge">Total: 10 Marks</span>
        </div>
      </div>

      {/* Task Box */}
      <div className="exercise-question">
        <strong>Task:</strong> Create an Express REST API to retrieve student information from MongoDB.
        <br />
        <strong>Endpoint:</strong> <code>GET /api/students</code>
      </div>

      {/* Evaluation Rubric Grid */}
      <div className="evaluation-card">
        <h4>📋 Evaluation Rubric (10 Marks)</h4>
        <div className="rubric-grid rubric-5">
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">API Route</span>
            <p className="rubric-desc">Correct <code>GET /api/students</code> route definition</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">3 Marks</span>
            <span className="rubric-title">Database Retrieval</span>
            <p className="rubric-desc">Query students from MongoDB via Mongoose/driver</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">JSON Response</span>
            <p className="rubric-desc">Return properly structured JSON with HTTP 200</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">Error Handling</span>
            <p className="rubric-desc">Catch exceptions & return 500 with error JSON</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">1 Mark</span>
            <span className="rubric-title">API Testing</span>
            <p className="rubric-desc">Validate with Postman, browser, or curl</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="tab-buttons">
        <button
          className={`tab-btn ${activeTab === "simulator" ? "active" : ""}`}
          onClick={() => setActiveTab("simulator")}
        >
          ⚡ Interactive REST API Client (Postman Style)
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
              <span className="method-pill-get">GET</span>
              <span className="api-url-display">{requestUrl}</span>
              <button
                className="btn-primary"
                onClick={handleSendRequest}
                disabled={isLoading}
              >
                {isLoading ? "⏳ Fetching..." : "🚀 Send Request"}
              </button>
            </div>

            {/* Query Parameters Filter Grid */}
            <div className="api-params-card">
              <div className="params-header">
                <strong>Query Parameters (Optional)</strong>
                <span className="text-muted">appends to URL query string</span>
              </div>
              <div className="params-grid">
                <div>
                  <label className="input-label">dept (Department)</label>
                  <select
                    className="select-field"
                    value={deptParam}
                    onChange={(e) => setDeptParam(e.target.value)}
                  >
                    <option value="ALL">All Departments (No filter)</option>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="IT">IT</option>
                  </select>
                </div>

                <div>
                  <label className="input-label">minCgpa (Minimum CGPA)</label>
                  <input
                    type="number"
                    step="0.1"
                    className="input-field-full"
                    placeholder="e.g. 8.0"
                    value={minCgpaParam}
                    onChange={(e) => setMinCgpaParam(e.target.value)}
                  />
                </div>

                <div>
                  <label className="input-label">sort (Ordering)</label>
                  <select
                    className="select-field"
                    value={sortParam}
                    onChange={(e) => setSortParam(e.target.value)}
                  >
                    <option value="none">Default (No sort)</option>
                    <option value="cgpa_desc">cgpa_desc (Highest First)</option>
                    <option value="cgpa_asc">cgpa_asc (Lowest First)</option>
                  </select>
                </div>
              </div>

              {/* Error Simulation Toggle */}
              <div className="error-toggle-row">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    checked={simulateError}
                    onChange={(e) => setSimulateError(e.target.checked)}
                  />
                  <span>Simulate 500 Database Error (Verify Error Handling Rubric)</span>
                </label>
              </div>
            </div>

            {/* Response Section */}
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

              {/* Response Headers */}
              <div className="response-headers-bar">
                <code>Content-Type: {responseState.contentType}</code>
                <code>Access-Control-Allow-Origin: *</code>
              </div>

              {/* JSON Body */}
              <pre className="code-block json-viewer" style={{ margin: 0 }}>
                {JSON.stringify(responseState.data, null, 2)}
              </pre>
            </div>

            {/* API Testing Snippets */}
            <div className="exercise-section" style={{ marginTop: "1.5rem" }}>
              <h4>🧪 How to Test This Endpoint</h4>
              <div className="test-commands-grid">
                <div>
                  <span className="test-label">1. Using cURL (Terminal)</span>
                  <pre className="code-block" style={{ margin: 0 }}>
                    {`curl -X GET "${requestUrl}"`}
                  </pre>
                </div>
                <div>
                  <span className="test-label">2. Using JavaScript fetch()</span>
                  <pre className="code-block" style={{ margin: 0 }}>
{`fetch('${requestUrl}')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SOURCE CODE */}
      {activeTab === "code" && (
        <div className="tab-content">
          <div className="exercise-section">
            <h3>1. Setup & Dependencies</h3>
            <pre className="code-block">
{`# 1. Initialize project
npm init -y

# 2. Install Express, Mongoose, and CORS
npm install express mongoose cors

# 3. Start server
node server.js`}
            </pre>
          </div>

          <div className="exercise-section">
            <div className="section-header-row">
              <h3>2. Complete REST API Implementation (server.js)</h3>
              <button className="copy-btn" onClick={copyCode}>
                {copiedCode ? "✓ Copied!" : "📋 Copy Code"}
              </button>
            </div>
            <pre className="code-block">{apiSourceCode}</pre>
          </div>

          <div className="exercise-section">
            <h3>3. Testing with Postman / Thunder Client / Browser</h3>
            <ul>
              <li><strong>Browser:</strong> Open <code>http://localhost:5000/api/students</code> directly in Google Chrome or Edge to view raw JSON data.</li>
              <li><strong>Postman:</strong> Create a new request, select <code>GET</code> method, enter <code>http://localhost:5000/api/students</code>, and click <strong>Send</strong>. Check Status: <code>200 OK</code>.</li>
              <li><strong>Query Filtering:</strong> Test <code>http://localhost:5000/api/students?dept=CSE</code> to verify filtering works.</li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 3: VIVA VOCE */}
      {activeTab === "viva" && (
        <div className="tab-content">
          <div className="exercise-section viva-points">
            <h3>🎯 Lab Exam Viva Questions & Answers</h3>
            <div className="viva-item">
              <p className="viva-q">Q1: What does REST stand for and what are its key constraints?</p>
              <p className="viva-a">
                <strong>A:</strong> REST stands for <strong>Representational State Transfer</strong>. It is an architectural style for designing networked applications. Key constraints include Statelessness, Client-Server architecture, Cacheability, and a Uniform Interface.
              </p>
            </div>
            <div className="viva-item">
              <p className="viva-q">Q2: Why is the HTTP GET method considered "Safe" and "Idempotent"?</p>
              <p className="viva-a">
                <strong>A:</strong> <strong>Safe</strong> means calling GET does not modify server or database state (read-only). <strong>Idempotent</strong> means calling the same GET request multiple times produces the exact same result without unintended side effects.
              </p>
            </div>
            <div className="viva-item">
              <p className="viva-q">Q3: What is the difference between Route Parameters and Query Parameters in Express?</p>
              <p className="viva-a">
                <strong>A:</strong>
                <ul>
                  <li><strong>Route Parameters</strong> (<code>/api/students/:id</code>) accessed via <code>req.params.id</code> identify a specific resource.</li>
                  <li><strong>Query Parameters</strong> (<code>/api/students?dept=CSE</code>) accessed via <code>req.query.dept</code> are used for filtering, sorting, or pagination.</li>
                </ul>
              </p>
            </div>
            <div className="viva-item">
              <p className="viva-q">Q4: What HTTP status code should be returned on successful retrieval vs server error?</p>
              <p className="viva-a">
                <strong>A:</strong>
                <ul>
                  <li><code>200 OK</code>: The request succeeded and student data is returned in the response body.</li>
                  <li><code>500 Internal Server Error</code>: An unexpected condition occurred on the server (e.g. database down, unhandled exception).</li>
                </ul>
              </p>
            </div>
            <div className="viva-item">
              <p className="viva-q">Q5: Why do we use <code>cors()</code> middleware in Express REST APIs?</p>
              <p className="viva-a">
                <strong>A:</strong> CORS (Cross-Origin Resource Sharing) is a browser security mechanism. Without the <code>cors()</code> middleware, frontend applications running on a different domain or port (like React on <code>localhost:5173</code>) would be blocked from fetching data from Express on <code>localhost:5000</code>.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Exercise4RestApiGet;

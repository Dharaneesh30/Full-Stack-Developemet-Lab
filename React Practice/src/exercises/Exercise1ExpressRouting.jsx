// Exercise 1 — Express Server and Routing
// Task: Create an Express.js application with routes for Home, About, Students and Contact.

import React, { useState } from "react";

function Exercise1ExpressRouting() {
  const [activeTab, setActiveTab] = useState("simulator"); // 'simulator' | 'code' | 'viva'
  const [currentRoute, setCurrentRoute] = useState("/");
  const [customInput, setCustomInput] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);
  const [serverLogs, setServerLogs] = useState([
    { id: 1, time: "11:00:00 AM", method: "GET", path: "/", status: 200, duration: "3ms" },
  ]);

  // Route definitions and their simulated responses
  const routeData = {
    "/": {
      name: "Home Route",
      status: 200,
      statusText: "OK",
      contentType: "text/html; charset=utf-8",
      body: `<!DOCTYPE html>
<html>
<head><title>Full Stack Lab - Home</title></head>
<body>
  <h1>Welcome to Full Stack Development Lab!</h1>
  <p>Express.js Server is running smoothly on port 3000.</p>
  <ul>
    <li><a href="/about">About Us</a></li>
    <li><a href="/students">Registered Students</a></li>
    <li><a href="/contact">Contact Page</a></li>
  </ul>
</body>
</html>`,
      description: "Root route returning a welcoming HTML response with site links.",
    },
    "/about": {
      name: "About Route",
      status: 200,
      statusText: "OK",
      contentType: "text/html; charset=utf-8",
      body: `<h1>About Full Stack Lab</h1>
<p><strong>Course:</strong> Full Stack Development Laboratory (2025-2026)</p>
<p><strong>Stack:</strong> Node.js, Express.js, MongoDB, React</p>
<p><strong>Objective:</strong> Master server-side routing, database persistence, and API development.</p>`,
      description: "Returns educational course description and laboratory objectives.",
    },
    "/students": {
      name: "Students Route",
      status: 200,
      statusText: "OK",
      contentType: "application/json; charset=utf-8",
      body: JSON.stringify(
        [
          { regNo: "23CSE001", name: "Arun", department: "CSE", cgpa: 8.5 },
          { regNo: "23CSE002", name: "Bala", department: "CSE", cgpa: 7.8 },
          { regNo: "23ECE001", name: "Charan", department: "ECE", cgpa: 8.9 },
          { regNo: "23IT001", name: "Divya", department: "IT", cgpa: 9.2 },
        ],
        null,
        2
      ),
      description: "Returns list of registered student records in JSON format.",
    },
    "/contact": {
      name: "Contact Route",
      status: 200,
      statusText: "OK",
      contentType: "text/html; charset=utf-8",
      body: `<h1>Contact Information</h1>
<p><strong>Department:</strong> Department of Computer Science & Engineering</p>
<p><strong>Email:</strong> lab.support@college.edu</p>
<p><strong>Phone:</strong> +91 44 2255 1234</p>
<p><strong>Lab Hours:</strong> Monday - Friday, 9:00 AM - 4:30 PM</p>`,
      description: "Returns institutional contact information and support channels.",
    },
  };

  const handleNavigate = (path) => {
    setCurrentRoute(path);
    const now = new Date().toLocaleTimeString();
    const isKnown = routeData[path] !== undefined;
    const newLog = {
      id: Date.now(),
      time: now,
      method: "GET",
      path: path,
      status: isKnown ? 200 : 404,
      duration: `${(Math.random() * 4 + 1).toFixed(1)}ms`,
    };
    setServerLogs((prev) => [newLog, ...prev.slice(0, 7)]);
  };

  const activeResponse =
    routeData[currentRoute] || {
      name: "404 Not Found Handler",
      status: 404,
      statusText: "Not Found",
      contentType: "text/html; charset=utf-8",
      body: `<!DOCTYPE html>
<html lang="en">
<head><title>404 Not Found</title></head>
<body>
  <h2>404 - Page Not Found</h2>
  <p>Cannot GET ${currentRoute}</p>
  <p>The requested route does not exist on this Express server.</p>
</body>
</html>`,
      description: "Express fallback 404 handler for undefined routes.",
    };

  const copySourceCode = () => {
    navigator.clipboard.writeText(expressSourceCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const expressSourceCode = `// server.js — Exercise 1: Express Server and Routing
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON and URL-encoded bodies (optional for GET)
app.use(express.json());

// 1. Home Route: GET /
app.get('/', (req, res) => {
    res.status(200).send(\`
        <h1>Welcome to Full Stack Development Lab!</h1>
        <p>Express.js Server is running on port \${PORT}.</p>
        <p>Available routes: /about, /students, /contact</p>
    \`);
});

// 2. About Route: GET /about
app.get('/about', (req, res) => {
    res.status(200).send(\`
        <h1>About Full Stack Lab</h1>
        <p>This laboratory covers Node.js, Express routing, and MongoDB integration.</p>
    \`);
});

// 3. Students Route: GET /students
app.get('/students', (req, res) => {
    const students = [
        { regNo: "23CSE001", name: "Arun", department: "CSE", cgpa: 8.5 },
        { regNo: "23CSE002", name: "Bala", department: "CSE", cgpa: 7.8 },
        { regNo: "23ECE001", name: "Charan", department: "ECE", cgpa: 8.9 },
        { regNo: "23IT001", name: "Divya", department: "IT", cgpa: 9.2 }
    ];
    res.status(200).json(students);
});

// 4. Contact Route: GET /contact
app.get('/contact', (req, res) => {
    res.status(200).send(\`
        <h1>Contact Information</h1>
        <p>Email: lab.support@college.edu</p>
        <p>Phone: +91 44 2255 1234</p>
    \`);
});

// 404 Error Handler for undefined routes
app.use((req, res) => {
    res.status(404).send(\`
        <h2>404 - Not Found</h2>
        <p>Cannot \${req.method} \${req.url}</p>
    \`);
});

// Start Express Server
app.listen(PORT, () => {
    console.log(\`Server is running at http://localhost:\${PORT}\`);
});`;

  return (
    <div className="exercise-container">
      {/* Header */}
      <div className="exercise-header">
        <span className="exercise-number">Exercise 1</span>
        <div>
          <h2 className="exercise-title">Express Server and Routing</h2>
          <span className="marks-badge">Total: 10 Marks</span>
        </div>
      </div>

      {/* Question / Task Box */}
      <div className="exercise-question">
        <strong>Task:</strong> Create an Express.js application with routes for <code>Home</code>, <code>About</code>, <code>Students</code>, and <code>Contact</code>.
      </div>

      {/* Evaluation Rubric Grid */}
      <div className="evaluation-card">
        <h4>📋 Evaluation Rubric (10 Marks)</h4>
        <div className="rubric-grid">
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">Node.js Project Setup</span>
            <p className="rubric-desc">Initialize project using <code>npm init -y</code></p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">Express Configuration</span>
            <p className="rubric-desc">Install & configure Express application</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">4 Marks</span>
            <span className="rubric-title">Route Implementation</span>
            <p className="rubric-desc">Implement 4 routes: Home, About, Students, Contact</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">Proper Response Handling</span>
            <p className="rubric-desc">Return appropriate HTML/JSON & status codes</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tab-buttons">
        <button
          className={`tab-btn ${activeTab === "simulator" ? "active" : ""}`}
          onClick={() => setActiveTab("simulator")}
        >
          ⚡ Interactive Server Simulator
        </button>
        <button
          className={`tab-btn ${activeTab === "code" ? "active" : ""}`}
          onClick={() => setActiveTab("code")}
        >
          💻 Complete Node.js / Express Source Code
        </button>
        <button
          className={`tab-btn ${activeTab === "viva" ? "active" : ""}`}
          onClick={() => setActiveTab("viva")}
        >
          🎯 Lab Exam Viva Questions (Q&A)
        </button>
      </div>

      {/* TAB 1: INTERACTIVE SIMULATOR */}
      {activeTab === "simulator" && (
        <div className="tab-content">
          <div className="exercise-section">
            <div className="section-header-row">
              <h3>Live Express Router Demo</h3>
              <div className="server-status-pill">
                <span className="pulse-dot"></span>
                <span>Express Server: Running on <strong>port 3000</strong></span>
              </div>
            </div>

            <p className="section-description">
              Test each of the four required routes by clicking below, or type a custom route to test the 404 handler.
            </p>

            {/* Quick Route Selector Buttons */}
            <div className="route-button-group">
              <button
                className={`route-btn ${currentRoute === "/" ? "active" : ""}`}
                onClick={() => handleNavigate("/")}
              >
                <span className="method-badge get">GET</span>
                <span>/ (Home)</span>
              </button>
              <button
                className={`route-btn ${currentRoute === "/about" ? "active" : ""}`}
                onClick={() => handleNavigate("/about")}
              >
                <span className="method-badge get">GET</span>
                <span>/about</span>
              </button>
              <button
                className={`route-btn ${currentRoute === "/students" ? "active" : ""}`}
                onClick={() => handleNavigate("/students")}
              >
                <span className="method-badge get">GET</span>
                <span>/students</span>
              </button>
              <button
                className={`route-btn ${currentRoute === "/contact" ? "active" : ""}`}
                onClick={() => handleNavigate("/contact")}
              >
                <span className="method-badge get">GET</span>
                <span>/contact</span>
              </button>
            </div>

            {/* Custom URL Bar */}
            <div className="url-bar-container">
              <span className="url-prefix">http://localhost:3000</span>
              <input
                type="text"
                className="url-input"
                placeholder="e.g. /unknown-route to test 404"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && customInput.trim()) {
                    handleNavigate(customInput.startsWith("/") ? customInput : `/${customInput}`);
                  }
                }}
              />
              <button
                className="btn-primary"
                onClick={() => {
                  if (customInput.trim()) {
                    handleNavigate(customInput.startsWith("/") ? customInput : `/${customInput}`);
                  }
                }}
              >
                Send Request
              </button>
            </div>

            {/* Response Viewer */}
            <div className="response-box">
              <div className="response-header">
                <div className="response-status-group">
                  <span className="response-label">HTTP Response:</span>
                  <span
                    className={`status-pill ${
                      activeResponse.status === 200 ? "status-200" : "status-404"
                    }`}
                  >
                    {activeResponse.status} {activeResponse.statusText}
                  </span>
                </div>
                <div className="response-meta">
                  <span>Content-Type: <code>{activeResponse.contentType}</code></span>
                </div>
              </div>

              <div className="response-preview-body">
                {activeResponse.contentType.includes("json") ? (
                  <pre className="code-block" style={{ margin: 0 }}>
                    {activeResponse.body}
                  </pre>
                ) : (
                  <div
                    className="rendered-html-preview"
                    dangerouslySetInnerHTML={{ __html: activeResponse.body }}
                  />
                )}
              </div>
            </div>

            {/* Live Server Terminal Logs */}
            <div className="terminal-box">
              <div className="terminal-header">
                <span className="terminal-title">🖥️ Server Console Output (Terminal)</span>
                <span className="terminal-sub">Real-time express request logger</span>
              </div>
              <div className="terminal-body">
                <div className="terminal-line text-muted">
                  &gt; [Server] express app listening at http://localhost:3000
                </div>
                {serverLogs.map((log) => (
                  <div key={log.id} className="terminal-line">
                    <span className="text-timestamp">[{log.time}]</span>{" "}
                    <span className="method-badge get">{log.method}</span>{" "}
                    <span className="text-white">{log.path}</span>{" "}
                    <span
                      className={log.status === 200 ? "text-green" : "text-red"}
                    >
                      {log.status}
                    </span>{" "}
                    <span className="text-muted">({log.duration})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: COMPLETE SOURCE CODE */}
      {activeTab === "code" && (
        <div className="tab-content">
          <div className="exercise-section">
            <div className="section-header-row">
              <h3>1. Step-by-Step Project Setup</h3>
            </div>
            <p>Execute these commands in your command prompt / terminal inside your project folder:</p>
            <pre className="code-block">
{`# 1. Initialize a new Node.js project
npm init -y

# 2. Install Express.js package
npm install express

# 3. Run the Express server
node server.js`}
            </pre>
          </div>

          <div className="exercise-section">
            <div className="section-header-row">
              <h3>2. Complete Server Implementation (server.js)</h3>
              <button className="copy-btn" onClick={copySourceCode}>
                {copiedCode ? "✓ Copied!" : "📋 Copy Code"}
              </button>
            </div>
            <pre className="code-block">{expressSourceCode}</pre>
          </div>

          <div className="exercise-section">
            <h3>3. package.json Configuration</h3>
            <pre className="code-block">
{`{
  "name": "express-routing-lab",
  "version": "1.0.0",
  "description": "Exercise 1: Express Server and Routing",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.19.2"
  }
}`}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 3: VIVA VOCE */}
      {activeTab === "viva" && (
        <div className="tab-content">
          <div className="exercise-section viva-points">
            <h3>🎯 Lab Exam Viva Questions & Answers</h3>
            <div className="viva-item">
              <p className="viva-q">Q1: What is Express.js and why is it used?</p>
              <p className="viva-a">
                <strong>A:</strong> Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications, specifically routing, middleware support, and HTTP request/response handling.
              </p>
            </div>
            <div className="viva-item">
              <p className="viva-q">Q2: How does routing work in Express.js?</p>
              <p className="viva-a">
                <strong>A:</strong> Routing defines how an application responds to a client request to a particular endpoint (URI path) and a specific HTTP method (such as GET, POST, PUT, DELETE). The structure is: <code>app.METHOD(PATH, HANDLER)</code>.
              </p>
            </div>
            <div className="viva-item">
              <p className="viva-q">Q3: What is the difference between <code>res.send()</code> and <code>res.json()</code>?</p>
              <p className="viva-a">
                <strong>A:</strong> <code>res.send()</code> automatically determines the content-type (e.g. text/html or Buffer) based on the input. <code>res.json()</code> explicitly converts objects or arrays to JSON format and sets the <code>Content-Type: application/json</code> response header.
              </p>
            </div>
            <div className="viva-item">
              <p className="viva-q">Q4: How do you handle 404 Not Found routes in Express?</p>
              <p className="viva-a">
                <strong>A:</strong> By placing a fallback middleware handler at the bottom of all routes using <code>app.use((req, res) =&gt; &#123; res.status(404).send('Not Found'); &#125;)</code>. Any request that does not match the routes above falls into this middleware.
              </p>
            </div>
            <div className="viva-item">
              <p className="viva-q">Q5: What are the two parameters passed to route handlers?</p>
              <p className="viva-a">
                <strong>A:</strong> <code>req</code> (Request object containing headers, query params, body, and URL) and <code>res</code> (Response object used to send headers, status codes, and data back to the client).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Exercise1ExpressRouting;

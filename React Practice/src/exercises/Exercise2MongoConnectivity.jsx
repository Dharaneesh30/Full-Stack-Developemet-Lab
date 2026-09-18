// Exercise 2 — MongoDB Database Connectivity
// Task: Create a Node.js/Express application and establish connectivity with MongoDB. Create a students collection.

import React, { useState } from "react";

function Exercise2MongoConnectivity() {
  const [activeTab, setActiveTab] = useState("simulator"); // 'simulator' | 'code' | 'viva'
  const [connectionState, setConnectionState] = useState("connected"); // 'disconnected' | 'connecting' | 'connected' | 'error'
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [dbUri, setDbUri] = useState("mongodb://localhost:27017");
  const [dbName, setDbName] = useState("CollegeDB");
  const [collectionName, setCollectionName] = useState("students");
  const [insertedCount, setInsertedCount] = useState(3);
  const [copiedCode, setCopiedCode] = useState(false);
  const [logs, setLogs] = useState([
    { id: 1, time: "11:00:00 AM", type: "info", text: "Initializing MongoDB Client..." },
    { id: 2, time: "11:00:01 AM", type: "success", text: "Connected to MongoDB successfully at mongodb://localhost:27017" },
    { id: 3, time: "11:00:01 AM", type: "info", text: "Selected Database: CollegeDB" },
    { id: 4, time: "11:00:02 AM", type: "success", text: "Collection 'students' initialized with 3 initial records." },
  ]);

  const [studentDocs, setStudentDocs] = useState([
    { _id: "66e9a01f9a01", regNo: "23CSE001", name: "Arun", department: "CSE", cgpa: 8.5 },
    { _id: "66e9a01f9a02", regNo: "23CSE002", name: "Bala", department: "CSE", cgpa: 7.8 },
    { _id: "66e9a01f9a03", regNo: "23ECE001", name: "Charan", department: "ECE", cgpa: 8.9 },
  ]);

  const handleConnect = () => {
    setConnectionState("connecting");
    const now = new Date().toLocaleTimeString();
    setLogs((prev) => [
      { id: Date.now(), time: now, type: "info", text: `Attempting connection to ${dbUri}/${dbName}...` },
      ...prev,
    ]);

    setTimeout(() => {
      const timeNow = new Date().toLocaleTimeString();
      if (simulateFailure) {
        setConnectionState("error");
        setLogs((prev) => [
          {
            id: Date.now(),
            time: timeNow,
            type: "error",
            text: "MongoNetworkError: failed to connect to server [localhost:27017] on first connect [ECONNREFUSED 127.0.0.1:27017]",
          },
          ...prev,
        ]);
      } else {
        setConnectionState("connected");
        setLogs((prev) => [
          {
            id: Date.now() + 1,
            time: timeNow,
            type: "success",
            text: `Connected to MongoDB successfully! Database: ${dbName}`,
          },
          ...prev,
        ]);
      }
    }, 800);
  };

  const handleDisconnect = () => {
    setConnectionState("disconnected");
    const now = new Date().toLocaleTimeString();
    setLogs((prev) => [
      { id: Date.now(), time: now, type: "warn", text: "MongoDB connection closed gracefully." },
      ...prev,
    ]);
  };

  const handleInsertDocument = () => {
    if (connectionState !== "connected") return;
    const newRegNo = `23IT00${studentDocs.length + 1}`;
    const names = ["Divya", "Elango", "Fathima", "Gowtham", "Harish"];
    const pickedName = names[studentDocs.length % names.length];
    const newDoc = {
      _id: Math.random().toString(16).slice(2, 14),
      regNo: newRegNo,
      name: pickedName,
      department: "IT",
      cgpa: (Math.random() * 2 + 7.5).toFixed(1),
    };

    setStudentDocs((prev) => [...prev, newDoc]);
    setInsertedCount((prev) => prev + 1);
    const now = new Date().toLocaleTimeString();
    setLogs((prev) => [
      {
        id: Date.now(),
        time: now,
        type: "success",
        text: `db.${collectionName}.insertOne({ regNo: "${newDoc.regNo}", name: "${newDoc.name}" }) — 1 document inserted.`,
      },
      ...prev,
    ]);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(mongooseSourceCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const mongooseSourceCode = `// server.js — Exercise 2: MongoDB Database Connectivity
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// MongoDB Connection URI (Local MongoDB or Atlas)
const MONGODB_URI = 'mongodb://127.0.0.1:27017/CollegeDB';

// Establish Connection with Error Handling
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB successfully!');
        console.log('Active Database: CollegeDB');
        // Initialize Collection and Documents
        initializeCollection();
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });

// Student Schema Definition
const studentSchema = new mongoose.Schema({
    regNo: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    department: { type: String, required: true },
    cgpa: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Create 'Students' Model (Mongoose maps this to 'students' collection)
const Student = mongoose.model('Student', studentSchema);

// Helper function to insert initial student documents
async function initializeCollection() {
    try {
        const count = await Student.countDocuments();
        if (count === 0) {
            const initialStudents = [
                { regNo: "23CSE001", name: "Arun", department: "CSE", cgpa: 8.5 },
                { regNo: "23CSE002", name: "Bala", department: "CSE", cgpa: 7.8 },
                { regNo: "23ECE001", name: "Charan", department: "ECE", cgpa: 8.9 }
            ];
            await Student.insertMany(initialStudents);
            console.log('Inserted initial student documents into students collection.');
        } else {
            console.log(\`Students collection already has \${count} documents.\`);
        }
    } catch (err) {
        console.error('Failed to initialize students collection:', err.message);
    }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    const isConnected = mongoose.connection.readyState === 1;
    res.json({
        status: isConnected ? 'Connected' : 'Disconnected',
        database: 'CollegeDB',
        collection: 'students'
    });
});

app.listen(PORT, () => {
    console.log(\`Express server running on http://localhost:\${PORT}\`);
});`;

  return (
    <div className="exercise-container">
      {/* Header */}
      <div className="exercise-header">
        <span className="exercise-number">Exercise 2</span>
        <div>
          <h2 className="exercise-title">MongoDB Database Connectivity</h2>
          <span className="marks-badge">Total: 10 Marks</span>
        </div>
      </div>

      {/* Question / Task Box */}
      <div className="exercise-question">
        <strong>Task:</strong> Create a Node.js/Express application and establish connectivity with MongoDB. Create a <code>students</code> collection.
      </div>

      {/* Evaluation Rubric Grid */}
      <div className="evaluation-card">
        <h4>📋 Evaluation Rubric (10 Marks)</h4>
        <div className="rubric-grid">
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">MongoDB Setup</span>
            <p className="rubric-desc">Install driver/Mongoose and configure MongoDB daemon</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">4 Marks</span>
            <span className="rubric-title">Correct Connection</span>
            <p className="rubric-desc">Establish successful connection to database</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">DB / Collection Creation</span>
            <p className="rubric-desc">Create/select database and students collection</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">Error Handling</span>
            <p className="rubric-desc">Proper try/catch and error event handling</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="tab-buttons">
        <button
          className={`tab-btn ${activeTab === "simulator" ? "active" : ""}`}
          onClick={() => setActiveTab("simulator")}
        >
          ⚡ Live Connection & Collection Simulator
        </button>
        <button
          className={`tab-btn ${activeTab === "code" ? "active" : ""}`}
          onClick={() => setActiveTab("code")}
        >
          💻 Mongoose & Native Driver Source Code
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
              <h3>MongoDB Connection & Collection Controller</h3>
              <div className="server-status-pill">
                <span
                  className={`pulse-dot ${
                    connectionState === "connected"
                      ? "dot-green"
                      : connectionState === "connecting"
                      ? "dot-yellow"
                      : "dot-red"
                  }`}
                ></span>
                <span>
                  Status:{" "}
                  <strong style={{ textTransform: "capitalize" }}>
                    {connectionState}
                  </strong>
                </span>
              </div>
            </div>

            {/* Connection Configuration Inputs */}
            <div className="mongo-config-grid">
              <div>
                <label className="input-label">Connection URI</label>
                <input
                  type="text"
                  className="input-field-full"
                  value={dbUri}
                  onChange={(e) => setDbUri(e.target.value)}
                  disabled={connectionState === "connected"}
                />
              </div>
              <div>
                <label className="input-label">Database Name</label>
                <input
                  type="text"
                  className="input-field-full"
                  value={dbName}
                  onChange={(e) => setDbName(e.target.value)}
                  disabled={connectionState === "connected"}
                />
              </div>
              <div>
                <label className="input-label">Collection Name</label>
                <input
                  type="text"
                  className="input-field-full"
                  value={collectionName}
                  onChange={(e) => setCollectionName(e.target.value)}
                  disabled={connectionState === "connected"}
                />
              </div>
            </div>

            {/* Error simulation toggle & Action buttons */}
            <div className="mongo-action-bar">
              <div className="action-buttons-group">
                {connectionState === "connected" ? (
                  <button className="btn-danger" onClick={handleDisconnect}>
                    🔌 Disconnect
                  </button>
                ) : (
                  <button
                    className="btn-primary"
                    onClick={handleConnect}
                    disabled={connectionState === "connecting"}
                  >
                    {connectionState === "connecting" ? "⏳ Connecting..." : "⚡ Connect to MongoDB"}
                  </button>
                )}

                <button
                  className="btn-secondary"
                  onClick={handleInsertDocument}
                  disabled={connectionState !== "connected"}
                >
                  ➕ Insert Sample Student Document
                </button>
              </div>

              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={simulateFailure}
                  onChange={(e) => setSimulateFailure(e.target.checked)}
                />
                <span>Simulate Connection Failure (Demonstrate Error Handling)</span>
              </label>
            </div>

            {/* Connection Info Cards */}
            <div className="mongo-stats-grid">
              <div className="mongo-stat-card">
                <span className="stat-label">Active Database</span>
                <span className="stat-value">{connectionState === "connected" ? dbName : "None"}</span>
              </div>
              <div className="mongo-stat-card">
                <span className="stat-label">Collection</span>
                <span className="stat-value">{connectionState === "connected" ? collectionName : "None"}</span>
              </div>
              <div className="mongo-stat-card">
                <span className="stat-label">Documents Stored</span>
                <span className="stat-value text-green">
                  {connectionState === "connected" ? studentDocs.length : 0}
                </span>
              </div>
              <div className="mongo-stat-card">
                <span className="stat-label">Default Port</span>
                <span className="stat-value">27017</span>
              </div>
            </div>

            {/* Live Collection Inspector */}
            {connectionState === "connected" && (
              <div className="collection-inspector">
                <h4>📁 Database Collection: <code>{dbName}.{collectionName}</code></h4>
                <div className="table-responsive">
                  <table className="student-table">
                    <thead>
                      <tr>
                        <th>_id</th>
                        <th>Reg No</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>CGPA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentDocs.map((doc) => (
                        <tr key={doc._id}>
                          <td><code>ObjectId("{doc._id}")</code></td>
                          <td><strong>{doc.regNo}</strong></td>
                          <td>{doc.name}</td>
                          <td><span className="dept-badge">{doc.department}</span></td>
                          <td>{doc.cgpa}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Live Console Output */}
            <div className="terminal-box">
              <div className="terminal-header">
                <span className="terminal-title">🖥️ MongoDB Connection Terminal & Query Log</span>
                <span className="terminal-sub">Real-time driver & Mongoose events</span>
              </div>
              <div className="terminal-body">
                {logs.map((log) => (
                  <div key={log.id} className="terminal-line">
                    <span className="text-timestamp">[{log.time}]</span>{" "}
                    <span
                      className={
                        log.type === "success"
                          ? "text-green"
                          : log.type === "error"
                          ? "text-red"
                          : log.type === "warn"
                          ? "text-yellow"
                          : "text-blue"
                      }
                    >
                      {log.type.toUpperCase()}
                    </span>{" "}
                    <span className="text-white">{log.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SOURCE CODE */}
      {activeTab === "code" && (
        <div className="tab-content">
          <div className="exercise-section">
            <h3>1. Terminal Commands (Setup & Install)</h3>
            <pre className="code-block">
{`# 1. Initialize Node.js project
npm init -y

# 2. Install Express and Mongoose
npm install express mongoose

# 3. Ensure MongoDB daemon is running locally
# On Windows: run 'mongod' in command prompt or check Windows Services for 'MongoDB'

# 4. Run the application
node server.js`}
            </pre>
          </div>

          <div className="exercise-section">
            <div className="section-header-row">
              <h3>2. Mongoose Implementation (server.js)</h3>
              <button className="copy-btn" onClick={copyCode}>
                {copiedCode ? "✓ Copied!" : "📋 Copy Code"}
              </button>
            </div>
            <pre className="code-block">{mongooseSourceCode}</pre>
          </div>

          <div className="exercise-section">
            <h3>3. Alternative: Native MongoDB Driver (MongoClient)</h3>
            <pre className="code-block">
{`// Native Driver Alternative using 'mongodb' package
const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const dbName = 'CollegeDB';

async function connectAndInsert() {
    try {
        await client.connect();
        console.log('Connected successfully to MongoDB server');
        
        const db = client.db(dbName);
        const collection = db.collection('students');
        
        // Insert a student document
        const result = await collection.insertOne({
            regNo: "23CSE001",
            name: "Arun",
            department: "CSE",
            cgpa: 8.5
        });
        console.log('Document inserted with _id:', result.insertedId);
    } catch (err) {
        console.error('MongoDB Connection Error:', err);
    } finally {
        await client.close();
    }
}

connectAndInsert();`}
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
              <p className="viva-q">Q1: What is MongoDB and what type of database is it?</p>
              <p className="viva-a">
                <strong>A:</strong> MongoDB is a popular open-source, document-oriented NoSQL database. It stores data in flexible, JSON-like documents called BSON (Binary JSON) rather than tables and rows.
              </p>
            </div>
            <div className="viva-item">
              <p className="viva-q">Q2: What is Mongoose and why do we use it with Express?</p>
              <p className="viva-a">
                <strong>A:</strong> Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a schema-based solution to model application data, handles type casting, validation, query building, and business logic hooks.
              </p>
            </div>
            <div className="viva-item">
              <p className="viva-q">Q3: What is the default port on which MongoDB server runs?</p>
              <p className="viva-a">
                <strong>A:</strong> The default port for MongoDB daemon (<code>mongod</code>) is <code>27017</code>. The standard connection string format is <code>mongodb://localhost:27017/DatabaseName</code>.
              </p>
            </div>
            <div className="viva-item">
              <p className="viva-q">Q4: How do you handle connection errors in Mongoose?</p>
              <p className="viva-a">
                <strong>A:</strong> Using promise chaining <code>.catch(err =&gt; console.error(err))</code> or <code>try/catch</code> with <code>await mongoose.connect(...)</code>, as well as listening to connection events: <code>mongoose.connection.on('error', err =&gt; ...)</code>.
              </p>
            </div>
            <div className="viva-item">
              <p className="viva-q">Q5: What is the difference between a Database, Collection, and Document in MongoDB?</p>
              <p className="viva-a">
                <strong>A:</strong> In MongoDB:
                <ul>
                  <li><strong>Database</strong> corresponds to an RDBMS database (e.g. <code>CollegeDB</code>).</li>
                  <li><strong>Collection</strong> corresponds to a Table (e.g. <code>students</code>).</li>
                  <li><strong>Document</strong> corresponds to a Row/Record (e.g. <code>&#123; regNo: "23CSE001", name: "Arun" &#125;</code>).</li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Exercise2MongoConnectivity;

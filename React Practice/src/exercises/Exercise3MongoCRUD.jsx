// Exercise 3 — MongoDB CRUD Operations
// Task: Perform CRUD operations on a students collection.

import React, { useState } from "react";

function Exercise3MongoCRUD() {
  const [activeTab, setActiveTab] = useState("simulator"); // 'simulator' | 'code' | 'viva'
  const [copiedCode, setCopiedCode] = useState(false);

  // Initial student dataset
  const initialStudents = [
    { id: 1, regNo: "23CSE001", name: "Arun", department: "CSE", cgpa: 8.5, email: "arun@college.edu" },
    { id: 2, regNo: "23CSE002", name: "Bala", department: "CSE", cgpa: 7.8, email: "bala@college.edu" },
    { id: 3, regNo: "23ECE001", name: "Charan", department: "ECE", cgpa: 8.9, email: "charan@college.edu" },
    { id: 4, regNo: "23IT001", name: "Divya", department: "IT", cgpa: 9.2, email: "divya@college.edu" },
  ];

  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDept, setFilterDept] = useState("ALL");
  const [sortByCgpa, setSortByCgpa] = useState("none"); // 'none' | 'desc' | 'asc'

  // Insert form state
  const [newRegNo, setNewRegNo] = useState("");
  const [newName, setNewName] = useState("");
  const [newDept, setNewDept] = useState("CSE");
  const [newCgpa, setNewCgpa] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [formError, setFormError] = useState("");

  // Edit modal state
  const [editingStudent, setEditingStudent] = useState(null);

  // Live Query state
  const [lastQuery, setLastQuery] = useState({
    operation: "READ (Default)",
    shell: 'db.Students.find()',
    mongoose: 'await Student.find();',
    message: "Fetched all 4 initial student records.",
  });

  // Handle Insert
  const handleInsert = (e) => {
    e.preventDefault();
    if (!newRegNo.trim() || !newName.trim() || !newCgpa.trim() || !newEmail.trim()) {
      setFormError("Please fill in all fields.");
      return;
    }

    if (students.some((s) => s.regNo.toLowerCase() === newRegNo.trim().toLowerCase())) {
      setFormError(`Student with Reg No ${newRegNo} already exists!`);
      return;
    }

    const cgpaNum = parseFloat(newCgpa);
    if (isNaN(cgpaNum) || cgpaNum < 0 || cgpaNum > 10) {
      setFormError("CGPA must be a number between 0.0 and 10.0");
      return;
    }

    const newStudent = {
      id: Date.now(),
      regNo: newRegNo.trim().toUpperCase(),
      name: newName.trim(),
      department: newDept,
      cgpa: cgpaNum,
      email: newEmail.trim(),
    };

    setStudents((prev) => [...prev, newStudent]);
    setFormError("");
    setNewRegNo("");
    setNewName("");
    setNewCgpa("");
    setNewEmail("");

    setLastQuery({
      operation: "CREATE (Insert)",
      shell: `db.Students.insertOne({\n  regNo: "${newStudent.regNo}",\n  name: "${newStudent.name}",\n  department: "${newStudent.department}",\n  cgpa: ${newStudent.cgpa},\n  email: "${newStudent.email}"\n});`,
      mongoose: `await Student.create({\n  regNo: "${newStudent.regNo}",\n  name: "${newStudent.name}",\n  department: "${newStudent.department}",\n  cgpa: ${newStudent.cgpa},\n  email: "${newStudent.email}"\n});`,
      message: `Successfully inserted student ${newStudent.name} (${newStudent.regNo}).`,
    });
  };

  // Handle Delete
  const handleDelete = (student) => {
    setStudents((prev) => prev.filter((s) => s.id !== student.id));
    setLastQuery({
      operation: "DELETE",
      shell: `db.Students.deleteOne({ regNo: "${student.regNo}" });`,
      mongoose: `await Student.deleteOne({ regNo: "${student.regNo}" });`,
      message: `Deleted student ${student.name} (${student.regNo}) from collection.`,
    });
  };

  // Handle Update
  const handleSaveUpdate = () => {
    if (!editingStudent) return;
    const cgpaNum = parseFloat(editingStudent.cgpa);
    if (isNaN(cgpaNum) || cgpaNum < 0 || cgpaNum > 10) {
      alert("Invalid CGPA. Must be between 0.0 and 10.0");
      return;
    }

    setStudents((prev) =>
      prev.map((s) => (s.id === editingStudent.id ? { ...editingStudent, cgpa: cgpaNum } : s))
    );

    setLastQuery({
      operation: "UPDATE",
      shell: `db.Students.updateOne(\n  { regNo: "${editingStudent.regNo}" },\n  { $set: { cgpa: ${cgpaNum}, email: "${editingStudent.email}" } }\n);`,
      mongoose: `await Student.updateOne(\n  { regNo: "${editingStudent.regNo}" },\n  { $set: { cgpa: ${cgpaNum}, email: "${editingStudent.email}" } }\n);`,
      message: `Updated ${editingStudent.name}'s CGPA to ${cgpaNum} and email to ${editingStudent.email}.`,
    });

    setEditingStudent(null);
  };

  // Reset to default
  const handleReset = () => {
    setStudents(initialStudents);
    setSearchTerm("");
    setFilterDept("ALL");
    setSortByCgpa("none");
    setLastQuery({
      operation: "RESET",
      shell: "db.Students.deleteMany({});\ndb.Students.insertMany([...]);",
      mongoose: "await Student.deleteMany({});\nawait Student.insertMany([...]);",
      message: "Reset students collection back to initial 4 sample records.",
    });
  };

  // Filtered & Sorted list
  const filteredStudents = students
    .filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.regNo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = filterDept === "ALL" || s.department === filterDept;
      return matchesSearch && matchesDept;
    })
    .sort((a, b) => {
      if (sortByCgpa === "desc") return b.cgpa - a.cgpa;
      if (sortByCgpa === "asc") return a.cgpa - b.cgpa;
      return 0;
    });

  const copyCode = () => {
    navigator.clipboard.writeText(crudSourceCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const crudSourceCode = `// crudOperations.js — Exercise 3: MongoDB CRUD Operations
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/CollegeDB')
    .then(() => console.log('Connected to CollegeDB'))
    .catch(err => console.error('Connection error:', err));

// Define Student Schema
const studentSchema = new mongoose.Schema({
    regNo: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    department: { type: String, required: true },
    cgpa: { type: Number, required: true },
    email: { type: String, required: true }
});

const Student = mongoose.model('Student', studentSchema);

async function runCRUD() {
    try {
        // ============================================
        // 1. CREATE / INSERT OPERATIONS
        // ============================================
        console.log('--- 1. INSERT OPERATION ---');
        // Insert a single student
        const student1 = await Student.create({
            regNo: "23CSE001",
            name: "Arun",
            department: "CSE",
            cgpa: 8.5,
            email: "arun@college.edu"
        });
        console.log('Inserted Student:', student1.name);

        // Insert multiple students
        await Student.insertMany([
            { regNo: "23CSE002", name: "Bala", department: "CSE", cgpa: 7.8, email: "bala@college.edu" },
            { regNo: "23ECE001", name: "Charan", department: "ECE", cgpa: 8.9, email: "charan@college.edu" },
            { regNo: "23IT001", name: "Divya", department: "IT", cgpa: 9.2, email: "divya@college.edu" }
        ]);
        console.log('Inserted multiple student documents.');

        // ============================================
        // 2. READ / DISPLAY OPERATIONS
        // ============================================
        console.log('\\n--- 2. READ OPERATION ---');
        // Fetch all students
        const allStudents = await Student.find();
        console.log('Total students in collection:', allStudents.length);

        // Fetch students with filter & sorting
        const cseStudents = await Student.find({ department: "CSE" }).sort({ cgpa: -1 });
        console.log('CSE Students sorted by CGPA (descending):', cseStudents);

        // ============================================
        // 3. UPDATE OPERATION
        // ============================================
        console.log('\\n--- 3. UPDATE OPERATION ---');
        // Update student CGPA and email
        const updateResult = await Student.updateOne(
            { regNo: "23CSE002" },
            { $set: { cgpa: 8.2, email: "bala.new@college.edu" } }
        );
        console.log('Documents updated:', updateResult.modifiedCount);

        // ============================================
        // 4. DELETE OPERATION
        // ============================================
        console.log('\\n--- 4. DELETE OPERATION ---');
        // Delete a student by registration number
        const deleteResult = await Student.deleteOne({ regNo: "23IT001" });
        console.log('Documents deleted:', deleteResult.deletedCount);

        // Final verification
        const remaining = await Student.find();
        console.log('\\nFinal Remaining Students Count:', remaining.length);

    } catch (error) {
        console.error('CRUD Error:', error.message);
    } finally {
        await mongoose.connection.close();
        console.log('Connection closed.');
    }
}

runCRUD();`;

  return (
    <div className="exercise-container">
      {/* Header */}
      <div className="exercise-header">
        <span className="exercise-number">Exercise 3</span>
        <div>
          <h2 className="exercise-title">MongoDB CRUD Operations</h2>
          <span className="marks-badge">Total: 10 Marks</span>
        </div>
      </div>

      {/* Task Box */}
      <div className="exercise-question">
        <strong>Task:</strong> Perform CRUD (Create, Read, Update, Delete) operations on a <code>students</code> collection in MongoDB.
      </div>

      {/* Evaluation Rubric Grid */}
      <div className="evaluation-card">
        <h4>📋 Evaluation Rubric (10 Marks)</h4>
        <div className="rubric-grid rubric-5">
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">Insert Operation</span>
            <p className="rubric-desc">Insert student documents into collection</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">Read Operation</span>
            <p className="rubric-desc">Retrieve and display students with filters</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">Update Operation</span>
            <p className="rubric-desc">Modify student details using $set</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">Delete Operation</span>
            <p className="rubric-desc">Delete a student from collection</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">Correct Queries</span>
            <p className="rubric-desc">Valid MongoDB queries and expected outputs</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="tab-buttons">
        <button
          className={`tab-btn ${activeTab === "simulator" ? "active" : ""}`}
          onClick={() => setActiveTab("simulator")}
        >
          ⚡ Interactive CRUD Playground
        </button>
        <button
          className={`tab-btn ${activeTab === "code" ? "active" : ""}`}
          onClick={() => setActiveTab("code")}
        >
          💻 Complete Node.js / Mongoose CRUD Script
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
          {/* Section 1: Insert New Student */}
          <div className="exercise-section">
            <h3>1. Insert New Student Document (Create)</h3>
            {formError && <div className="error-banner">⚠️ {formError}</div>}
            <form onSubmit={handleInsert} className="crud-form">
              <div>
                <label className="input-label">Reg No</label>
                <input
                  type="text"
                  className="input-field-full"
                  placeholder="e.g. 23CSE003"
                  value={newRegNo}
                  onChange={(e) => setNewRegNo(e.target.value)}
                />
              </div>
              <div>
                <label className="input-label">Student Name</label>
                <input
                  type="text"
                  className="input-field-full"
                  placeholder="e.g. Kavya"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div>
                <label className="input-label">Department</label>
                <select
                  className="select-field"
                  value={newDept}
                  onChange={(e) => setNewDept(e.target.value)}
                >
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="IT">IT</option>
                  <option value="MECH">MECH</option>
                  <option value="AIDS">AIDS</option>
                </select>
              </div>
              <div>
                <label className="input-label">CGPA (0 - 10)</label>
                <input
                  type="number"
                  step="0.1"
                  className="input-field-full"
                  placeholder="e.g. 8.7"
                  value={newCgpa}
                  onChange={(e) => setNewCgpa(e.target.value)}
                />
              </div>
              <div>
                <label className="input-label">Email Address</label>
                <input
                  type="email"
                  className="input-field-full"
                  placeholder="kavya@college.edu"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>
              <div className="form-submit-row">
                <button type="submit" className="btn-primary">
                  ➕ Insert Student (insertOne)
                </button>
              </div>
            </form>
          </div>

          {/* Section 2: Live Database View & Controls (Read, Update, Delete) */}
          <div className="exercise-section">
            <div className="section-header-row">
              <h3>2. Read, Query & Manage Students Collection</h3>
              <button className="btn-secondary" onClick={handleReset}>
                🔄 Reset Sample Data
              </button>
            </div>

            {/* Read Filter Controls */}
            <div className="filter-controls-bar">
              <div className="filter-item">
                <label className="input-label">🔍 Search (Name or RegNo)</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Type to filter..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="filter-item">
                <label className="input-label">Department Filter</label>
                <select
                  className="select-field"
                  value={filterDept}
                  onChange={(e) => setFilterDept(e.target.value)}
                >
                  <option value="ALL">All Departments</option>
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="IT">IT</option>
                  <option value="MECH">MECH</option>
                  <option value="AIDS">AIDS</option>
                </select>
              </div>

              <div className="filter-item">
                <label className="input-label">Sort by CGPA</label>
                <select
                  className="select-field"
                  value={sortByCgpa}
                  onChange={(e) => setSortByCgpa(e.target.value)}
                >
                  <option value="none">Default (No sort)</option>
                  <option value="desc">Highest First (Descending)</option>
                  <option value="asc">Lowest First (Ascending)</option>
                </select>
              </div>

              <div className="records-counter">
                Showing <strong>{filteredStudents.length}</strong> of <strong>{students.length}</strong> students
              </div>
            </div>

            {/* Students Table */}
            <div className="table-responsive">
              <table className="student-table">
                <thead>
                  <tr>
                    <th>Reg No</th>
                    <th>Name</th>
                    <th>Dept</th>
                    <th>CGPA</th>
                    <th>Email</th>
                    <th>Actions (Update / Delete)</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center", padding: "2rem", color: "#94a3b8" }}>
                        No student documents found matching criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((student) => (
                      <tr key={student.id}>
                        <td><strong>{student.regNo}</strong></td>
                        <td>{student.name}</td>
                        <td><span className="dept-badge">{student.department}</span></td>
                        <td>
                          <span
                            className={`cgpa-badge ${
                              student.cgpa >= 8.5 ? "cgpa-high" : student.cgpa >= 7.5 ? "cgpa-med" : "cgpa-low"
                            }`}
                          >
                            {student.cgpa}
                          </span>
                        </td>
                        <td>{student.email}</td>
                        <td>
                          <div className="action-buttons-cell">
                            <button
                              className="btn-action-edit"
                              onClick={() => setEditingStudent({ ...student })}
                            >
                              ✏️ Edit
                            </button>
                            <button
                              className="btn-action-delete"
                              onClick={() => handleDelete(student)}
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Edit Student Modal / Inline Editor */}
          {editingStudent && (
            <div className="modal-overlay">
              <div className="modal-card">
                <h3>✏️ Update Student Details</h3>
                <p className="text-muted">
                  Updating document for <strong>{editingStudent.name}</strong> ({editingStudent.regNo})
                </p>

                <div className="modal-fields">
                  <div>
                    <label className="input-label">CGPA</label>
                    <input
                      type="number"
                      step="0.1"
                      className="input-field-full"
                      value={editingStudent.cgpa}
                      onChange={(e) =>
                        setEditingStudent({ ...editingStudent, cgpa: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="input-label">Email Address</label>
                    <input
                      type="email"
                      className="input-field-full"
                      value={editingStudent.email}
                      onChange={(e) =>
                        setEditingStudent({ ...editingStudent, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="modal-actions">
                  <button className="btn-secondary" onClick={() => setEditingStudent(null)}>
                    Cancel
                  </button>
                  <button className="btn-primary" onClick={handleSaveUpdate}>
                    💾 Save Changes (updateOne)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Live MongoDB Query Inspector */}
          <div className="exercise-section">
            <div className="section-header-row">
              <h3>3. Live MongoDB Query & Execution Inspector</h3>
              <span className="query-op-badge">{lastQuery.operation}</span>
            </div>
            <p className="text-muted">{lastQuery.message}</p>

            <div className="query-preview-grid">
              <div className="query-card">
                <span className="query-type-label">MongoDB Shell Equivalent:</span>
                <pre className="code-block" style={{ margin: 0 }}>
                  {lastQuery.shell}
                </pre>
              </div>
              <div className="query-card">
                <span className="query-type-label">Mongoose / Node.js Equivalent:</span>
                <pre className="code-block" style={{ margin: 0 }}>
                  {lastQuery.mongoose}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SOURCE CODE */}
      {activeTab === "code" && (
        <div className="tab-content">
          <div className="exercise-section">
            <div className="section-header-row">
              <h3>Node.js & Mongoose CRUD Implementation (crudOperations.js)</h3>
              <button className="copy-btn" onClick={copyCode}>
                {copiedCode ? "✓ Copied!" : "📋 Copy Code"}
              </button>
            </div>
            <p>Complete script implementing all 4 required operations (Insert, Read, Update, Delete):</p>
            <pre className="code-block">{crudSourceCode}</pre>
          </div>

          <div className="exercise-section">
            <h3>MongoDB Shell Commands (mongosh / students.js)</h3>
            <pre className="code-block">
{`// Run inside mongosh:
use CollegeDB;

// 1. INSERT (Create)
db.Students.insertOne({
    regNo: "23CSE001",
    name: "Arun",
    department: "CSE",
    cgpa: 8.5
});

// 2. READ
// Find all students
db.Students.find();

// Find with filter & sort
db.Students.find({ department: "CSE" }).sort({ cgpa: -1 });

// 3. UPDATE
db.Students.updateOne(
    { regNo: "23CSE002" },
    { $set: { cgpa: 8.2 } }
);

// 4. DELETE
db.Students.deleteOne({ regNo: "23IT001" });`}
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
              <p className="viva-q">Q1: What does CRUD stand for?</p>
              <p className="viva-a">
                <strong>A:</strong> CRUD stands for <strong>Create</strong> (Insert), <strong>Read</strong> (Retrieve/Query), <strong>Update</strong> (Modify), and <strong>Delete</strong> (Remove). These are the four fundamental functions of persistent storage.
              </p>
            </div>
            <div className="viva-item">
              <p className="viva-q">Q2: What is the purpose of the <code>$set</code> operator in MongoDB?</p>
              <p className="viva-a">
                <strong>A:</strong> The <code>$set</code> operator replaces the value of a specific field with the specified value without overwriting the entire document. If the field does not exist, <code>$set</code> will add the new field to the document.
              </p>
            </div>
            <div className="viva-item">
              <p className="viva-q">Q3: What is the difference between <code>updateOne()</code> and <code>updateMany()</code>?</p>
              <p className="viva-a">
                <strong>A:</strong> <code>updateOne()</code> updates only the first document that matches the filter criteria, whereas <code>updateMany()</code> updates all documents in the collection that match the filter criteria.
              </p>
            </div>
            <div className="viva-item">
              <p className="viva-q">Q4: How do you sort query results in MongoDB?</p>
              <p className="viva-a">
                <strong>A:</strong> Using the <code>.sort()</code> method attached to <code>find()</code>. For ascending order use <code>1</code> (e.g. <code>&#123; cgpa: 1 &#125;</code>) and for descending order use <code>-1</code> (e.g. <code>&#123; cgpa: -1 &#125;</code>).
              </p>
            </div>
            <div className="viva-item">
              <p className="viva-q">Q5: What does <code>deleteOne()</code> return upon execution?</p>
              <p className="viva-a">
                <strong>A:</strong> It returns an object containing <code>acknowledged: true</code> and <code>deletedCount: 1</code> (or <code>0</code> if no document matched the query criteria).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Exercise3MongoCRUD;

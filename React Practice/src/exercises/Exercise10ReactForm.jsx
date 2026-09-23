// Exercise 10 — React Controlled Form
// Task: Create a student registration form using controlled components.
// Fields: Name, Register Number, Department, Email and Phone.

import React, { useState } from "react";

function Exercise10ReactForm() {
  const [activeTab, setActiveTab] = useState("simulator");
  const [copiedCode, setCopiedCode] = useState(false);

  // Live state
  const [formData, setFormData] = useState({
    name: "",
    regNo: "",
    department: "",
    email: "",
    phone: ""
  });
  const [submittedData, setSubmittedData] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.regNo.trim()) newErrors.regNo = "Register Number is required";
    if (!formData.department.trim()) newErrors.department = "Department is required";
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
        newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
        newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmittedData(formData);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(reactSourceCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const reactSourceCode = `import React, { useState } from 'react';

function StudentRegistrationForm() {
  // 1. Manage form values using React state
  const [formData, setFormData] = useState({
    name: '',
    regNo: '',
    department: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  // 2. Controlled component handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 3. Validation
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!formData.name) { formErrors.name = 'Name is required'; isValid = false; }
    if (!formData.regNo) { formErrors.regNo = 'Register Number is required'; isValid = false; }
    if (!formData.department) { formErrors.department = 'Department is required'; isValid = false; }
    if (!formData.email) { formErrors.email = 'Email is required'; isValid = false; }
    else if (!/\\S+@\\S+\\.\\S+/.test(formData.email)) { formErrors.email = 'Email is invalid'; isValid = false; }
    if (!formData.phone) { formErrors.phone = 'Phone number is required'; isValid = false; }

    setErrors(formErrors);
    return isValid;
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    if (validateForm()) {
      // 4. Display submitted data
      setSubmittedData(formData);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Student Registration Form</h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Name:</label><br/>
          <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
          {errors.name && <span style={{ color: 'red', fontSize: '12px' }}>{errors.name}</span>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Register Number:</label><br/>
          <input type="text" name="regNo" value={formData.regNo} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
          {errors.regNo && <span style={{ color: 'red', fontSize: '12px' }}>{errors.regNo}</span>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Department:</label><br/>
          <input type="text" name="department" value={formData.department} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
          {errors.department && <span style={{ color: 'red', fontSize: '12px' }}>{errors.department}</span>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label><br/>
          <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
          {errors.email && <span style={{ color: 'red', fontSize: '12px' }}>{errors.email}</span>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Phone:</label><br/>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
          {errors.phone && <span style={{ color: 'red', fontSize: '12px' }}>{errors.phone}</span>}
        </div>

        <button type="submit" style={{ padding: '10px 20px', background: '#007BFF', color: 'white', border: 'none', borderRadius: '4px' }}>
          Submit Registration
        </button>
      </form>

      {/* Output Section */}
      {submittedData && (
        <div style={{ marginTop: '30px', padding: '15px', background: '#d4edda', color: '#155724', borderRadius: '4px' }}>
          <h3>Registration Successful!</h3>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Reg No:</strong> {submittedData.regNo}</p>
          <p><strong>Department:</strong> {submittedData.department}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Phone:</strong> {submittedData.phone}</p>
        </div>
      )}
    </div>
  );
}

export default StudentRegistrationForm;`;

  return (
    <div className="exercise-container">
      <div className="exercise-header">
        <span className="exercise-number">Exercise 10</span>
        <div>
          <h2 className="exercise-title">React Controlled Form</h2>
          <span className="marks-badge">Total: 10 Marks</span>
        </div>
      </div>

      <div className="exercise-question">
        <strong>Task:</strong> Create a student registration form using controlled components.<br/>
        <strong>Requirements:</strong> Manage form values using React state, validate mandatory fields, and display submitted data.
      </div>

      <div className="evaluation-card">
        <h4>📋 Evaluation Rubric (10 Marks)</h4>
        <div className="rubric-grid rubric-5">
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">Form Design</span>
            <p className="rubric-desc">Create inputs for all 5 required fields</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">3 Marks</span>
            <span className="rubric-title">Controlled Components</span>
            <p className="rubric-desc">Use <code>value</code> and <code>onChange</code> props tied to state</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">State Handling</span>
            <p className="rubric-desc">Proper state management for object/multiple fields</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">Validation</span>
            <p className="rubric-desc">Prevent submission if mandatory fields are empty</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">1 Mark</span>
            <span className="rubric-title">Output</span>
            <p className="rubric-desc">Display the data on the screen after successful submit</p>
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
            
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
                
                {/* FORM */}
                <div style={{ backgroundColor: "#fff", padding: "24px", borderRadius: "8px", border: "1px solid #ddd", flex: "1", minWidth: "300px", maxWidth: "450px" }}>
                    <h3 style={{ marginTop: 0 }}>Register Student</h3>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '15px' }}>
                            <label className="input-label">Full Name</label>
                            <input type="text" name="name" className="input-field-full" value={formData.name} onChange={handleChange} />
                            {errors.name && <span style={{ color: 'red', fontSize: '12px' }}>{errors.name}</span>}
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label className="input-label">Register Number</label>
                            <input type="text" name="regNo" className="input-field-full" value={formData.regNo} onChange={handleChange} />
                            {errors.regNo && <span style={{ color: 'red', fontSize: '12px' }}>{errors.regNo}</span>}
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label className="input-label">Department</label>
                            <input type="text" name="department" className="input-field-full" value={formData.department} onChange={handleChange} />
                            {errors.department && <span style={{ color: 'red', fontSize: '12px' }}>{errors.department}</span>}
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label className="input-label">Email</label>
                            <input type="text" name="email" className="input-field-full" value={formData.email} onChange={handleChange} />
                            {errors.email && <span style={{ color: 'red', fontSize: '12px' }}>{errors.email}</span>}
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label className="input-label">Phone</label>
                            <input type="text" name="phone" className="input-field-full" value={formData.phone} onChange={handleChange} />
                            {errors.phone && <span style={{ color: 'red', fontSize: '12px' }}>{errors.phone}</span>}
                        </div>
                        <button type="submit" className="btn-primary" style={{ width: "100%" }}>
                            Submit Registration
                        </button>
                    </form>
                </div>

                {/* OUTPUT */}
                <div style={{ backgroundColor: "#fff", padding: "24px", borderRadius: "8px", border: "1px solid #ddd", flex: "1", minWidth: "300px", maxWidth: "450px" }}>
                    <h3 style={{ marginTop: 0 }}>Submission Output</h3>
                    {!submittedData ? (
                        <div style={{ padding: "20px", textAlign: "center", color: "#888", border: "2px dashed #ddd", borderRadius: "8px" }}>
                            No data submitted yet.<br/>Fill the form and submit.
                        </div>
                    ) : (
                        <div style={{ padding: "16px", backgroundColor: "#ecfdf5", border: "1px solid #10b981", borderRadius: "8px" }}>
                            <h4 style={{ color: "#065f46", margin: "0 0 16px 0" }}>✅ Registration Success</h4>
                            <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: "8px", fontSize: "14px" }}>
                                <strong>Name:</strong> <span>{submittedData.name}</span>
                                <strong>Reg No:</strong> <span>{submittedData.regNo}</span>
                                <strong>Department:</strong> <span>{submittedData.department}</span>
                                <strong>Email:</strong> <span>{submittedData.email}</span>
                                <strong>Phone:</strong> <span>{submittedData.phone}</span>
                            </div>
                        </div>
                    )}

                    <div style={{ marginTop: "30px" }}>
                        <h4>Real-time State Explorer</h4>
                        <pre className="code-block" style={{ fontSize: "12px", padding: "12px" }}>
{JSON.stringify(formData, null, 2)}
                        </pre>
                    </div>
                </div>

            </div>

          </div>
        </div>
      )}

      {activeTab === "code" && (
        <div className="tab-content">
          <div className="exercise-section">
            <div className="section-header-row">
              <h3>React Controlled Components Implementation</h3>
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
              <p className="viva-q">Q1: What is a "Controlled Component" in React?</p>
              <p className="viva-a"><strong>A:</strong> An input form element whose value is controlled by React state. The state is the "single source of truth". Any changes in the input trigger an `onChange` event that updates the state, which in turn updates the input's value.</p>
            </div>
            <div className="viva-item">
              <p className="viva-q">Q2: Why do we call `e.preventDefault()` on form submit?</p>
              <p className="viva-a"><strong>A:</strong> By default, HTML forms trigger a full page reload upon submission. `e.preventDefault()` stops this behavior, allowing us to handle the submission purely in JavaScript without reloading the React app.</p>
            </div>
            <div className="viva-item">
              <p className="viva-q">Q3: How does the dynamic property name syntax `[e.target.name]: e.target.value` work?</p>
              <p className="viva-a"><strong>A:</strong> It's an ES6 feature called Computed Property Names. It allows you to dynamically set an object key based on the `name` attribute of the input field, letting a single `handleChange` function manage multiple inputs.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Exercise10ReactForm;

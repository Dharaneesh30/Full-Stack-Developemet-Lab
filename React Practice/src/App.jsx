// App.jsx — Main Application
// Full Stack Application Development Lab: Express & MongoDB Exercises (10 Marks Each)

import React, { useState } from "react";

import Exercise1ExpressRouting  from "./exercises/Exercise1ExpressRouting";
import Exercise2MongoConnectivity from "./exercises/Exercise2MongoConnectivity";
import Exercise3MongoCRUD       from "./exercises/Exercise3MongoCRUD";
import Exercise4RestApiGet      from "./exercises/Exercise4RestApiGet";

// List of lab exercises shown on the home screen
const exercises = [
  {
    id: 1,
    title: "Express Server and Routing",
    tag: "Express.js",
    marks: "10 Marks",
    description: "Create an Express.js application with routes for Home (/), About (/about), Students (/students), and Contact (/contact).",
    evaluation: "Setup (2) + Config (2) + Routes (4) + Response (2)",
    component: Exercise1ExpressRouting,
  },
  {
    id: 2,
    title: "MongoDB Database Connectivity",
    tag: "MongoDB",
    marks: "10 Marks",
    description: "Establish connectivity with MongoDB, select database, create a students collection, and insert initial student documents.",
    evaluation: "Setup (2) + Connection (4) + DB/Collection (2) + Error Handling (2)",
    component: Exercise2MongoConnectivity,
  },
  {
    id: 3,
    title: "MongoDB CRUD Operations",
    tag: "CRUD Operations",
    marks: "10 Marks",
    description: "Perform Create (Insert), Read (Find & Sort), Update ($set), and Delete operations on students collection.",
    evaluation: "Insert (2) + Read (2) + Update (2) + Delete (2) + Queries (2)",
    component: Exercise3MongoCRUD,
  },
  {
    id: 4,
    title: "REST API using GET",
    tag: "REST API",
    marks: "10 Marks",
    description: "Create an Express REST API endpoint GET /api/students to retrieve student documents in JSON format from MongoDB.",
    evaluation: "API Route (2) + DB Retrieval (3) + JSON (2) + Errors (2) + Testing (1)",
    component: Exercise4RestApiGet,
  },
];

function App() {
  // currentExercise: null = show home screen, number = show that exercise
  const [currentExercise, setCurrentExercise] = useState(null);

  // Show the selected exercise component
  if (currentExercise !== null) {
    const selected = exercises.find((ex) => ex.id === currentExercise);
    const ExerciseComponent = selected.component;

    return (
      <div className="app">
        {/* Navigation Bar */}
        <div className="nav-bar">
          <button
            className="btn-back"
            onClick={() => setCurrentExercise(null)}
          >
            ← Back to Lab Menu
          </button>
          <span className="nav-title">
            Exercise {selected.id} — {selected.title}
          </span>
          <span className="marks-badge-header">{selected.marks}</span>
        </div>

        {/* Exercise Content */}
        <div className="content">
          <ExerciseComponent />
        </div>
      </div>
    );
  }

  // Home screen — show all exercise cards
  return (
    <div className="app">
      {/* App Header */}
      <header className="app-header">
        <div className="college-lab-badge">College Study Materials</div>
        <h1 className="app-title">Full Stack Application Development Lab</h1>
        <p className="app-subtitle">Express.js &amp; MongoDB Lab Practical Exercises</p>
        <div className="header-tags">
          <span className="tag-pill">⚡ Node.js &amp; Express</span>
          <span className="tag-pill">🍃 MongoDB &amp; Mongoose</span>
          <span className="tag-pill">🚀 RESTful APIs</span>
          <span className="tag-pill">💯 10 Marks / Exercise</span>
        </div>
      </header>

      {/* Exercise Cards Grid */}
      <main className="cards-grid">
        {exercises.map((ex) => {
          return (
            <div
              key={ex.id}
              className="exercise-card"
              onClick={() => setCurrentExercise(ex.id)}
            >
              <div className="card-top-row">
                <span className="card-number">Exercise {ex.id}</span>
                <span className="card-marks-tag">{ex.marks}</span>
              </div>
              <span className="tech-badge">{ex.tag}</span>
              <h2 className="card-title">{ex.title}</h2>
              <p className="card-description">{ex.description}</p>
              
              <div className="card-eval-breakdown">
                <strong>Rubric:</strong> {ex.evaluation}
              </div>

              <div className="card-footer-row">
                <span className="card-link">Open Interactive Lab &rarr;</span>
              </div>
            </div>
          );
        })}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Full Stack Application Development Lab &mdash; Express.js &amp; MongoDB Practical Guide</p>
        <p className="footer-sub">Interactive Simulator &bull; Verified Source Code &bull; Viva Voce Answers</p>
      </footer>
    </div>
  );
}

export default App;

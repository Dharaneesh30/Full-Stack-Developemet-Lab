// App.jsx — Main Application
// Full Stack Application Development Lab: Express & MongoDB Exercises (10 Marks Each)

import React, { useState } from "react";

import Exercise1ExpressRouting  from "./exercises/Exercise1ExpressRouting";
import Exercise2MongoConnectivity from "./exercises/Exercise2MongoConnectivity";
import Exercise3MongoCRUD       from "./exercises/Exercise3MongoCRUD";
import Exercise4RestApiGet      from "./exercises/Exercise4RestApiGet";
import Exercise5RestApiPost     from "./exercises/Exercise5RestApiPost";
import Exercise6RestApiPut      from "./exercises/Exercise6RestApiPut";
import Exercise7RestApiDelete   from "./exercises/Exercise7RestApiDelete";
import Exercise8ReactComponents from "./exercises/Exercise8ReactComponents";
import Exercise9ReactState      from "./exercises/Exercise9ReactState";
import Exercise10ReactForm      from "./exercises/Exercise10ReactForm";
import Exercise11FetchApi       from "./exercises/Exercise11FetchApi";
import Exercise12ReactPost      from "./exercises/Exercise12ReactPost";
import Exercise13MernCrud       from "./exercises/Exercise13MernCrud";
import Exercise14ContextApi     from "./exercises/Exercise14ContextApi";

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
  {
    id: 5,
    title: "REST API using POST",
    tag: "REST API",
    marks: "10 Marks",
    description: "Create an API endpoint POST /api/students to add a new student.",
    evaluation: "Route (2) + Body (2) + Insert (3) + Error Handling (2) + Success Status (1)",
    component: Exercise5RestApiPost,
  },
  {
    id: 6,
    title: "REST API using PUT",
    tag: "REST API",
    marks: "10 Marks",
    description: "Create an API endpoint PUT /api/students/:id to update student details.",
    evaluation: "Parameter (2) + PUT Logic (3) + DB Update (3) + Error Handling (2)",
    component: Exercise6RestApiPut,
  },
  {
    id: 7,
    title: "REST API using DELETE",
    tag: "REST API",
    marks: "10 Marks",
    description: "Create an API endpoint DELETE /api/students/:id to delete a student.",
    evaluation: "DELETE Route (2) + ID Param (2) + DB Delete (3) + Success (1) + Errors (2)",
    component: Exercise7RestApiDelete,
  },
  {
    id: 8,
    title: "React Components and Props",
    tag: "React",
    marks: "10 Marks",
    description: "Create a React application to display a list of students using reusable StudentList and StudentCard components passing props.",
    evaluation: "Setup (2) + Components (3) + Props (3) + UI (2)",
    component: Exercise8ReactComponents,
  },
  {
    id: 9,
    title: "React State using useState",
    tag: "React",
    marks: "10 Marks",
    description: "Create a React application demonstrating state management using useState with a student counter.",
    evaluation: "useState (4) + Events (2) + State Updates (2) + UI (2)",
    component: Exercise9ReactState,
  },
  {
    id: 10,
    title: "React Controlled Form",
    tag: "React",
    marks: "10 Marks",
    description: "Create a student registration form using controlled components and React state.",
    evaluation: "Design (2) + Controlled (3) + State (2) + Validate (2) + Output (1)",
    component: Exercise10ReactForm,
  },
  {
    id: 11,
    title: "Fetch API using useEffect",
    tag: "React & API",
    marks: "10 Marks",
    description: "Retrieve student information from an Express REST API and display it in React using useEffect and fetch.",
    evaluation: "useEffect (3) + API (3) + Display (2) + States (2)",
    component: Exercise11FetchApi,
  },
  {
    id: 12,
    title: "React POST Request",
    tag: "React & Express",
    marks: "10 Marks",
    description: "Create a React student registration form and send the data to the Express/MongoDB backend via POST.",
    evaluation: "Form (2) + POST (3) + Backend (3) + Handling (2)",
    component: Exercise12ReactPost,
  },
  {
    id: 13,
    title: "Complete MERN CRUD Application",
    tag: "MERN Stack",
    marks: "10 Marks",
    description: "Develop a complete Student Management application implementing Create, Read, Update, and Delete operations.",
    evaluation: "Create (2) + Read (2) + Update (2) + Delete (2) + Integration (2)",
    component: Exercise13MernCrud,
  },
  {
    id: 14,
    title: "React Context API",
    tag: "React Context",
    marks: "10 Marks",
    description: "Implement global state management using React Context API for a shopping cart scenario.",
    evaluation: "Context (3) + Provider (2) + State (3) + Output (2)",
    component: Exercise14ContextApi,
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

// App.jsx — Main Application
// Provides state-based navigation between Exercises 1–5.
// No React Router needed — simple useState controls which exercise is shown.

import React, { useState } from "react";

import Exercise1Welcome   from "./exercises/Exercise1Welcome";
import Exercise2Variables from "./exercises/Exercise2Variables";
import Exercise3Voting    from "./exercises/Exercise3Voting";
import Exercise4Debugging from "./exercises/Exercise4Debugging";
import Exercise5Any       from "./exercises/Exercise5Any";

// List of exercises shown on the home screen
const exercises = [
  {
    id: 1,
    title: "Display Statement",
    description: "Console display of a welcome message.",
    component: Exercise1Welcome,
  },
  {
    id: 2,
    title: "Statically Typed Variables",
    description: "Store 10 and 20 in variables A and B, find their sum.",
    component: Exercise2Variables,
  },
  {
    id: 3,
    title: "Conditional Statement",
    description: "Check the eligibility of a person to vote in the election.",
    component: Exercise3Voting,
  },
  {
    id: 4,
    title: "Debug the Code",
    description: "Set breakpoints in your code and debug it.",
    component: Exercise4Debugging,
  },
  {
    id: 5,
    title: "Any",
    description: "Sample code to demonstrate 'any' (dynamic typing in JavaScript).",
    component: Exercise5Any,
  },
];

function App() {
  // currentExercise: null = show home screen, number = show that exercise
  const [currentExercise, setCurrentExercise] = useState(null);

  // Show the selected exercise component
  if (currentExercise !== null) {
    // Find the exercise object by id
    const selected = exercises.find(function (ex) { return ex.id === currentExercise; });
    const ExerciseComponent = selected.component;

    return (
      <div className="app">
        {/* Back Button */}
        <div className="nav-bar">
          <button
            className="btn-back"
            onClick={function () { setCurrentExercise(null); }}
          >
            ← Back to Home
          </button>
          <span className="nav-title">Exercise {selected.id} — {selected.title}</span>
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
        <h1 className="app-title">Full Stack Application Development Lab</h1>
        <p className="app-subtitle">React Practice — Exercises 1–5</p>
        <p className="app-meta">React + Vite + JavaScript</p>
      </header>

      {/* Exercise Cards Grid */}
      <main className="cards-grid">
        {exercises.map(function (ex) {
          return (
            <div
              key={ex.id}
              className="exercise-card"
              onClick={function () { setCurrentExercise(ex.id); }}
            >
              <div className="card-number">Exercise {ex.id}</div>
              <h2 className="card-title">{ex.title}</h2>
              <p className="card-description">{ex.description}</p>
              <span className="card-link">Open Exercise →</span>
            </div>
          );
        })}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Full Stack Application Development Lab &mdash; React Practice</p>
      </footer>
    </div>
  );
}

export default App;

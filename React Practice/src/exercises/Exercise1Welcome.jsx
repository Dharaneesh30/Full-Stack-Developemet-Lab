// Exercise 1 — Display Statement
// Question: Console display of a welcome message.

import React from "react";

function Exercise1Welcome() {
  // console.log() prints the message to the browser Developer Tools console
  console.log("Welcome to Full Stack Application Development Lab!");

  return (
    <div className="exercise-container">
      {/* Exercise Header */}
      <div className="exercise-header">
        <span className="exercise-number">Exercise 1</span>
        <h2 className="exercise-title">Display Statement</h2>
      </div>

      {/* Original Question */}
      <div className="exercise-question">
        <strong>Question:</strong> Console display of a welcome message.
      </div>

      {/* Concept */}
      <div className="exercise-section">
        <h3>Concept</h3>
        <p>
          In React, we can display content in two places:
        </p>
        <ul>
          <li><strong>Browser window</strong> — using JSX (return statement)</li>
          <li><strong>Browser console</strong> — using <code>console.log()</code></li>
        </ul>
        <p>
          <code>console.log()</code> is mainly used for debugging. You can see its
          output by pressing <strong>F12</strong> → Console tab.
        </p>
      </div>

      {/* Working Example */}
      <div className="exercise-section">
        <h3>Code Used</h3>
        <pre className="code-block">
{`// Prints to the browser console
console.log("Welcome to Full Stack Application Development Lab!");

// Displays in the browser window (JSX)
return (
  <h3>Welcome to Full Stack Application Development Lab!</h3>
);`}
        </pre>
      </div>

      {/* Output */}
      <div className="exercise-section">
        <h3>Output (Browser Window)</h3>
        <div className="output-box">
          <h3 style={{ margin: 0 }}>Welcome to Full Stack Application Development Lab!</h3>
        </div>
      </div>

      {/* Console Note */}
      <div className="exercise-note">
        💡 <strong>Console Output:</strong> Open Developer Tools (F12) → Console tab to see:
        <br />
        <code>"Welcome to Full Stack Application Development Lab!"</code>
      </div>

      {/* Explanation */}
      <div className="exercise-section">
        <h3>Explanation</h3>
        <ul>
          <li><code>console.log()</code> is a built-in JavaScript function.</li>
          <li>It prints values to the browser's Developer Tools Console.</li>
          <li>It does NOT display anything in the browser window — that is done using JSX.</li>
          <li>In React, the <code>return</code> statement renders HTML (JSX) on the page.</li>
        </ul>
      </div>

      {/* Viva Points */}
      <div className="exercise-section viva-points">
        <h3>📌 Viva Points</h3>
        <ul>
          <li>Q: What is <code>console.log()</code>? — A: It is a JavaScript debugging function that prints output to the browser console.</li>
          <li>Q: Where does <code>console.log()</code> output appear? — A: In the browser's Developer Tools, under the Console tab (press F12).</li>
          <li>Q: How do you display output in the browser window using React? — A: Using JSX inside the component's <code>return</code> statement.</li>
          <li>Q: What is a React functional component? — A: A JavaScript function that returns JSX to describe the UI.</li>
        </ul>
      </div>
    </div>
  );
}

export default Exercise1Welcome;

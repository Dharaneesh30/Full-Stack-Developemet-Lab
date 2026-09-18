// Exercise 2 — Statically Typed Variables (Variable Concept in JavaScript)
// Question: Store 10 and 20 in variables A and B, find the sum, and display the result.

import React, { useState } from "react";

function Exercise2Variables() {
  // State variables — user can enter any numbers for A and B
  const [inputA, setInputA] = useState("10");
  const [inputB, setInputB] = useState("20");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // Called when "Calculate Sum" button is clicked
  function calculateSum() {
    // Convert input strings to numbers
    const A = Number(inputA);
    const B = Number(inputB);

    // Validate inputs
    if (inputA === "" || inputB === "" || isNaN(A) || isNaN(B)) {
      setError("Please enter valid numbers for A and B.");
      setResult(null);
      return;
    }

    setError("");

    // Calculate the sum
    const Sum = A + B;

    // Store result in state
    setResult({ A, B, Sum });

    // Print to the browser console
    console.log("A =", A);
    console.log("B =", B);
    console.log("Sum =", Sum);
  }

  return (
    <div className="exercise-container">
      {/* Exercise Header */}
      <div className="exercise-header">
        <span className="exercise-number">Exercise 2</span>
        <h2 className="exercise-title">Statically Typed Variables</h2>
      </div>

      {/* Original Question */}
      <div className="exercise-question">
        <strong>Question:</strong> Store values in variables A and B, find the
        summation of these two variable values, and display the resultant value.
      </div>

      {/* Important Note */}
      <div className="exercise-note">
        ⚠️ <strong>Note:</strong> This exercise is originally designed for TypeScript (statically typed).
        Since we are using JavaScript, variables here are <strong>dynamically typed</strong>.
        This exercise demonstrates the <em>variable declaration and arithmetic calculation</em> concept.
        When we convert to TypeScript, we will use explicit types like <code>let A: number = 10;</code>
      </div>

      {/* Concept */}
      <div className="exercise-section">
        <h3>Concept</h3>
        <p>
          Variables are containers that store data values. In JavaScript, you declare
          variables using <code>let</code>, <code>const</code>, or <code>var</code>.
        </p>
        <ul>
          <li><code>const</code> — value cannot be reassigned (used for fixed values)</li>
          <li><code>let</code> — value can be changed later</li>
          <li><code>var</code> — older way (avoid in modern JavaScript)</li>
        </ul>
      </div>

      {/* Interactive Calculator */}
      <div className="exercise-section">
        <h3>Try It — Enter Values for A and B</h3>

        <div className="input-group">
          <label htmlFor="var-a"><strong>A =</strong></label>
          <input
            id="var-a"
            type="number"
            value={inputA}
            onChange={function (e) { setInputA(e.target.value); }}
            className="input-field"
            placeholder="e.g. 10"
          />
        </div>

        <div className="input-group" style={{ marginTop: "0.75rem" }}>
          <label htmlFor="var-b"><strong>B =</strong></label>
          <input
            id="var-b"
            type="number"
            value={inputB}
            onChange={function (e) { setInputB(e.target.value); }}
            className="input-field"
            placeholder="e.g. 20"
          />
        </div>

        <button onClick={calculateSum} className="btn-primary" style={{ marginTop: "1rem" }}>
          Calculate Sum
        </button>

        {/* Error */}
        {error && (
          <div className="output-box output-danger" style={{ marginTop: "1rem" }}>
            {error}
          </div>
        )}

        {/* Result */}
        {result && !error && (
          <div className="output-box output-success" style={{ marginTop: "1rem" }}>
            <p><strong>A = {result.A}</strong></p>
            <p><strong>B = {result.B}</strong></p>
            <p><strong>Sum = {result.Sum}</strong></p>
          </div>
        )}
      </div>

      {/* Code Used */}
      <div className="exercise-section">
        <h3>Code Used (JavaScript)</h3>
        <pre className="code-block">
{`// JavaScript — Dynamic Typing
const A = ${result ? result.A : "10"};
const B = ${result ? result.B : "20"};
const Sum = A + B;   // ${result ? result.Sum : "30"}

console.log("A =", A);
console.log("B =", B);
console.log("Sum =", Sum);`}
        </pre>

        <h3 style={{ marginTop: "1rem" }}>Equivalent TypeScript (Static Typing)</h3>
        <pre className="code-block">
{`// TypeScript — Static Typing
const A: number = ${result ? result.A : "10"};
const B: number = ${result ? result.B : "20"};
const Sum: number = A + B;   // ${result ? result.Sum : "30"}

console.log("A =", A);
console.log("B =", B);
console.log("Sum =", Sum);`}
        </pre>
      </div>

      {/* Console Note */}
      <div className="exercise-note">
        💡 <strong>Console Output:</strong> Open Developer Tools (F12) → Console tab to see
        the values of A, B, and Sum printed after clicking Calculate Sum.
      </div>

      {/* Explanation */}
      <div className="exercise-section">
        <h3>Explanation</h3>
        <ul>
          <li><code>const A = 10;</code> — stores the value 10 in variable A.</li>
          <li><code>const B = 20;</code> — stores the value 20 in variable B.</li>
          <li><code>const Sum = A + B;</code> — adds A and B and stores the result in Sum.</li>
          <li><code>console.log()</code> — prints the values to the browser console.</li>
          <li><code>useState</code> — React hook that stores the input values and result in state.</li>
          <li><code>Number()</code> — converts the text input to a number for arithmetic.</li>
        </ul>
      </div>

      {/* Viva Points */}
      <div className="exercise-section viva-points">
        <h3>📌 Viva Points</h3>
        <ul>
          <li>Q: What is a variable? — A: A named storage location that holds a value in memory.</li>
          <li>Q: Difference between <code>let</code> and <code>const</code>? — A: <code>const</code> cannot be reassigned; <code>let</code> can.</li>
          <li>Q: What is static typing? — A: The data type of a variable is declared at compile time and cannot change (e.g., TypeScript: <code>let A: number = 10;</code>).</li>
          <li>Q: What is dynamic typing? — A: The data type is determined at runtime and can change (e.g., JavaScript).</li>
          <li>Q: What is the output of 10 + 20? — A: 30.</li>
        </ul>
      </div>
    </div>
  );
}

export default Exercise2Variables;

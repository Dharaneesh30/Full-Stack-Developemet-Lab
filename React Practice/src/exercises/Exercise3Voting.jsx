// Exercise 3 — Conditional Statement
// Question: Check the eligibility of a person to vote in the election.

import React, { useState } from "react";

function Exercise3Voting() {
  // State to store the age entered by the user
  const [age, setAge] = useState("");

  // State to store the eligibility result message
  const [result, setResult] = useState("");

  // Function to check voting eligibility using if...else
  function checkEligibility() {
    // Convert the input string to a number
    const ageValue = parseInt(age);

    // Handle empty or invalid input
    if (age === "" || isNaN(ageValue) || ageValue <= 0) {
      const msg = "Please enter a valid age.";
      setResult(msg);
      console.log(msg);
      return;
    }

    // if...else conditional statement
    if (ageValue >= 18) {
      const msg = "Eligible to vote";
      setResult(msg);
      console.log("Age:", ageValue, "→", msg);
    } else {
      const msg = "Not eligible to vote";
      setResult(msg);
      console.log("Age:", ageValue, "→", msg);
    }
  }

  return (
    <div className="exercise-container">
      {/* Exercise Header */}
      <div className="exercise-header">
        <span className="exercise-number">Exercise 3</span>
        <h2 className="exercise-title">Conditional Statement</h2>
      </div>

      {/* Original Question */}
      <div className="exercise-question">
        <strong>Question:</strong> Conditional statement — Check the eligibility of a
        person to vote in the election.
      </div>

      {/* Concept */}
      <div className="exercise-section">
        <h3>Concept</h3>
        <p>
          A <strong>conditional statement</strong> runs different code based on whether
          a condition is true or false.
        </p>
        <p>
          The <code>if...else</code> statement is the most basic conditional statement
          in JavaScript.
        </p>
        <p>
          Voting eligibility rule: A person must be <strong>18 years or older</strong> to vote.
        </p>
      </div>

      {/* Code Used */}
      <div className="exercise-section">
        <h3>Code Used</h3>
        <pre className="code-block">
{`function checkEligibility() {
  const ageValue = parseInt(age);

  if (ageValue >= 18) {
    setResult("Eligible to vote");
    console.log("Eligible to vote");
  } else {
    setResult("Not eligible to vote");
    console.log("Not eligible to vote");
  }
}`}
        </pre>
      </div>

      {/* Working Example */}
      <div className="exercise-section">
        <h3>Try It</h3>
        <div className="input-group">
          <label htmlFor="age-input"><strong>Enter Age:</strong></label>
          <input
            id="age-input"
            type="number"
            placeholder="e.g. 20"
            value={age}
            onChange={function (e) { setAge(e.target.value); }}
            className="input-field"
          />
          <button
            onClick={checkEligibility}
            className="btn-primary"
          >
            Check Eligibility
          </button>
        </div>

        {/* Display Result */}
        {result && (
          <div
            className={
              "output-box " +
              (result === "Eligible to vote" ? "output-success" : "output-danger")
            }
          >
            <strong>Result: {result}</strong>
          </div>
        )}
      </div>

      {/* Example */}
      <div className="exercise-section">
        <h3>Example</h3>
        <div className="output-box">
          <p>Input: Age = 20</p>
          <p>Output: Eligible to vote</p>
          <hr style={{ borderColor: "#444" }} />
          <p>Input: Age = 15</p>
          <p>Output: Not eligible to vote</p>
        </div>
      </div>

      {/* Console Note */}
      <div className="exercise-note">
        💡 <strong>Console Output:</strong> Open Developer Tools (F12) → Console tab to
        see the result printed after clicking the button.
      </div>

      {/* Explanation */}
      <div className="exercise-section">
        <h3>Explanation</h3>
        <ul>
          <li><code>useState("")</code> — creates a state variable to hold the age input.</li>
          <li><code>parseInt(age)</code> — converts the text input to a whole number.</li>
          <li><code>if (ageValue &gt;= 18)</code> — checks if age is 18 or above.</li>
          <li>If true: sets result to <em>"Eligible to vote"</em>.</li>
          <li>If false: sets result to <em>"Not eligible to vote"</em>.</li>
          <li><code>onChange</code> event — updates the age state whenever the user types.</li>
          <li><code>onClick</code> event — calls <code>checkEligibility()</code> when button is clicked.</li>
        </ul>
      </div>

      {/* Viva Points */}
      <div className="exercise-section viva-points">
        <h3>📌 Viva Points</h3>
        <ul>
          <li>Q: What is a conditional statement? — A: A statement that executes different blocks of code based on a condition (true/false).</li>
          <li>Q: What is the syntax of if...else? — A: <code>{`if (condition) { ... } else { ... }`}</code></li>
          <li>Q: What is the voting age in India? — A: 18 years.</li>
          <li>Q: What does <code>parseInt()</code> do? — A: Converts a string to an integer (whole number).</li>
          <li>Q: What is <code>useState</code> in React? — A: A React Hook that lets a component remember and update values.</li>
          <li>Q: What is an event handler? — A: A function that runs when a user action occurs, like a button click.</li>
        </ul>
      </div>
    </div>
  );
}

export default Exercise3Voting;

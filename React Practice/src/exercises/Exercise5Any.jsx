// Exercise 5 — Any (Dynamic Typing in JavaScript / 'any' in TypeScript)
// Question: Sample code to demonstrate 'any'.

import React from "react";

function Exercise5Any() {
  // JavaScript allows a variable to hold different types at different times.
  // This is called DYNAMIC TYPING.

  let value = 100;
  console.log("value (number):", value);          // 100

  value = "Hello";
  console.log("value (string):", value);          // Hello

  value = true;
  console.log("value (boolean):", value);         // true

  value = [1, 2, 3];
  console.log("value (array):", value);           // [1, 2, 3]

  value = { name: "React" };
  console.log("value (object):", value);          // { name: "React" }

  return (
    <div className="exercise-container">
      {/* Exercise Header */}
      <div className="exercise-header">
        <span className="exercise-number">Exercise 5</span>
        <h2 className="exercise-title">Any</h2>
      </div>

      {/* Original Question */}
      <div className="exercise-question">
        <strong>Question:</strong> Sample code to demonstrate 'any'.
      </div>

      {/* Important Note */}
      <div className="exercise-note">
        ⚠️ <strong>Note:</strong> The <code>any</code> keyword belongs to <strong>TypeScript</strong>.
        JavaScript does NOT have an <code>any</code> keyword. However, JavaScript is
        <strong> dynamically typed</strong> — which means a variable can naturally hold
        any type of value at any time. This exercise demonstrates that concept.
      </div>

      {/* Concept */}
      <div className="exercise-section">
        <h3>Concept</h3>
        <p>
          <strong>TypeScript <code>any</code>:</strong> In TypeScript, variables have fixed types.
          But when you declare a variable as <code>any</code>, it can hold a value of
          <em> any</em> type — number, string, boolean, object, etc.
        </p>
        <p>
          <strong>JavaScript Dynamic Typing:</strong> In JavaScript, every variable behaves
          like <code>any</code> by default — you can assign values of different types
          without declaring a type.
        </p>
      </div>

      {/* Code Comparison */}
      <div className="exercise-section">
        <h3>Code Comparison</h3>

        <h4>JavaScript (Dynamic Typing)</h4>
        <pre className="code-block">
{`let value = 100;
console.log(value);   // Output: 100

value = "Hello";
console.log(value);   // Output: Hello

value = true;
console.log(value);   // Output: true

value = [1, 2, 3];
console.log(value);   // Output: [1, 2, 3]

value = { name: "React" };
console.log(value);   // Output: { name: "React" }`}
        </pre>

        <h4 style={{ marginTop: "1.25rem" }}>TypeScript (using <code>any</code>)</h4>
        <pre className="code-block">
{`let value: any = 100;
console.log(value);   // Output: 100

value = "Hello";
console.log(value);   // Output: Hello

value = true;
console.log(value);   // Output: true

value = [1, 2, 3];
console.log(value);   // Output: [1, 2, 3]

value = { name: "React" };
console.log(value);   // Output: { name: "React" }`}
        </pre>
      </div>

      {/* Output */}
      <div className="exercise-section">
        <h3>Output (Browser Window)</h3>
        <div className="output-box">
          <table className="any-table">
            <thead>
              <tr>
                <th>Assignment</th>
                <th>Type</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>value = 100</code></td>
                <td><span className="type-badge type-number">number</span></td>
                <td>100</td>
              </tr>
              <tr>
                <td><code>value = "Hello"</code></td>
                <td><span className="type-badge type-string">string</span></td>
                <td>"Hello"</td>
              </tr>
              <tr>
                <td><code>value = true</code></td>
                <td><span className="type-badge type-boolean">boolean</span></td>
                <td>true</td>
              </tr>
              <tr>
                <td><code>{`value = [1, 2, 3]`}</code></td>
                <td><span className="type-badge type-array">array</span></td>
                <td>[1, 2, 3]</td>
              </tr>
              <tr>
                <td><code>{`value = { name: "React" }`}</code></td>
                <td><span className="type-badge type-object">object</span></td>
                <td>{`{ name: "React" }`}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Console Note */}
      <div className="exercise-note">
        💡 <strong>Console Output:</strong> Open Developer Tools (F12) → Console tab to see
        all 5 values logged when this component loads.
      </div>

      {/* Key Points */}
      <div className="exercise-section">
        <h3>Key Points</h3>
        <ul>
          <li>JavaScript is <strong>dynamically typed</strong> — types are determined at runtime.</li>
          <li>TypeScript is <strong>statically typed</strong> — types are declared at compile time.</li>
          <li>TypeScript's <code>any</code> type disables type checking for that variable.</li>
          <li>Using <code>any</code> too much defeats the purpose of TypeScript.</li>
          <li>JavaScript variables naturally behave like <code>any</code> — no type restriction.</li>
        </ul>
      </div>

      {/* Comparison Table */}
      <div className="exercise-section">
        <h3>JavaScript vs TypeScript Comparison</h3>
        <div className="output-box">
          <table className="any-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>JavaScript</th>
                <th>TypeScript</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Typing</td>
                <td>Dynamic</td>
                <td>Static</td>
              </tr>
              <tr>
                <td>Type declaration</td>
                <td>Not required</td>
                <td>Required (or inferred)</td>
              </tr>
              <tr>
                <td><code>any</code> keyword</td>
                <td>Not available</td>
                <td>Available</td>
              </tr>
              <tr>
                <td>Equivalent behavior</td>
                <td>All variables</td>
                <td>Only <code>any</code>-typed variables</td>
              </tr>
              <tr>
                <td>Type safety</td>
                <td>None (runtime errors possible)</td>
                <td>High (compile-time errors caught)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Viva Points */}
      <div className="exercise-section viva-points">
        <h3>📌 Viva Points</h3>
        <ul>
          <li>Q: What is the <code>any</code> type in TypeScript? — A: A special type that allows a variable to hold a value of any data type, disabling type checking for that variable.</li>
          <li>Q: Does JavaScript have the <code>any</code> keyword? — A: No. JavaScript is dynamically typed, so all variables can already hold any type of value.</li>
          <li>Q: What is dynamic typing? — A: The type of a variable is determined at runtime and can change.</li>
          <li>Q: What is the disadvantage of using <code>any</code>? — A: It removes TypeScript's type safety, making it behave like plain JavaScript and potentially causing runtime errors.</li>
          <li>Q: What are the basic JavaScript data types? — A: number, string, boolean, null, undefined, object, symbol, bigint.</li>
        </ul>
      </div>
    </div>
  );
}

export default Exercise5Any;

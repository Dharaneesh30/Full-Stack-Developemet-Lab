// Exercise 4 — Debug the Code
// Question: Set break points in your code and debug it.

import React, { useState } from "react";

// This function uses the actual JavaScript `debugger` statement.
// When Developer Tools (F12) are open and you click "Calculate Total",
// the browser will pause execution AT the debugger line.
// You can then inspect variables (price, quantity, total) in the Sources panel.
function calculateTotal(price, quantity) {
  // ← BREAKPOINT: Browser pauses here when DevTools is open
  debugger;

  const total = price * quantity;

  // These will appear in the Console tab
  console.log("Price:", price);
  console.log("Quantity:", quantity);
  console.log("Total:", total);

  return total;
}

function Exercise4Debugging() {
  // State to store price, quantity, and the calculated total
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [total, setTotal] = useState(null);
  const [error, setError] = useState("");

  // Called when "Calculate Total" button is clicked
  function handleCalculate() {
    const priceValue = parseFloat(price);
    const quantityValue = parseInt(quantity);

    // Validate inputs
    if (isNaN(priceValue) || isNaN(quantityValue) || priceValue <= 0 || quantityValue <= 0) {
      setError("Please enter valid Price and Quantity values.");
      setTotal(null);
      return;
    }

    setError("");

    // Call the function that contains the debugger statement
    const result = calculateTotal(priceValue, quantityValue);
    setTotal(result);
  }

  return (
    <div className="exercise-container">
      {/* Exercise Header */}
      <div className="exercise-header">
        <span className="exercise-number">Exercise 4</span>
        <h2 className="exercise-title">Debug the Code</h2>
      </div>

      {/* Original Question */}
      <div className="exercise-question">
        <strong>Question:</strong> Set breakpoints in your code and debug it.
      </div>

      {/* Concept */}
      <div className="exercise-section">
        <h3>Concept</h3>
        <p>
          <strong>Debugging</strong> is the process of finding and fixing errors in code.
          The <code>debugger</code> statement is a built-in JavaScript keyword that pauses
          execution when the browser's Developer Tools are open.
        </p>
        <p>
          It works exactly like a manual breakpoint set in the Sources/Debugger panel.
        </p>
      </div>

      {/* Code Used */}
      <div className="exercise-section">
        <h3>Code Used</h3>
        <pre className="code-block">
{`function calculateTotal(price, quantity) {
  debugger; // ← Browser pauses here when DevTools is open

  const total = price * quantity;

  console.log("Price:", price);
  console.log("Quantity:", quantity);
  console.log("Total:", total);

  return total;
}`}
        </pre>
      </div>

      {/* Working Example */}
      <div className="exercise-section">
        <h3>Try It</h3>
        <p style={{ color: "#f59e0b", marginBottom: "0.75rem" }}>
          ⚠️ Open Developer Tools (F12) first, then click Calculate Total to trigger the debugger.
        </p>
        <div className="input-group">
          <label htmlFor="price-input"><strong>Price (₹):</strong></label>
          <input
            id="price-input"
            type="number"
            placeholder="e.g. 50"
            value={price}
            onChange={function (e) { setPrice(e.target.value); }}
            className="input-field"
          />
        </div>
        <div className="input-group" style={{ marginTop: "0.75rem" }}>
          <label htmlFor="quantity-input"><strong>Quantity:</strong></label>
          <input
            id="quantity-input"
            type="number"
            placeholder="e.g. 3"
            value={quantity}
            onChange={function (e) { setQuantity(e.target.value); }}
            className="input-field"
          />
        </div>

        <button onClick={handleCalculate} className="btn-primary" style={{ marginTop: "1rem" }}>
          Calculate Total
        </button>

        {/* Error Message */}
        {error && (
          <div className="output-box output-danger" style={{ marginTop: "1rem" }}>
            {error}
          </div>
        )}

        {/* Result */}
        {total !== null && !error && (
          <div className="output-box output-success" style={{ marginTop: "1rem" }}>
            <strong>Total = ₹{total}</strong>
          </div>
        )}
      </div>

      {/* How to Debug */}
      <div className="exercise-section">
        <h3>How to Debug — Step by Step</h3>
        <ol className="debug-steps">
          <li>
            <strong>Open Developer Tools</strong> — Press <code>F12</code> or right-click
            → Inspect → go to the <strong>Sources</strong> (Chrome) or <strong>Debugger</strong> (Firefox) tab.
          </li>
          <li>
            <strong>Enter values</strong> — Type a Price and Quantity above.
          </li>
          <li>
            <strong>Click "Calculate Total"</strong> — JavaScript execution will
            automatically pause at the <code>debugger;</code> line inside <code>calculateTotal()</code>.
          </li>
          <li>
            <strong>Inspect variables</strong> — In the right panel under "Scope" → "Local",
            you can see the current values of <code>price</code> and <code>quantity</code>.
          </li>
          <li>
            <strong>Step Over</strong> — Press <code>F10</code> to execute the next line
            (<code>const total = price * quantity;</code>) and see <code>total</code> appear.
          </li>
          <li>
            <strong>Resume / Continue</strong> — Press <code>F8</code> or click the ▶ button
            to continue execution and see the result on screen.
          </li>
        </ol>
      </div>

      {/* Console Note */}
      <div className="exercise-note">
        💡 <strong>Console Output:</strong> After resuming, open the Console tab to see:
        <br />
        <code>Price: 50 &nbsp; Quantity: 3 &nbsp; Total: 150</code>
      </div>

      {/* Explanation */}
      <div className="exercise-section">
        <h3>Explanation</h3>
        <ul>
          <li><code>debugger;</code> — This is a real JavaScript keyword. It pauses code execution when DevTools is open.</li>
          <li><code>parseFloat(price)</code> — Converts the price string to a decimal number.</li>
          <li><code>parseInt(quantity)</code> — Converts the quantity string to a whole number.</li>
          <li><code>price * quantity</code> — Calculates the total cost.</li>
          <li><code>console.log()</code> — Prints each variable's value to the console for inspection.</li>
        </ul>
      </div>

      {/* Viva Points */}
      <div className="exercise-section viva-points">
        <h3>📌 Viva Points</h3>
        <ul>
          <li>Q: What is debugging? — A: The process of finding, analyzing, and fixing errors (bugs) in a program.</li>
          <li>Q: What is a breakpoint? — A: A marker set in code that pauses execution so you can inspect the program state.</li>
          <li>Q: What does the <code>debugger</code> statement do? — A: It pauses JavaScript execution at that line when Developer Tools are open.</li>
          <li>Q: How do you step through code in Developer Tools? — A: Use F10 (Step Over), F11 (Step Into), F8 (Resume).</li>
          <li>Q: What is the Scope panel? — A: A panel in Developer Tools that shows the current values of all local and global variables during debugging.</li>
        </ul>
      </div>
    </div>
  );
}

export default Exercise4Debugging;

// Exercise 14 — React Context API
// Task: Implement global state management using React Context API.
// Scenario: Create a shopping cart application.
// Requirements: Create Cart Context, Add/remove products, Display cart count and total, Access state from multiple components.

import React, { useState } from "react";

function Exercise14ContextApi() {
  const [activeTab, setActiveTab] = useState("simulator");
  const [copiedCode, setCopiedCode] = useState(false);

  // --- Live Interactive Simulator (Simulating Context visually) ---
  const [cart, setCart] = useState([]);
  
  const products = [
    { id: 1, name: "React Textbook", price: 45 },
    { id: 2, name: "Node.js Guide", price: 35 },
    { id: 3, name: "Mechanical Keyboard", price: 120 }
  ];

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const copyCode = () => {
    navigator.clipboard.writeText(reactSourceCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const reactSourceCode = `// src/App.jsx
import React, { createContext, useState, useContext } from 'react';
import './App.css';

// 1. Context Creation
const CartContext = createContext();

// 2. Provider Implementation
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// --- Component A: Product List (Adding to Context) ---
const ProductList = () => {
  const { addToCart } = useContext(CartContext);
  
  const products = [
    { id: 1, name: "React Textbook", price: 45 },
    { id: 2, name: "Node.js Guide", price: 35 },
    { id: 3, name: "Mechanical Keyboard", price: 120 }
  ];

  return (
    <div className="product-list">
      <h2>Products</h2>
      {products.map(product => (
        <div key={product.id} className="product-card">
          <span>{product.name} - $\${product.price}</span>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

// --- Component B: Shopping Cart Display (Reading from Context) ---
const Cart = () => {
  const { cart, clearCart } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-display">
      <h2>Shopping Cart 🛒 ({cart.length})</h2>
      {cart.length === 0 ? <p>Cart is empty</p> : (
        <>
          <ul>
            {cart.map((item, idx) => (
              <li key={idx}>{item.name} - $\${item.price}</li>
            ))}
          </ul>
          <h3>Total: $\${total}</h3>
          <button onClick={clearCart}>Clear Cart</button>
        </>
      )}
    </div>
  );
};

// --- Main App Component (Wrapping with Provider) ---
function App() {
  return (
    <CartProvider>
      <div className="app-container">
        <h1 style={{textAlign: 'center'}}>Context API E-Commerce</h1>
        <div className="grid">
          <ProductList />
          <Cart />
        </div>
      </div>
    </CartProvider>
  );
}

export default App;

/* Add to App.css:
.app-container { max-width: 800px; margin: 0 auto; padding: 20px; }
.grid { display: flex; gap: 20px; }
.product-list, .cart-display { flex: 1; padding: 20px; border: 1px solid #ccc; border-radius: 8px; }
.product-card { display: flex; justify-content: space-between; margin-bottom: 10px; padding: 10px; background: #f9f9f9; }
button { cursor: pointer; padding: 5px 10px; }
*/`;

  return (
    <div className="exercise-container">
      <div className="exercise-header">
        <span className="exercise-number">Exercise 14</span>
        <div>
          <h2 className="exercise-title">React Context API</h2>
          <span className="marks-badge">Total: 10 Marks</span>
        </div>
      </div>

      <div className="exercise-question">
        <strong>Task:</strong> Implement global state management using React Context API for a shopping cart scenario.<br/>
        <strong>Requirements:</strong> Create Cart Context, Add/remove products, Display cart count and total, Access state from multiple components.
      </div>

      <div className="evaluation-card">
        <h4>📋 Evaluation Rubric (10 Marks)</h4>
        <div className="rubric-grid rubric-4">
          <div className="rubric-item">
            <span className="rubric-marks">3 Marks</span>
            <span className="rubric-title">Context Creation</span>
            <p className="rubric-desc">Use <code>createContext()</code> correctly</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">Provider Implementation</span>
            <p className="rubric-desc">Wrap application/components with <code>Context.Provider</code></p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">3 Marks</span>
            <span className="rubric-title">Global State Management</span>
            <p className="rubric-desc">Use <code>useContext()</code> to read and update state across components</p>
          </div>
          <div className="rubric-item">
            <span className="rubric-marks">2 Marks</span>
            <span className="rubric-title">Correct Output</span>
            <p className="rubric-desc">Cart updates instantly across independent UI parts</p>
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
                
                {/* COMPONENT A (Products) */}
                <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", border: "2px dashed #3b82f6", flex: "1", minWidth: "300px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h3 style={{ marginTop: 0, color: "#1e3a8a" }}>Component A: Product List</h3>
                        <span style={{ fontSize: "12px", background: "#dbeafe", color: "#1e40af", padding: "4px 8px", borderRadius: "12px" }}>Updates Context 📤</span>
                    </div>
                    
                    {products.map(product => (
                        <div key={product.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", marginBottom: "8px", border: "1px solid #e2e8f0", borderRadius: "6px" }}>
                            <span><strong>{product.name}</strong> <br/> <span style={{ color: "#059669" }}>${product.price}</span></span>
                            <button onClick={() => addToCart(product)} className="btn-primary" style={{ padding: "6px 12px", fontSize: "14px" }}>Add to Cart</button>
                        </div>
                    ))}
                </div>

                {/* COMPONENT B (Cart) */}
                <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", border: "2px dashed #f59e0b", flex: "1", minWidth: "300px" }}>
                     <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h3 style={{ marginTop: 0, color: "#92400e" }}>Component B: Cart Display</h3>
                        <span style={{ fontSize: "12px", background: "#fef3c7", color: "#92400e", padding: "4px 8px", borderRadius: "12px" }}>Reads Context 📥</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                        <div style={{ fontSize: "24px" }}>🛒</div>
                        <div style={{ fontSize: "20px", fontWeight: "bold" }}>{cart.length} Items</div>
                    </div>

                    {cart.length === 0 ? (
                        <div style={{ color: "#94a3b8", fontStyle: "italic" }}>Cart is empty</div>
                    ) : (
                        <div>
                            <ul style={{ paddingLeft: "20px", margin: "0 0 16px 0", maxHeight: "120px", overflowY: "auto" }}>
                                {cart.map((item, idx) => (
                                    <li key={idx} style={{ marginBottom: "4px" }}>{item.name} (${item.price})</li>
                                ))}
                            </ul>
                            <div style={{ borderTop: "2px solid #e2e8f0", paddingTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <h3 style={{ margin: 0 }}>Total: <span style={{ color: "#059669" }}>${cartTotal}</span></h3>
                                <button onClick={clearCart} style={{ padding: "6px 12px", background: "#ef4444", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>Clear</button>
                            </div>
                        </div>
                    )}
                </div>

            </div>
          </div>
        </div>
      )}

      {activeTab === "code" && (
        <div className="tab-content">
          <div className="exercise-section">
            <div className="section-header-row">
              <h3>React Context API Implementation</h3>
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
              <p className="viva-q">Q1: What problem does the Context API solve?</p>
              <p className="viva-a"><strong>A:</strong> It solves "prop drilling", which is the tedious process of passing data through multiple layers of components via props just to reach a deeply nested component that needs the data.</p>
            </div>
            <div className="viva-item">
              <p className="viva-q">Q2: What are the two main parts of using Context?</p>
              <p className="viva-a"><strong>A:</strong> 1) The <code>Provider</code> component which wraps the tree and provides the `value`. 2) The <code>useContext</code> hook (or Consumer) which is used by child components to access the value.</p>
            </div>
            <div className="viva-item">
              <p className="viva-q">Q3: Why not use Context for everything instead of useState?</p>
              <p className="viva-a"><strong>A:</strong> Context is designed for data that is considered "global" (like themes, user auth, shopping carts). Using it for local component state makes components harder to reuse and can cause unnecessary re-renders across the whole app.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Exercise14ContextApi;

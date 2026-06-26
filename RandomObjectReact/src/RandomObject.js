import React, { useState } from "react";
import DisplayObject from "./DisplayObject";

// Array of 10 JSON DreamPillow product objects used in the lab activity.
const dreamPillowProducts = [
  {
    id: 1,
    productName: "DreamPillow Lite",
    model: "DP-L100",
    material: "Memory Foam",
    color: "Sky Blue",
    size: "Standard",
    price: "$49.99",
    rating: "4.2/5",
    sleepTechnology: "Pressure Relief Support",
    temperatureControl: "Cool Air Mesh",
    warranty: "1 Year"
  },
  {
    id: 2,
    productName: "DreamPillow Comfort",
    model: "DP-C210",
    material: "Gel Memory Foam",
    color: "Pearl White",
    size: "Queen",
    price: "$64.50",
    rating: "4.4/5",
    sleepTechnology: "Dual Neck Support",
    temperatureControl: "Cooling Gel Layer",
    warranty: "2 Years"
  },
  {
    id: 3,
    productName: "DreamPillow Plus",
    model: "DP-P320",
    material: "Latex Blend",
    color: "Lavender Gray",
    size: "King",
    price: "$79.00",
    rating: "4.5/5",
    sleepTechnology: "Adaptive Spinal Alignment",
    temperatureControl: "Breathable Vent Channels",
    warranty: "3 Years"
  },
  {
    id: 4,
    productName: "DreamPillow Air",
    model: "DP-A180",
    material: "Fiber Fill",
    color: "Mint Green",
    size: "Standard",
    price: "$54.75",
    rating: "4.1/5",
    sleepTechnology: "Airflow Comfort Cells",
    temperatureControl: "Moisture-Wick Fabric",
    warranty: "18 Months"
  },
  {
    id: 5,
    productName: "DreamPillow Pro",
    model: "DP-PR450",
    material: "Bamboo Memory Foam",
    color: "Navy Blue",
    size: "Queen",
    price: "$89.99",
    rating: "4.7/5",
    sleepTechnology: "ErgoCurve Neck Cradle",
    temperatureControl: "Smart Cool Cover",
    warranty: "4 Years"
  },
  {
    id: 6,
    productName: "DreamPillow Max",
    model: "DP-M500",
    material: "High-Density Foam",
    color: "Graphite Black",
    size: "King",
    price: "$99.95",
    rating: "4.6/5",
    sleepTechnology: "Full-Body Alignment Core",
    temperatureControl: "Phase Change Fabric",
    warranty: "5 Years"
  },
  {
    id: 7,
    productName: "DreamPillow Smart",
    model: "DP-S610",
    material: "Sensor Foam Hybrid",
    color: "Silver",
    size: "Queen",
    price: "$129.00",
    rating: "4.8/5",
    sleepTechnology: "Sleep Tracking Sensors",
    temperatureControl: "Auto Climate Balance",
    warranty: "5 Years"
  },
  {
    id: 8,
    productName: "DreamPillow Elite",
    model: "DP-E720",
    material: "Organic Cotton Foam",
    color: "Ivory",
    size: "King",
    price: "$119.50",
    rating: "4.7/5",
    sleepTechnology: "Luxury Shoulder Support",
    temperatureControl: "Natural Cooling Weave",
    warranty: "6 Years"
  },
  {
    id: 9,
    productName: "DreamPillow Ultra",
    model: "DP-U830",
    material: "Carbon Infused Foam",
    color: "Deep Teal",
    size: "Queen",
    price: "$139.25",
    rating: "4.9/5",
    sleepTechnology: "Zero-Pressure Response",
    temperatureControl: "Advanced Heat Dissipation",
    warranty: "7 Years"
  },
  {
    id: 10,
    productName: "DreamPillow Premium",
    model: "DP-PR900",
    material: "Cloud Plush Foam",
    color: "Rose Beige",
    size: "King",
    price: "$149.99",
    rating: "5.0/5",
    sleepTechnology: "Premium Contour Comfort",
    temperatureControl: "Tri-Zone Cooling System",
    warranty: "8 Years"
  }
];

// Log the full array in the browser console as required.
console.log("DreamPillow Products Array:", dreamPillowProducts);

function RandomObject() {
  // The selected product is null until the user clicks the button.
  const [selectedProduct, setSelectedProduct] = useState(null);

  const showRandomObject = () => {
    let randomProduct =
      dreamPillowProducts[
        Math.floor(Math.random() * dreamPillowProducts.length)
      ];

    // Try to avoid showing the same object on consecutive clicks.
    if (selectedProduct && dreamPillowProducts.length > 1) {
      while (randomProduct.id === selectedProduct.id) {
        randomProduct =
          dreamPillowProducts[
            Math.floor(Math.random() * dreamPillowProducts.length)
          ];
      }
    }

    setSelectedProduct(randomProduct);
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">DreamPillow Random Product Viewer</h1>
        <p className="subtitle">Welcome to RandomObject Component</p>
        <button className="random-button" onClick={showRandomObject}>
          Show Random DreamPillow
        </button>

        {selectedProduct && <DisplayObject objectData={selectedProduct} />}
      </div>
    </div>
  );
}

export default RandomObject;

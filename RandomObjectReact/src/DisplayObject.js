import React from "react";

function DisplayObject({ objectData }) {
  return (
    <div className="table-wrapper">
      <h2 className="table-title">DreamPillow Product Details</h2>
      <table className="object-table">
        <thead>
          <tr>
            <th>Property</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(objectData).map(([property, value]) => (
            <tr key={property}>
              <td>{property}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayObject;

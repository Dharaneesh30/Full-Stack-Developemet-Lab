import "./DreamPillowAnalysis.css";

const dreamPillows = [
  {
    id: 1,
    productName: "DreamPillow",
    model: "Pro",
    price: 6999,
    rating: 4.8,
    category: "Smart Pillow",
    stock: 25,
    warranty: "2 Years",
    sleepTechnology: "AI Sleep Tracking",
    temperatureControl: "Yes"
  },
  {
    id: 2,
    productName: "DreamPillow",
    model: "Lite",
    price: 2999,
    rating: 4.2,
    category: "Comfort Pillow",
    stock: 40,
    warranty: "1 Year",
    sleepTechnology: "Basic Sleep Support",
    temperatureControl: "No"
  },
  {
    id: 3,
    productName: "DreamPillow",
    model: "Cool",
    price: 4499,
    rating: 4.6,
    category: "Cooling Pillow",
    stock: 32,
    warranty: "18 Months",
    sleepTechnology: "Cooling Gel Layer",
    temperatureControl: "Yes"
  },
  {
    id: 4,
    productName: "DreamPillow",
    model: "Ortho",
    price: 3999,
    rating: 4.4,
    category: "Orthopedic Pillow",
    stock: 18,
    warranty: "1 Year",
    sleepTechnology: "Neck Alignment Support",
    temperatureControl: "No"
  },
  {
    id: 5,
    productName: "DreamPillow",
    model: "Max",
    price: 7999,
    rating: 4.9,
    category: "Premium Smart Pillow",
    stock: 12,
    warranty: "3 Years",
    sleepTechnology: "AI Sleep Tracking and Snore Detection",
    temperatureControl: "Yes"
  },
  {
    id: 6,
    productName: "DreamPillow",
    model: "Kids",
    price: 2499,
    rating: 4.3,
    category: "Kids Pillow",
    stock: 45,
    warranty: "1 Year",
    sleepTechnology: "Soft Sleep Support",
    temperatureControl: "No"
  },
  {
    id: 7,
    productName: "DreamPillow",
    model: "Travel",
    price: 1999,
    rating: 4.1,
    category: "Travel Pillow",
    stock: 60,
    warranty: "6 Months",
    sleepTechnology: "Compact Neck Support",
    temperatureControl: "No"
  },
  {
    id: 8,
    productName: "DreamPillow",
    model: "Air",
    price: 5499,
    rating: 4.7,
    category: "Breathable Pillow",
    stock: 22,
    warranty: "2 Years",
    sleepTechnology: "Airflow Comfort Grid",
    temperatureControl: "Yes"
  },
  {
    id: 9,
    productName: "DreamPillow",
    model: "Eco",
    price: 3499,
    rating: 4.5,
    category: "Eco Pillow",
    stock: 30,
    warranty: "1 Year",
    sleepTechnology: "Natural Fiber Comfort",
    temperatureControl: "No"
  },
  {
    id: 10,
    productName: "DreamPillow",
    model: "Ultra",
    price: 8999,
    rating: 4.9,
    category: "Luxury Smart Pillow",
    stock: 10,
    warranty: "3 Years",
    sleepTechnology: "AI Sleep Tracking and Auto Adjustment",
    temperatureControl: "Yes"
  }
];

function ProductTable({ products }) {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Model</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.productName}</td>
              <td>{product.model}</td>
              <td>Rs. {product.price}</td>
              <td>{product.rating}</td>
              <td>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DreamPillowAnalysis() {
  const highlyRatedProducts = dreamPillows.filter(
    (product) => product.rating >= 4.5
  );

  const totalStock = dreamPillows.reduce(
    (total, product) => total + product.stock,
    0
  );

  const totalPrice = dreamPillows.reduce(
    (total, product) => total + product.price,
    0
  );

  const averagePrice = totalPrice / dreamPillows.length;

  const proProduct = dreamPillows.find((product) => product.model === "Pro");

  // The spread operator creates a copy before sorting so the original array stays unchanged.
  const sortedProductsByPrice = [...dreamPillows].sort(
    (firstProduct, secondProduct) => firstProduct.price - secondProduct.price
  );

  return (
    <main>
      <header className="page-header">
        <h1>DreamPillow Product Data Analysis</h1>
        <p>React lab exercise using JavaScript array methods</p>
      </header>

      <section className="card">
        <h2>All Products</h2>
        <p className="method-label">Array Method: map()</p>
        <ProductTable products={dreamPillows} />
      </section>

      <section className="card">
        <h2>Highly Rated Products</h2>
        <p className="method-label">Array Method: filter()</p>
        <ProductTable products={highlyRatedProducts} />
      </section>

      <section className="card">
        <h2>Product Statistics</h2>
        <p className="method-label">Array Method: reduce()</p>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Stock</h3>
            <p>{totalStock}</p>
          </div>
          <div className="stat-card">
            <h3>Average Product Price</h3>
            <p>Rs. {averagePrice.toFixed(2)}</p>
          </div>
        </div>
      </section>

      <section className="card">
        <h2>Search Result</h2>
        <p className="method-label">Array Method: find()</p>
        {proProduct ? (
          <div className="details-grid">
            <p><strong>ID:</strong> {proProduct.id}</p>
            <p><strong>Product Name:</strong> {proProduct.productName}</p>
            <p><strong>Model:</strong> {proProduct.model}</p>
            <p><strong>Price:</strong> Rs. {proProduct.price}</p>
            <p><strong>Rating:</strong> {proProduct.rating}</p>
            <p><strong>Category:</strong> {proProduct.category}</p>
            <p><strong>Stock:</strong> {proProduct.stock}</p>
            <p><strong>Warranty:</strong> {proProduct.warranty}</p>
            <p><strong>Sleep Technology:</strong> {proProduct.sleepTechnology}</p>
            <p><strong>Temperature Control:</strong> {proProduct.temperatureControl}</p>
          </div>
        ) : (
          <p>No Product Found</p>
        )}
      </section>

      <section className="card">
        <h2>Sorted Products</h2>
        <p className="method-label">Array Method: sort()</p>
        <ProductTable products={sortedProductsByPrice} />
      </section>
    </main>
  );
}

export default DreamPillowAnalysis;

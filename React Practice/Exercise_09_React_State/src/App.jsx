
import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>React State Counter</h1>
      <h2>Current Students: {count}</h2>
      <button onClick={() => setCount(c => c + 1)} style={{ margin: '5px', padding: '10px' }}>Add</button>
      <button onClick={() => count > 0 && setCount(c => c - 1)} style={{ margin: '5px', padding: '10px' }}>Remove</button>
    </div>
  );
}
export default App;

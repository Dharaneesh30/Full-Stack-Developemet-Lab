
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  return <CartContext.Provider value={{ cart, setCart }}>{children}</CartContext.Provider>;
};

const ProductList = () => {
  const { setCart } = useContext(CartContext);
  return (
    <div>
      <h3>Products</h3>
      <button onClick={() => setCart(c => [...c, { name: 'Book', price: 20 }])}>Add Book ($20)</button>
    </div>
  );
};

const CartDisplay = () => {
  const { cart } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  return (
    <div>
      <h3>Cart ({cart.length} items)</h3>
      <p>Total: ${total}</p>
    </div>
  );
};

function App() {
  return (
    <CartProvider>
      <div style={{ padding: '20px' }}>
        <h1>Context API Cart</h1>
        <ProductList />
        <hr/>
        <CartDisplay />
      </div>
    </CartProvider>
  );
}
export default App;

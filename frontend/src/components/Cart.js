import React, { useContext } from 'react';
import { CartContext } from '/CartContext';

const Cart = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.map((item) => (
        <div key={item.product._id}>
          <h3>{item.product.name}</h3>
          <p>{item.product.description}</p>
          <p>Price: ${item.product.price}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
      <button>Checkout</button>
    </div>
  );
};

export default Cart;

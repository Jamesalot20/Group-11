import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems } = useContext(CartContext);

  const navigate = useNavigate();
  const handleCheckout = () => {
    // Redirect to the Checkout page
    navigate('/Checkout');
  };
  
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
      <button onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
};

export default Cart;

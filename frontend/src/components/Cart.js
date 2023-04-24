import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, productDetails } = useContext(CartContext);

  const navigate = useNavigate();
  const handleCheckout = () => {
    // Redirect to the Checkout page
    navigate('/Checkout');
  };
  
  return (
    <div>
      <h1>Cart</h1>
      {cartItems.map((item, index) => { // Add 'index' parameter
        const product = productDetails[item.productId];

        return (
          <div key={index}> // Use 'index' as the key
            {product ? (
              <>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Quantity: {item.quantity}</p>
              </>
            ) : (
              <p>Loading product...</p>
            )}
          </div>
        );
      })}
      <button onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
};

export default Cart;

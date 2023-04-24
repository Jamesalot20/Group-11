import React, { useContext, useEffect } from 'react';
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, productDetails, fetchProductDetails } = useContext(CartContext);
  console.log("cartItems:", cartItems);
useEffect(() => {
  cartItems.forEach((item) => {
    if (!productDetails[item.product]) {
      fetchProductDetails(item.product);
    }
  });
}, [cartItems, productDetails, fetchProductDetails]);

  const navigate = useNavigate();
  const handleCheckout = () => {
    // Redirect to the Checkout page
    navigate('/Checkout');
  };
  
  return (
    <div>
      <h1>Cart</h1>
      {cartItems.map((item, index) => {
        const product = productDetails[item.productId];

        return (
          <div key={index}>
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

import React, { createContext, useState } from 'react';
import api from '../api';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = async (productId) => {
    try {
      // Retrieve the authentication token from local storage or another source
      const token = localStorage.getItem('authToken');

      const response = await api.post(
        '/carts/add',
        { productId, quantity: 1 },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      setCartItems(response.data.cart.items);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};


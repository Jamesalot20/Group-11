import React, { createContext, useState } from 'react';
import api from '../api';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [productDetails, setProductDetails] = useState({});

  const fetchProductDetails = async (product) => {
    try {
      const response = await api.get(`/products/${product}`);
      setProductDetails((prevDetails) => ({
        ...prevDetails,
        [product]: response.data,
      }));
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
    console.log('cartItems:', cartItems);
    console.log('productDetails:', productDetails);
  };

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
      fetchProductDetails(productId);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, productDetails, fetchProductDetails }}>
      {children}
    </CartContext.Provider>
  );
};

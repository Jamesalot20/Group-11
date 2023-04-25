import React, { useEffect, useState } from 'react';
import api from '../api';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch all users and products data from API
    const fetchUserData = async () => {
      const response = await api.get('/users');
      setUsers(response.data);
    };

    const fetchProductData = async () => {
      const response = await api.get('/products');
      setProducts(response.data);
    };

    fetchUserData();
    fetchProductData();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await api.delete(`/users/deleteUser/${userId}`);
      // Update the user list after deletion
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await api.delete(`/users/${productId}`);
      // Update the product list after deletion
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h2>User Accounts</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.email} ({user.role})
            <button onClick={() => handleDeleteUser(user._id)}>Decline</button>
          </li>
        ))}
      </ul>

      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} ({product.price})
            <button onClick={() => handleDeleteProduct(product._id)}>Decline</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;

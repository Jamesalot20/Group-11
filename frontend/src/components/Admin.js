import React, { useEffect, useState } from 'react';
import api from '../api';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await api.get('/users');
      setUsers(response.data);
    };

    const fetchProducts = async () => {
      const response = await api.get('/products');
      setProducts(response.data);
    };

    fetchUsers();
    fetchProducts();
  }, []);

  const handleApproveUser = async (userId) => {
    try {
      await api.patch(`/users/${userId}`, { status: true });
      setUsers(users.map(user => user.id === userId ? { ...user, status: true } : user));
    } catch (error) {
      console.error('Error approving user:', error);
      // Show an error message or handle the error as needed
    }
  };

  const handleApproveProduct = async (productId) => {
    try {
      await api.patch(`/products/${productId}`, { status: true });
      setProducts(products.map(product => product.id === productId ? { ...product, status: true } : product));
    } catch (error) {
      console.error('Error approving product:', error);
      // Show an error message or handle the error as needed
    }
  };
  
  const handleDeclineUser = async (userId) => {
    try {
      await api.patch(`/users/${userId}`, { status: false });
      setUsers(users.map(user => user.id === userId ? { ...user, status: false } : user));
    } catch (error) {
      console.error('Error approving user:', error);
      // Show an error message or handle the error as needed
    }
  };

  const handleDeclineProduct = async (productId) => {
    try {
      await api.patch(`/products/${productId}`, { status: false });
      setProducts(products.map(product => product.id === productId ? { ...product, status: false } : product));
    } catch (error) {
      console.error('Error approving product:', error);
      // Show an error message or handle the error as needed
    }
  };

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.status === 1 ? 'Approved' : 'Pending'}</td>
              <td>
                <button onClick={() => handleApproveUser(user.id)}>Approve</button>
                <button onClick={() => handleDeclineUser(user.id)}>Decline</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Products</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.status === 1 ? 'Approved' : 'Pending'}</td>
              <td>
                <button onClick={() => handleApproveProduct(product.id)}>Approve</button>
                <button onClick={() => handleDeclineProduct(product.id)}>Decline</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Admin;

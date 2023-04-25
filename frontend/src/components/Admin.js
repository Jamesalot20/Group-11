import React, { useState, useEffect } from 'react';
import api from '../api';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersResponse = await api.get('/users');
      setUsers(usersResponse.data);

      const productsResponse = await api.get('/products');
      setProducts(productsResponse.data);
    };

    fetchData();
  }, []);

  const handleApprove = async (type, id) => {
    const response = await api.put(`/${type}/${id}`, { status: 1 });
    if (response.status === 200) {
      if (type === 'users') {
        setUsers(users.map(user => user.id === id ? { ...user, status: 1 } : user));
      } else if (type === 'products') {
        setProducts(products.map(product => product.id === id ? { ...product, status: 1 } : product));
      }
    }
  };

  const handleDecline = async (type, id) => {
    // Implement logic to decline the user or product
    const response = await api.put(`/${type}/${id}`, { status: 0 });
    if (response.status === 200) {
      if (type === 'users') {
        setUsers(users.map(user => user.id === id ? { ...user, status: 0 } : user));
      } else if (type === 'products') {
        setProducts(products.map(product => product.id === id ? { ...product, status: 0 } : product));
      }
    }
  };

  return (
    <div>
      <h2>Admin Page</h2>
      <h3>Users</h3>
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
                {user.status === 0 && (
                  <>
                    <button onClick={() => handleApprove('users', user.id)}>Approve</button>
                    <button onClick={() => handleDecline('users', user.id)}>Decline</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Products</h3>
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
                {product.status === 0 && (
                  <>
                    <button onClick={() => handleApprove('products', product.id)}>Approve</button>
                    <button onClick={() => handleDecline('products', product.id)}>Decline</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;

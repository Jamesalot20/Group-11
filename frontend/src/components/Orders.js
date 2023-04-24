import { useState, useEffect } from 'react';
import api from '../api';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [returningProductId, setReturningProductId] = useState(null);

  // Fetch orders on mount
useEffect(() => {
  async function fetchOrders() {
    try {
      const response = await api.get('/api/orders/history', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }
  fetchOrders();
}, []);


  async function handleReturn(productId) {
    const response = await fetch(`/orders/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ status: 'cancelled' }),
    });
    if (response.ok) {
      setReturningProductId(productId);
    } else {
      console.error('Failed to return product:', response.status);
    }
  }

   return (
    <div>
      <h1>Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order._id}>
            <h2>Order ID: {order._id}</h2>
            <h3>Total Price: ${order.totalPrice.toFixed(2)}</h3>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map(item => (
                  <tr key={item.product._id}>
                    <td>{item.product.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>{item.status}</td>
                    <td>
                      {item.status === 'delivered' && (
                        <button onClick={() => handleReturn(item.product._id)}>Return</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
      {returningProductId && <p>Product returned.</p>}
    </div>
  );
}

export default OrdersPage;

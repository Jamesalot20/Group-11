import { useState, useEffect } from 'react';
import api from '../api';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [returningItemId, setReturningItemId] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await api.get('/orders/history', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        console.log('Fetched orders:', response.data);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }
    fetchOrders();
  }, []);

  async function handleReturn(itemId) {
    try {
      const response = await api.put(`/orders/item/${itemId}/return`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (response.status === 200) {
        setReturningItemId(itemId);

        setOrders((prevOrders) =>
          prevOrders.map((order) => {
            const items = order.items.map((item) => {
              if (item._id === itemId) {
                return { ...item, status: "returned" };
              } else {
                return item;
              }
            });
            return { ...order, items };
          })
        );
      } else {
        console.error('Failed to return item:', response.status);
      }
    } catch (error) {
      console.error('Error returning item:', error);
    }
  }

  function renderReturnButton(item) {
    if (item.status === 'completed') {
      return (
        <button onClick={() => handleReturn(item._id)}>Return</button>
      );
    }
    return null;
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
                    <td>{renderReturnButton(item)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {order.status === 'completed' && (
              <button onClick={() => handleReturn(order._id)}>Return Order</button>
            )}
          </div>
        ))
      )}
      {returningItemId && <p>Product returned.</p>}
    </div>
  );
}

export default OrdersPage;

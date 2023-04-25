import { useState, useEffect } from 'react';
import api from '../api';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [returningItemId, setReturningItemId] = useState(null);

  // Fetch orders on mount
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

  return (
    <main>
      <div className="title">
        <h1>Order History</h1>
      </div>
      {orders.map((order) => (
        <div key={order._id}>
          <h2>Order ID: {order._id}</h2>
          <h3>Total Price: ${order.totalPrice.toFixed(2)}</h3>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item._id}>
                  <td>{item.productName}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>{item.status}</td>
                  <td>
                    {item.status === 'delivered' && (
                      <button onClick={() => handleReturn(item._id)}>
                        Return
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </main>
  );
}

export default OrdersPage;

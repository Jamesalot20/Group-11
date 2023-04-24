import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, productDetails } = useContext(CartContext);

  const totalPrice = cartItems.reduce((total, item) => {
    const product = productDetails[item.productId];
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

const handleSubmit = async (e) => {
  e.preventDefault();

  const items = cartItems.map((item) => {
    const product = productDetails[item.productId];
    return {
      product: item.productId,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
    };
  });

  const orderData = {
    items,
    total: totalPrice,
  };

  try {
    await createOrder(orderData);
    navigate('/Completion');
  } catch (error) {
    console.error('Failed to submit order:', error);
  }
};

async function createOrder(orderData) {
  try {
    const response = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error(`Failed to submit order: ${response.status}`);
    }

    // Handle successful order submission
    const order = await response.json();
    console.log('Order created:', order);
    navigate('/Store');
  } catch (error) {
    console.error(error);
  }
}


  return (
    <form>
      <h1>Checkout</h1>
      <h2>Total: ${totalPrice.toFixed(2)}</h2>

      <div className="Products">
        {cartItems.map((item, index) => {
          const product = productDetails[item.product];
          return product ? (
            <div key={index}>
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ) : null;
        })}
      </div>

      <div className="mb-3">
        {/* Other form fields */}
      </div>
      <div className="d-grid">
        <a href="Completion">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </a>
      </div>
    </form>
  );
}

export default Checkout;

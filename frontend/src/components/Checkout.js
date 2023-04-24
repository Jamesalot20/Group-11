import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';

function Checkout() {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);

  const handleSubmit = () => {
    // Redirect to the Store page
    navigate('/Store');
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (accumulator, currentItem) =>
        accumulator + currentItem.product.price * currentItem.quantity,
      0
    );
  };

  return (
    <form>
      <h1>Checkout</h1>
      <h2>Total: ${calculateTotal().toFixed(2)}</h2>

      <div className="Products">
        {cartItems.map((item, index) => ( // Add 'index' parameter
          <div key={index}> // Use 'index' as the key
            <h3>{item.product.name}</h3>
            <p>Price: ${item.product.price}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))}
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

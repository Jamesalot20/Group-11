import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, productDetails, fetchProductDetails } = useContext(CartContext);

  useEffect(() => {
    cartItems.forEach((item) => {
      if (!productDetails[item.product]) {
        fetchProductDetails(item.product);
      }
    });
  }, [cartItems, productDetails, fetchProductDetails]);

  const totalPrice = cartItems.reduce((total, item) => {
    const product = productDetails[item.product];
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  const handleSubmit = () => {
    navigate('/Store');
  };

  return (
    <form>
      <h1>Checkout</h1>
      <h2>Total: ${totalPrice.toFixed(2)}</h2>

      <div className="Products">
        {cartItems.map((item, index) => {
          const product = productDetails[item.product];
          console.log('Cart item:', item);
  console.log('Product:', product);
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

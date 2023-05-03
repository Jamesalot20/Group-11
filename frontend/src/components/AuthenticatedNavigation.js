import React from 'react';
import { NavLink } from 'react-router-dom';

const AuthenticatedNavigation = ({ role }) => {
  console.log('AuthenticatedNavigation role:', role);
  return (
    <nav>
      <NavLink to="/store">Store</NavLink>
      <NavLink to="/cart">Cart</NavLink>
      <NavLink to="/Checkout">Checkout</NavLink>
      <NavLink to="/Orders">Order History</NavLink>
      <NavLink to="/log-out">Logout</NavLink>
      {['seller', 'admin'].includes(role) && <NavLink to="/my-products">My Products</NavLink>}
      {role === 'buyer' && <NavLink to="/money">Money</NavLink>}

      {/* Add more navigation links as needed */}
    </nav>
  );
};

export default AuthenticatedNavigation;

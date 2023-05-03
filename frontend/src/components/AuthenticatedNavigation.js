import React from 'react';
import { NavLink } from 'react-router-dom';

const AuthenticatedNavigation = () => {
  return (
    <nav>
      <NavLink to="/store">Store</NavLink>
      <NavLink to="/my-products">My Products</NavLink>
      {/* Add more navigation links as needed */}
    </nav>
  );
};

export default AuthenticatedNavigation;

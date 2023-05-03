import React from 'react';
import { NavLink } from 'react-router-dom';

const AuthenticatedNavigation = ({ role }) => {
  return (
    <nav>
      <NavLink to="/store">Store</NavLink>
      {['seller', 'admin'].includes(role) && <NavLink to="/my-products">My Products</NavLink>}
      {/* Add more navigation links as needed */}
    </nav>
  );
};

export default AuthenticatedNavigation;

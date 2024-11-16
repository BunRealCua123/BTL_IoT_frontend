import React from 'react';
import { Navigate } from 'react-router-dom';

const RoleBasedRoute = ({ children, requiredRole }) => {

  if (requiredRole != 'admin') {
    return <Navigate to="/" />; 
  }

  return children;
};

export default RoleBasedRoute;

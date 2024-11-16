import React from 'react';
import { Navigate } from 'react-router-dom';

const RoleBasedRoute = ({ children, requiredRole }) => {
  const userRole = localStorage.getItem("role");

  if (userRole !== requiredRole) {
    return <Navigate to="/" />; 
  }

  return children;
};

export default RoleBasedRoute;

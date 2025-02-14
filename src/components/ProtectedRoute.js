import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roleRequired }) => {
  const userRole = localStorage.getItem("role");  

  if (!userRole) {
    return <Navigate to={`/${roleRequired}/login`} />;
  }

  if (userRole !== roleRequired) {
    return <Navigate to={`/${roleRequired}/view`} />;
  }

  return children;
};

export default ProtectedRoute;

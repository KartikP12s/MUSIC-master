// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const email = localStorage.getItem('email');
  return email ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

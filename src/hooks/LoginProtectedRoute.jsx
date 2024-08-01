import React from 'react';
import { Navigate } from 'react-router-dom';

const LoginProtectedRoute = ({ element: Component, ...rest }) => {
  const email = localStorage.getItem('email');
  return email ? <Navigate to="/" /> : <Component {...rest} />;
};

export default LoginProtectedRoute;
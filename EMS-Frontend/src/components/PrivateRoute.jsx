import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from './UserContext';  // Make sure path is correct

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
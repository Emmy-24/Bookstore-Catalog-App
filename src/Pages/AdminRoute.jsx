import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Auth';
import Admin from './Admin';

const AdminRoute = () => {
  const { user } = useAuth();

  if (!user || !user.email.includes('@bookstore.com')) {
    return <Navigate to="/login" replace />;
  }

  return <Admin />;
};

export default AdminRoute;

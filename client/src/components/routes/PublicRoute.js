import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  // Check if the user is authenticated
  if (localStorage.getItem('token')) {
    return <Navigate to="/home" />; // Redirect to a page for authenticated users
  } else {
    return children; // Allow access to the landing page, login, or register
  }
};

export default PublicRoute;
// src/ProtectedRoute.js
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from './authService'; // Import the authService

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;

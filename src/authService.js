// src/authService.js
import jwt_decode from 'jwt-decode';

// Flag to track if the user has logged out
let hasLoggedOut = false;

// Function to log in a user and store the token in local storage
export const login = (token) => {
  localStorage.setItem('token', JSON.stringify(token));
  hasLoggedOut = false; // Reset the flag
};

// Function to log out a user and remove the token from local storage
export const logout = () => {
  localStorage.removeItem('token');
  hasLoggedOut = true; // Set the flag to true when logging out
};

// Function to check if the user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = jwt_decode(token);
      // Check if the token is not expired
      return decodedToken.exp > Date.now() / 1000;
    } catch (error) {
      // Token is invalid or expired
      return false;
    }
  }
  return false; // No token found
};

// Function to check if the user has logged out
export const hasUserLoggedOut = () => {
  return hasLoggedOut;
};


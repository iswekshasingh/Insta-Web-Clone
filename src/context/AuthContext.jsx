// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/authService';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize the auth state on mount
  useEffect(() => {
    // Check if a user is logged in previously
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate async network request
    const loggedInUser = authService.login(email, password);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const signup = async (email, password) => {
    // Simulate async network request
    authService.signup(email, password);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateProfile = async (updatedData) => {
    // Simulate async network request
    const updatedUser = authService.updateProfile(updatedData);
    setUser(updatedUser);
    return updatedUser;
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateProfile
  };

  // Prevent rendering children until we finish determining user auth state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

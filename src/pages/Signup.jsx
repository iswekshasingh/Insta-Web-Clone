// src/pages/Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (email, password, setLocalError, username) => {
    setError(''); // Clear previous errors
    try {
      await signup(email, password, username);
      // Redirect to Login after successful signup
      navigate('/login');
    } catch (err) {
      // Capture and set user already exists error
      setError(err.message);
    }
  };

  return (
    <AuthForm 
      isLogin={false}
      title="Velora"
      subtitle="Create an account"
      description="Get started! Enter your details to create a new account"
      buttonText="Sign Up"
      onSubmit={handleSignup}
      error={error}
      linkDescription="Already have an account?"
      linkText="Log in"
      linkTo="/login"
    />
  );
};

export default Signup;

// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    setError(''); // Clear previous errors
    try {
      await login(email, password);
      // Redirect to Home after successful login
      navigate('/');
    } catch (err) {
      // Capture and set invalid login error
      setError(err.message);
    }
  };

  return (
    <AuthForm 
      isLogin={true}
      title="Velora"
      subtitle="Login to your account"
      description="Welcome back! Enter your details to log in to your account"
      buttonText="Login"
      onSubmit={handleLogin}
      error={error}
      linkDescription="New here?"
      linkText="Create account"
      linkTo="/signup"
    />
  );
};

export default Login;

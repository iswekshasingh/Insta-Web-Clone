// src/components/auth/AuthForm.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AuthForm.css';

const AuthForm = ({ 
  title, 
  subtitle, 
  description, 
  onSubmit, 
  buttonText, 
  error, 
  linkText, 
  linkTo, 
  linkDescription,
  isLogin 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError('');

    // Basic empty fields validation
    if (!email.trim() || !password.trim()) {
      setLocalError('Please fill in all fields');
      return;
    }

    // Call parent handler with credentials
    onSubmit(email, password, setLocalError);
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card-container">
        
        {/* Left Image Section - Luxury Style */}
        <div className="auth-image-section">
          {/* A luxurious interior minimalism image perfectly complementing the golden palette */}
          <img 
            src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=1200&auto=format&fit=crop" 
            alt="Luxury Aesthetic" 
            className="auth-image"
          />
        </div>

        {/* Right Form Section */}
        <div className="auth-form-section">
          <div className="auth-header">
            <div className="auth-logo-row">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="auth-logo-icon">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              <span className="auth-logo-text">{title}</span>
            </div>
            <h1 className="auth-subtitle">{subtitle}</h1>
            <p className="auth-description">{description}</p>
          </div>

          {(error || localError) && (
            <div className="auth-error-banner">
              {error || localError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-input-group">
              <label className="auth-label">Email Address</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
              />
            </div>

            <div className="auth-input-group">
              <label className="auth-label">Password</label>
              <input 
                type="password" 
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
              />
            </div>

            {isLogin && (
              <div className="auth-options-row">
                <label className="auth-checkbox-label">
                  <input type="checkbox" className="auth-checkbox" />
                  Remember me
                </label>
                <a href="#" className="auth-forgot-password">Forgot password?</a>
              </div>
            )}

            <button type="submit" className="auth-primary-btn">
              {buttonText}
            </button>
          </form>

          <div className="auth-divider-container">
            <hr className="auth-divider-line" />
            <span className="auth-divider-text">Or continue with</span>
            <hr className="auth-divider-line" />
          </div>

          <div className="auth-social-btns">
            <button className="auth-social-btn" type="button">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.05 2.65.72 3.4 1.8-1.51.9-2.58 3.5-1.07 5.25.96 1.13 2.15 1.53 2.15 1.53-1.04 2.87-2.14 3.48-3.13 4.43zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Sign in with Apple
            </button>
            <button className="auth-social-btn" type="button">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{color: '#ea4335'}}>
                 <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                 <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                 <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                 <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </button>
          </div>

          <div className="auth-footer-container">
            <p className="auth-footer-text">
              {linkDescription} <Link to={linkTo} className="auth-footer-link">{linkText}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

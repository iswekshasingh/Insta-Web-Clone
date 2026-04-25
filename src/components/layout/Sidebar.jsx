import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import './Sidebar.css';

const Sidebar = ({ collapsed, onSearchClick }) => {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleSearchClick = () => {
    if (onSearchClick) {
      onSearchClick();
    } else {
      navigate('/', { state: { openSearch: true } });
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate('/signup');
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <nav className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-logo">
          <h1 style={{ fontFamily: 'Playfair Display, serif' }}>Velora</h1>
        </div>

        <ul className="sidebar-links">
          <li className="sidebar-item active" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <span className="material-symbols-outlined icon">home</span> Home
          </li>
          <li className="sidebar-item" onClick={handleSearchClick} style={{ cursor: 'pointer' }}>
            <span className="material-symbols-outlined icon">search</span> Search
          </li>
          <li className="sidebar-item" onClick={() => navigate('/messages')} style={{ cursor: 'pointer' }}>
            <span className="material-symbols-outlined icon">mail</span> Messages
          </li>
          <li className="sidebar-item" onClick={() => navigate('/liked')} style={{ cursor: 'pointer' }}>
            <span className="material-symbols-outlined icon">favorite</span> Liked
          </li>

          <li className="sidebar-item" onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>
            <span className="material-symbols-outlined icon">person</span> Profile
          </li>
          <li className="sidebar-item" onClick={toggleTheme} style={{ cursor: 'pointer' }}>
            <span className="material-symbols-outlined icon">
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </li>
        </ul>

        <div className="sidebar-footer">
          <div className="sidebar-item" onClick={handleLogoutClick} style={{ cursor: 'pointer' }}>
            <span className="material-symbols-outlined icon">logout</span> Logout
          </div>
        </div>
      </nav>

      {showLogoutModal && (
        <div className="logout-modal-overlay" onClick={cancelLogout}>
          <div className="logout-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Log Out?</h3>
            <p>Are you sure you want to log out?</p>
            <div className="logout-modal-buttons">
              <button className="confirm-btn" onClick={confirmLogout}>Yes, Log Out</button>
              <button className="cancel-btn" onClick={cancelLogout}>No, Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;

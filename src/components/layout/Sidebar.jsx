import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-logo">
        <h1 style={{fontFamily: 'Playfair Display, serif'}}>Instagram</h1>
      </div>
      
      <ul className="sidebar-links">
        <li className="sidebar-item active">
          <span className="icon">🏠</span> Home
        </li>
        <li className="sidebar-item">
          <span className="icon">🔍</span> Search
        </li>
        <li className="sidebar-item">
          <span className="icon">🧭</span> Explore
        </li>
        <li className="sidebar-item">
          <span className="icon">🎬</span> Reels
        </li>
        <li className="sidebar-item">
          <span className="icon">💬</span> Messages
        </li>
        <li className="sidebar-item">
          <span className="icon">❤️</span> Notifications
        </li>
        <li className="sidebar-item">
          <span className="icon">➕</span> Create
        </li>
        <li className="sidebar-item">
          <span className="icon">👤</span> Profile
        </li>
      </ul>

      <div className="sidebar-footer">
        <div className="sidebar-item" onClick={handleLogout} style={{ cursor: 'pointer' }}>
          <span className="icon">🚪</span> Logout
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;

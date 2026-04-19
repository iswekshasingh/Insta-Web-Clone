import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const Sidebar = ({ collapsed }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-logo">
        <h1 style={{fontFamily: 'Playfair Display, serif'}}>Instagram</h1>
      </div>
      
      <ul className="sidebar-links">
        <li className="sidebar-item active" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <span className="material-symbols-outlined icon">home</span> Home
        </li>
        <li className="sidebar-item">
          <span className="material-symbols-outlined icon">search</span> Search
        </li>
        <li className="sidebar-item" onClick={() => navigate('/messages')} style={{ cursor: 'pointer' }}>
          <span className="material-symbols-outlined icon">mail</span> Messages
        </li>
        <li className="sidebar-item">
          <span className="material-symbols-outlined icon">favorite</span> Liked/Saved
        </li>
        <li className="sidebar-item" onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>
          <span className="material-symbols-outlined icon">person</span> Profile
        </li>
      </ul>

      <div className="sidebar-footer">
        <div className="sidebar-item" onClick={handleLogout} style={{ cursor: 'pointer' }}>
          <span className="material-symbols-outlined icon">logout</span> Logout
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;

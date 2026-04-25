import React from 'react';
import { USERS } from '../../data/dummyData';
import './FollowingModal.css';

const FollowingModal = ({ onClose }) => {
  return (
    <div className="following-modal-overlay" onClick={onClose}>
      <div className="following-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="following-modal-header">
          <h2>Following</h2>
          <button className="close-modal-btn" onClick={onClose}>✕</button>
        </div>
        <div className="following-modal-list">
          {USERS.map(user => (
            <div key={user.id} className="following-user-row">
              <img src={user.avatar} alt={user.username} className="following-user-avatar" />
              <div className="following-user-info">
                <span className="following-username">{user.username}</span>
                <span className="following-name">{user.note || 'User'}</span>
              </div>
              <button className="following-btn">Following</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowingModal;

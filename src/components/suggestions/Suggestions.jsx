import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { SUGGESTIONS } from '../../data/dummyData';
import './Suggestions.css';

const Suggestions = () => {
  const { user, toggleFollow } = useAuth();
  
  return (
    <div className="suggestions-container">
      {/* Current User Profile Preview */}
      <div className="my-profile-preview">
        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" alt="profile" className="my-avatar" />
        <div className="my-info">
          <span className="my-username">{user?.email?.split('@')[0] || 'user'}</span>
          <span className="my-fullname">{user?.email}</span>
        </div>
        <button className="switch-btn">Switch</button>
      </div>

      <div className="suggestions-header">
        <span className="suggestions-title">Suggested for you</span>
        <button className="see-all-btn">See All</button>
      </div>

      <div className="suggestions-list">
        {SUGGESTIONS.map(s => {
          const isFollowing = user?.following?.includes(s.username);
          return (
            <div key={s.id} className="suggestion-item">
              <div className="suggestion-user">
                <img src={s.avatar} alt={s.username} className="suggestion-avatar" />
                <div className="suggestion-info">
                  <span className="suggestion-username">{s.username}</span>
                  <span className="suggestion-reason">Suggested for you</span>
                </div>
              </div>
              <button 
                className="follow-btn" 
                onClick={() => toggleFollow(s.username)}
                style={{ color: isFollowing ? 'var(--text-primary)' : 'var(--accent-color)' }}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Suggestions;

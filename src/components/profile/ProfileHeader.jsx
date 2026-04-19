import React, { useState } from 'react';
import EditProfileModal from './EditProfileModal';
import './ProfileHeader.css';

const ProfileHeader = ({ profile }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className="profile-header">
      <div className="profile-image-container">
        <img src={profile.avatar} alt={profile.username} className="profile-image" />
      </div>
      <div className="profile-info">
        <div className="profile-info-top">
          <h2 className="profile-username">{profile.username}</h2>
          <button className="edit-profile-btn" onClick={() => setIsEditOpen(true)}>Edit Profile</button>
          <button className="settings-btn">⚙️</button>
        </div>
        <div className="profile-stats">
          <span><strong>{profile.postsCount}</strong> posts</span>
          <span><strong>{profile.followers}</strong> followers</span>
          <span><strong>{profile.following}</strong> following</span>
        </div>
        <div className="profile-bio">
          <div className="bio-text">
            {profile.bio.split('\n').map((line, index) => (
              <span key={index}>{line}<br /></span>
            ))}
          </div>
        </div>
      </div>
      <EditProfileModal 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        currentProfile={profile} 
      />
    </div>
  );
};

export default ProfileHeader;

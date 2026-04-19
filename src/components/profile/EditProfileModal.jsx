import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './EditProfileModal.css';

const EditProfileModal = ({ isOpen, onClose, currentProfile }) => {
  const { updateProfile } = useAuth();
  
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setUsername(currentProfile.username || '');
      setBio(currentProfile.bio || '');
      setAvatar(currentProfile.avatar || '');
      setError('');
    }
  }, [isOpen, currentProfile]);

  if (!isOpen) return null;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Username cannot be empty');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      await updateProfile({
        username,
        bio,
        avatar
      });
      onClose(); // Automatically closes and refetches due to context update
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-modal-overlay" onClick={onClose}>
      <div className="edit-modal-content" onClick={e => e.stopPropagation()}>
        <div className="edit-modal-header">
          <h2>Edit profile</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="edit-modal-form">
          <div className="form-group avatar-group">
            <img src={avatar || 'https://via.placeholder.com/150'} alt="Profile preview" className="avatar-preview" />
            <div className="avatar-upload-actions">
              <h3>{username}</h3>
              <label className="upload-btn">
                Change profile photo
                <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
              </label>
            </div>
          </div>
          
          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              placeholder="Username"
            />
          </div>
          
          <div className="form-group">
            <label>Bio</label>
            <textarea 
              value={bio} 
              onChange={e => setBio(e.target.value)} 
              placeholder="Bio"
              rows={4}
            />
          </div>
          
          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? 'Saving...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;

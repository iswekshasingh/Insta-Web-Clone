import React, { useState } from 'react';
import './ProfilePosts.css';

const ProfilePosts = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState(null);

  const openModal = (post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  return (
    <>
      <div className="profile-posts-grid">
        {posts.map(post => (
          <div key={post.id} className="profile-post-item" onClick={() => openModal(post)}>
            <img src={post.image} alt="Post" />
            <div className="post-overlay">
              <span className="overlay-stat"><span className="icon">❤️</span> {post.likes}</span>
              <span className="overlay-stat"><span className="icon">💬</span> {post.comments}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedPost && (
        <div className="post-modal" onClick={closeModal}>
          <div className="post-modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={closeModal}>×</button>
            <img src={selectedPost.image} alt="Selected Post" className="modal-image" />
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePosts;

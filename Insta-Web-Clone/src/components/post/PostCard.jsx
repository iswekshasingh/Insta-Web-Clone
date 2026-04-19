import React, { useState } from 'react';
import './PostCard.css';

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const toggleLike = () => {
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-user-info">
          <img src={post.user.avatar} alt={post.user.username} className="post-avatar" />
          <span className="post-username">{post.user.username}</span>
          <span className="post-time">• {post.timestamp}</span>
        </div>
        <div className="post-options">•••</div>
      </div>

      <img src={post.image} alt="Post content" className="post-image" />

      <div className="post-actions">
        <div className="action-icons">
          <span className="action-icon" onClick={toggleLike}>
            {liked ? '❤️' : '🤍'}
          </span>
          <span className="action-icon">💬</span>
          <span className="action-icon">✈️</span>
        </div>
        <span className="action-icon">🔖</span>
      </div>

      <div className="post-likes">
        {likesCount} likes
      </div>

      <div className="post-caption-section">
        <span className="caption-username">{post.user.username}</span>
        <span className="caption-text">{post.caption}</span>
      </div>

      <div className="post-comments-count">
        View all {post.comments} comments
      </div>
      
      <div className="post-add-comment">
        <input type="text" placeholder="Add a comment..." className="comment-input" />
        <button className="post-btn">Post</button>
      </div>
    </div>
  );
};
export default PostCard;

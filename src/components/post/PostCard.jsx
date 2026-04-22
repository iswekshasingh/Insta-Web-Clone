import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './PostCard.css';

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const { user, toggleLike, toggleSave, toggleFollow } = useAuth();
  
  // Safe derivations from Context
  const isLiked = useMemo(() => user?.likedPosts?.some(p => typeof p === 'string' ? p === post.id : p.id === post.id), [user, post.id]);
  const isSaved = useMemo(() => user?.savedPosts?.some(p => p.id === post.id), [user, post.id]);
  const isFollowing = useMemo(() => user?.following?.includes(post.user.username), [user, post.user.username]);

  // Derived counts
  const likesCount = isLiked ? post.likes + 1 : post.likes;

  const handleLike = () => toggleLike(post);
  const handleSave = () => toggleSave(post);
  const handleFollow = () => toggleFollow(post.user.username);

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-user-info" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={post.user.avatar} alt={post.user.username} className="post-avatar" onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }} />
          <span className="post-username" onClick={() => navigate('/profile')} style={{ cursor: 'pointer', margin: '0 5px' }}>{post.user.username}</span>
          <span className="post-time" style={{ color: '#a8a8a8' }}>• {post.timestamp}</span>
          {user?.username !== post.user.username && (
             <span className="follow-action" onClick={handleFollow} style={{ color: isFollowing ? '#fff' : '#0095f6', fontWeight: 'bold', cursor: 'pointer', marginLeft: '10px' }}>
                • {isFollowing ? 'Following' : 'Follow'}
             </span>
          )}
        </div>
        <div className="post-options">•••</div>
      </div>

      <img src={post.image} alt="Post content" className="post-image" />

      <div className="post-actions">
        <div className="action-icons">
          <span className="action-icon" onClick={handleLike} style={{ cursor: 'pointer', display: 'inline-block', fontSize: '24px' }}>
            {isLiked ? '❤️' : '🤍'}
          </span>
          <span className="action-icon">💬</span>
          <span className="action-icon">✈️</span>
        </div>
        <span className="action-icon" onClick={handleSave} style={{ cursor: 'pointer', fontSize: '24px' }}>
          {isSaved ? '💾' : '🔖'}
        </span>
      </div>

      <div className="post-likes">
        {likesCount.toLocaleString()} likes
      </div>

      <div className="post-caption-section">
        <span className="caption-username" onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>{post.user.username}</span>
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

import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './PostCard.css';

const SAMPLE_COMMENTERS = [
  { username: 'luna_vibes',    text: 'Absolutely love this! 😍' },
  { username: 'xander_shots',  text: 'This is incredible 🔥' },
  { username: 'mia.travels',   text: 'Where is this?? Need to go ASAP 🗺️' },
  { username: 'theo_clicks',   text: 'The lighting here is perfect ✨' },
  { username: 'zoe.captures',  text: 'Goals 🙌🙌' },
  { username: 'ravi_explore',  text: 'Amazing shot bro 📸' },
  { username: 'nora_daily',    text: 'So beautiful 💫' },
  { username: 'jake.lens',     text: "Can't stop looking at this 😮" },
  { username: 'priya_art',     text: 'The colors!! 🎨' },
  { username: 'cam.moments',   text: 'Pure perfection 👌' },
];

// Seeded pick so each post always gets the same random comments
const seedComments = (postId, count) => {
  const seed = postId.charCodeAt(0) + postId.length;
  return Array.from({ length: count }, (_, i) => {
    const idx = (seed + i * 7) % SAMPLE_COMMENTERS.length;
    return { id: `seed-${i}`, ...SAMPLE_COMMENTERS[idx] };
  });
};

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const { user, toggleLike, toggleSave, toggleFollow } = useAuth();

  const isLiked     = useMemo(() => user?.likedPosts?.some(p => typeof p === 'string' ? p === post.id : p.id === post.id), [user, post.id]);
  const isSaved     = useMemo(() => user?.savedPosts?.some(p => p.id === post.id), [user, post.id]);
  const isFollowing = useMemo(() => user?.following?.includes(post.user.username), [user, post.user.username]);
  const likesCount  = isLiked ? post.likes + 1 : post.likes;

  const initialComments = useMemo(() => seedComments(post.id, Math.min(post.comments, 4)), [post.id, post.comments]);
  const [comments, setComments]           = useState(initialComments);
  const [commentInput, setCommentInput]   = useState('');
  const [showComments, setShowComments]   = useState(false);

  const handleLike   = () => toggleLike(post);
  const handleSave   = () => toggleSave(post);
  const handleFollow = () => toggleFollow(post.user.username);

  const handlePostComment = () => {
    const trimmed = commentInput.trim();
    if (!trimmed) return;
    const newComment = {
      id: Date.now().toString(),
      username: user?.username || user?.email?.split('@')[0] || 'you',
      text: trimmed,
    };
    setComments(prev => [...prev, newComment]);
    setCommentInput('');
    if (!showComments) setShowComments(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handlePostComment();
  };

  return (
    <div className="post-card">
      {/* Header */}
      <div className="post-header">
        <div className="post-user-info">
          <img src={post.user.avatar} alt={post.user.username} className="post-avatar" onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }} />
          <span className="post-username" onClick={() => navigate('/profile')} style={{ cursor: 'pointer', margin: '0 5px' }}>{post.user.username}</span>
          <span className="post-time" style={{ color: 'var(--text-secondary)' }}>• {post.timestamp}</span>
          {user?.username !== post.user.username && (
            <span className="follow-action" onClick={handleFollow} style={{ color: isFollowing ? 'var(--text-primary)' : 'var(--accent-color)', fontWeight: 'bold', cursor: 'pointer', marginLeft: '10px' }}>
              • {isFollowing ? 'Following' : 'Follow'}
            </span>
          )}
        </div>
        <div className="post-options">•••</div>
      </div>

      {/* Image */}
      <img src={post.image} alt="Post content" className="post-image" />

      {/* Actions */}
      <div className="post-actions">
        <div className="action-icons">
          <span className="action-icon" onClick={handleLike} style={{ cursor: 'pointer', display: 'inline-block', fontSize: '24px' }}>
            {isLiked ? '❤️' : '🤍'}
          </span>
          <span
            className="action-icon"
            style={{ cursor: 'pointer', fontSize: '24px' }}
            onClick={() => setShowComments(prev => !prev)}
          >💬</span>
          <span className="action-icon">✈️</span>
        </div>
        <span className="action-icon" onClick={handleSave} style={{ cursor: 'pointer', fontSize: '24px' }}>
          {isSaved ? '💾' : '🔖'}
        </span>
      </div>

      {/* Likes */}
      <div className="post-likes">{likesCount.toLocaleString()} likes</div>

      {/* Caption */}
      <div className="post-caption-section">
        <span className="caption-username" onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>{post.user.username}</span>
        <span className="caption-text">{post.caption}</span>
      </div>

      {/* View all comments toggle */}
      <div className="post-comments-count" onClick={() => setShowComments(prev => !prev)}>
        {showComments ? 'Hide comments' : `View all ${comments.length} comments`}
      </div>

      {/* Comments panel */}
      {showComments && (
        <div className="comments-panel">
          {comments.map(c => (
            <div key={c.id} className="comment-row">
              <span className="comment-author">{c.username}</span>
              <span className="comment-text">{c.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* Add comment */}
      <div className="post-add-comment">
        <input
          type="text"
          placeholder="Add a comment..."
          className="comment-input"
          value={commentInput}
          onChange={e => setCommentInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="post-btn"
          onClick={handlePostComment}
          disabled={!commentInput.trim()}
          style={{ opacity: commentInput.trim() ? 1 : 0.4 }}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default PostCard;

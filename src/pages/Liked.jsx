import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import PostCard from '../components/post/PostCard';
import { useAuth } from '../context/AuthContext';
import './Home.css'; // Reusing Home styles for the layout

const Liked = () => {
  const { user } = useAuth();
  const likedPosts = user?.likedPosts || [];

  // Filter out any legacy string IDs just in case
  const validLikedPosts = likedPosts.filter(p => typeof p !== 'string');

  return (
    <div className="home-container">
      <Sidebar />
      <main className="home-main-content">
        <div className="feed-section" style={{ margin: '0 auto', width: '100%', maxWidth: '600px' }}>
          <h2 style={{ padding: '20px', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)' }}>Liked Posts</h2>
          <div className="posts-list">
            {validLikedPosts.length === 0 ? (
              <p style={{textAlign: 'center', margin: '40px', color: 'var(--text-secondary)'}}>No liked posts yet.</p>
            ) : (
              validLikedPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Liked;

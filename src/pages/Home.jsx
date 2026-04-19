import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import StoryBar from '../components/story/StoryBar';
import PostCard from '../components/post/PostCard';
import Suggestions from '../components/suggestions/Suggestions';
import { feedService } from '../services/feedService';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const fetchedPosts = await feedService.fetchPosts(10, 1);
      setPosts(fetchedPosts);
      setLoading(false);
    };
    loadPosts();
  }, []);

  return (
    <div className="home-container">
      <Sidebar />
      <main className="home-main-content">
        <div className="feed-section">
          <StoryBar />
          <div className="posts-list">
            {loading ? (
              <p style={{textAlign: 'center', margin: '20px', color: '#a8a8a8'}}>Loading dynamic feed...</p>
            ) : (
              posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))
            )}
          </div>
        </div>
        <div className="right-sidebar-section">
          <Suggestions />
        </div>
      </main>
    </div>
  );
};

export default Home;

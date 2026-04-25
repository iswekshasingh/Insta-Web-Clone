import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import StoryBar from '../components/story/StoryBar';
import PostCard from '../components/post/PostCard';
import Suggestions from '../components/suggestions/Suggestions';
import { feedService } from '../services/feedService';
import './Home.css';

const Home = () => {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSearch, setShowSearch] = useState(location.state?.openSearch || false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const fetchedPosts = await feedService.fetchPosts(30, 1);
      setPosts(fetchedPosts);
      setLoading(false);
    };
    loadPosts();
  }, []);

  const displayedPosts = useMemo(() => {
    if (!searchQuery) return posts;
    const lowerQuery = searchQuery.toLowerCase();
    
    const matching = [];
    const nonMatching = [];
    
    posts.forEach(post => {
      if (post.user.username.toLowerCase().includes(lowerQuery)) {
        matching.push(post);
      } else {
        nonMatching.push(post);
      }
    });
    
    return [...matching, ...nonMatching];
  }, [posts, searchQuery]);

  return (
    <div className="home-container">
      <Sidebar collapsed={true} onSearchClick={() => setShowSearch(prev => !prev)} />
      <main className="home-main-content">
        <div className="feed-section">
          {showSearch && (
            <div className="home-search-bar">
              <span className="material-symbols-outlined search-icon">search</span>
              <input 
                type="text" 
                placeholder="Search usernames..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="home-search-input"
                autoFocus
              />
            </div>
          )}
          <StoryBar />
          <div className="posts-list">
            {loading ? (
              <p style={{textAlign: 'center', margin: '20px', color: '#a8a8a8'}}>Loading dynamic feed...</p>
            ) : (
              displayedPosts.map(post => (
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

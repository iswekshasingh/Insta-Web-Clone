import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import StoryBar from '../components/story/StoryBar';
import PostCard from '../components/post/PostCard';
import Suggestions from '../components/suggestions/Suggestions';
import { POSTS } from '../data/dummyData';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <Sidebar />
      <main className="home-main-content">
        <div className="feed-section">
          <StoryBar />
          <div className="posts-list">
            {POSTS.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
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

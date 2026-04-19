import React, { useMemo, useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfilePosts from '../components/profile/ProfilePosts';
import { CURRENT_USER_PROFILE } from '../data/dummyData';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('POSTS');
  
  const displayProfile = useMemo(() => {
    return {
      ...CURRENT_USER_PROFILE,
      ...user, 
      following: user?.following?.length || 0, // dynamic following count
      postsCount: CURRENT_USER_PROFILE.posts.length
    };
  }, [user]);

  // Which posts to render
  const gridPosts = activeTab === 'SAVED' ? (user?.savedPosts || []) : CURRENT_USER_PROFILE.posts;

  return (
    <div className="profile-page-container">
      <Sidebar />
      <main className="profile-main-content">
        <div className="profile-content-wrapper">
          <ProfileHeader profile={displayProfile} />
          
          <div className="profile-tabs">
            <div className={`tab ${activeTab === 'POSTS' ? 'active' : ''}`} onClick={() => setActiveTab('POSTS')}>
              <span className="tab-icon material-symbols-outlined">grid_on</span> POSTS
            </div>
            <div className={`tab ${activeTab === 'SAVED' ? 'active' : ''}`} onClick={() => setActiveTab('SAVED')}>
              <span className="tab-icon material-symbols-outlined">bookmark</span> SAVED
            </div>
            <div className="tab">
               TAGGED
            </div>
          </div>
          
          {gridPosts.length > 0 ? (
            <ProfilePosts posts={gridPosts} />
          ) : (
            <div style={{ textAlign: 'center', marginTop: '40px', color: '#a8a8a8' }}>
              <h2>No {activeTab} posts yet</h2>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;

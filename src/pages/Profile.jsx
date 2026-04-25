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
      // Start with dummy data as a base (for posts grid etc.)
      ...CURRENT_USER_PROFILE,
      // Override everything with the real logged-in user's data
      username:   user?.username   || CURRENT_USER_PROFILE.username,
      avatar:     user?.avatar     || CURRENT_USER_PROFILE.avatar,
      bio:        user?.bio        || CURRENT_USER_PROFILE.bio,
      followers:  user?.followers  ?? CURRENT_USER_PROFILE.followers,
      following:  user?.following?.length ?? CURRENT_USER_PROFILE.following,
      postsCount: CURRENT_USER_PROFILE.posts.length,
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

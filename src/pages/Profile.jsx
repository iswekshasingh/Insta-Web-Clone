import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfilePosts from '../components/profile/ProfilePosts';
import { CURRENT_USER_PROFILE } from '../data/dummyData';
import './Profile.css';

const Profile = () => {
  return (
    <div className="profile-page-container">
      <Sidebar />
      <main className="profile-main-content">
        <div className="profile-content-wrapper">
          <ProfileHeader profile={CURRENT_USER_PROFILE} />
          
          <div className="profile-tabs">
            <div className="tab active">
              <span className="tab-icon material-symbols-outlined">grid_on</span> POSTS
            </div>
            <div className="tab">
               SAVED
            </div>
            <div className="tab">
               TAGGED
            </div>
          </div>
          
          <ProfilePosts posts={CURRENT_USER_PROFILE.posts} />
        </div>
      </main>
    </div>
  );
};

export default Profile;

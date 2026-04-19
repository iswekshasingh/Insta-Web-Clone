import React, { useMemo } from 'react';
import Sidebar from '../components/layout/Sidebar';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfilePosts from '../components/profile/ProfilePosts';
import { CURRENT_USER_PROFILE } from '../data/dummyData';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  
  const displayProfile = useMemo(() => {
    return {
      ...CURRENT_USER_PROFILE,
      ...user, // overrides with custom username, bio, avatar
      postsCount: CURRENT_USER_PROFILE.posts.length
    };
  }, [user]);

  return (
    <div className="profile-page-container">
      <Sidebar />
      <main className="profile-main-content">
        <div className="profile-content-wrapper">
          <ProfileHeader profile={displayProfile} />
          
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

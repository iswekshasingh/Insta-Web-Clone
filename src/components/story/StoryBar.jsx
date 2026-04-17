import React from 'react';
import { STORIES } from '../../data/dummyData';
import './StoryBar.css';

const StoryBar = () => {
  return (
    <div className="story-bar">
      {STORIES.map(story => (
        <div key={story.id} className="story-item">
          <div className={`story-ring ${story.viewed ? 'viewed' : ''}`}>
            <img src={story.avatar} alt={story.username} className="story-avatar" />
          </div>
          <span className="story-username">{story.username.substring(0, 10)}</span>
        </div>
      ))}
    </div>
  );
};
export default StoryBar;

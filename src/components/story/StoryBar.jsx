import React, { useState } from 'react';
import { STORIES } from '../../data/dummyData';
import { useAuth } from '../../context/AuthContext';
import './StoryBar.css';

const StoryBar = () => {
  const { user } = useAuth();
  
  // Use a default avatar if user doesn't have one
  const userAvatar = user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150';

  const [myNote, setMyNote] = useState('');
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [tempNote, setTempNote] = useState('');

  const handleNoteSubmit = (e) => {
    if (e.key === 'Enter') {
      setMyNote(tempNote);
      setIsEditingNote(false);
    }
  };

  return (
    <div className="story-bar">
      <div className="story-item my-story">
        <div className="story-ring-container">
          {isEditingNote ? (
            <div className="story-note-bubble editing">
              <input 
                 autoFocus
                 type="text" 
                 value={tempNote} 
                 onChange={e => setTempNote(e.target.value)} 
                 onKeyDown={handleNoteSubmit}
                 onBlur={() => { setMyNote(tempNote); setIsEditingNote(false); }}
                 placeholder="Share a thought..." 
                 maxLength={60}
              />
            </div>
          ) : (
            <div className="story-note-bubble" onClick={() => { setIsEditingNote(true); setTempNote(myNote); }}>
              {myNote || "Note..."}
            </div>
          )}
          <img src={userAvatar} alt="Your Story" className="story-avatar" />
          <div className="add-story-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="12px" height="12px">
              <path d="M12 4V20M4 12H20" stroke="white" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        <span className="story-username" style={{ color: '#8e8e8e' }}>Your Story</span>
      </div>
      {STORIES.map(story => (
        <div key={story.id} className="story-item">
          <div className="story-ring-container">
            {story.note && <div className="story-note-bubble">{story.note}</div>}
            <div className={`story-ring ${story.viewed ? 'viewed' : ''}`}>
              <img src={story.avatar} alt={story.username} className="story-avatar" />
            </div>
          </div>
          <span className="story-username">{story.username.substring(0, 10)}</span>
        </div>
      ))}
    </div>
  );
};
export default StoryBar;

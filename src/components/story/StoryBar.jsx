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
  const [activeNote, setActiveNote] = useState(null); // { text, avatar, username }

  const handleNoteSubmit = (e) => {
    if (e.key === 'Enter') {
      setMyNote(tempNote);
      setIsEditingNote(false);
    }
  };

  return (
    <div className="story-bar-wrapper" style={{ position: 'relative' }}>
      <div className="story-bar" id="story-scroll-container">
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
            <div
              className="story-note-bubble"
              onClick={(e) => {
                if (myNote) {
                  e.stopPropagation();
                  setActiveNote({ text: myNote, avatar: userAvatar, username: user?.username || 'You' });
                } else {
                  setIsEditingNote(true);
                  setTempNote(myNote);
                }
              }}
              onDoubleClick={() => { setIsEditingNote(true); setTempNote(myNote); }}
              title={myNote ? 'Click to view • Double-click to edit' : 'Click to add a note'}
            >
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
            {story.note && (
              <div
                className="story-note-bubble clickable-note"
                onClick={(e) => { e.stopPropagation(); setActiveNote({ text: story.note, avatar: story.avatar, username: story.username }); }}
                title="Click to read full note"
              >
                {story.note}
              </div>
            )}
            <div className={`story-ring ${story.viewed ? 'viewed' : ''}`}>
              <img src={story.avatar} alt={story.username} className="story-avatar" />
            </div>
          </div>
          <span className="story-username">{story.username.substring(0, 10)}</span>
        </div>
      ))}
      </div>
      <button className="story-scroll-btn right" onClick={() => {
        const container = document.getElementById('story-scroll-container');
        if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
          <path d="M9.59 16.59L14.17 12 9.59 7.41L11 6l6 6-6 6z"/>
        </svg>
      </button>

      {/* Note Modal */}
      {activeNote && (
        <div className="note-modal-overlay" onClick={() => setActiveNote(null)}>
          <div className="note-modal" onClick={(e) => e.stopPropagation()}>
            <img src={activeNote.avatar} alt={activeNote.username} className="note-modal-avatar" />
            <p className="note-modal-username">{activeNote.username}</p>
            <div className="note-modal-text">{activeNote.text}</div>
            <button className="note-modal-close" onClick={() => setActiveNote(null)}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default StoryBar;

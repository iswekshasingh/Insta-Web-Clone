import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import './Messages.css';

const DUMMY_MESSAGES = [
  { id: 1, name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/150?u=alex', lastMessage: 'You: 😂😂 · 1h' },
  { id: 2, name: 'Samantha Lee', avatar: 'https://i.pravatar.cc/150?u=samantha', lastMessage: 'Reacted 😂 to your message · 2h' },
  { id: 3, name: 'David Smith', avatar: 'https://i.pravatar.cc/150?u=david', lastMessage: 'You sent an attachment. · 3h' },
  { id: 4, name: 'Emily Chen', avatar: 'https://i.pravatar.cc/150?u=emily', lastMessage: 'You: Definitely! Let\'s do it. · 3h' },
  { id: 5, name: 'Michael Brown', avatar: 'https://i.pravatar.cc/150?u=michael', lastMessage: 'You sent an attachment. · 4h' },
  { id: 6, name: 'Jessica Davis', avatar: 'https://i.pravatar.cc/150?u=jessica', lastMessage: 'You sent an attachment. · 4h' },
  { id: 7, name: 'James Wilson', avatar: 'https://i.pravatar.cc/150?u=james', lastMessage: 'You: Sounds like a plan! · 4h' },
  { id: 8, name: 'Olivia Martin', avatar: 'https://i.pravatar.cc/150?u=olivia', lastMessage: 'Hey, are we still meeting up? · 5h' },
  { id: 9, name: 'Daniel Taylor', avatar: 'https://i.pravatar.cc/150?u=daniel', lastMessage: 'Let me know! · 6h' },
  { id: 10, name: 'Sophia Anderson', avatar: 'https://i.pravatar.cc/150?u=sophia', lastMessage: 'See ya! · 12h' }
];

const Messages = () => {
  return (
    <div className="messages-layout">
      <Sidebar collapsed={true} />
      
      <main className="messages-main-content">
        <div className="messages-sidebar">
          <div className="messages-header">
            <h2>ft.kavyaa__ <span className="material-symbols-outlined dropdown-icon">expand_more</span></h2>
            <span className="material-symbols-outlined edit-icon">edit_square</span>
          </div>

          <div className="messages-search">
            <span className="material-symbols-outlined search-icon">search</span>
            <input type="text" placeholder="Search" />
          </div>

          <div className="messages-requests-header">
            <h3>Messages</h3>
            <span className="requests-link">Requests</span>
          </div>

          <div className="messages-list">
            {DUMMY_MESSAGES.map((msg) => (
              <div key={msg.id} className="message-item">
                <img src={msg.avatar} alt={msg.name} className="message-avatar" />
                <div className="message-info">
                  <span className="message-name">{msg.name}</span>
                  <span className="message-preview">{msg.lastMessage}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="messages-chat-area">
          <div className="empty-chat">
            <div className="empty-chat-icon">
              <span className="material-symbols-outlined">send</span>
            </div>
            <h2>Your messages</h2>
            <p>Send private photos and messages to a friend or group.</p>
            <button className="send-message-btn">Send message</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messages;

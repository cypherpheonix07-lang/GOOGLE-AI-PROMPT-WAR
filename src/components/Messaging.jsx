import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../AuthContext';
import { Send, Smile, Paperclip } from 'lucide-react';

const Messaging = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useAuth();
  const scrollRef = useRef();

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    await addDoc(collection(db, 'messages'), {
      text: newMessage,
      senderId: user.uid,
      senderName: user.displayName || 'Team Member',
      timestamp: serverTimestamp()
    });
    setNewMessage('');
  };

  return (
    <div className="glass" style={{ 
      height: 'calc(100vh - 150px)', 
      borderRadius: 'var(--radius-lg)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--glass-border)' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Team General Channel</h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{messages.length} messages</p>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.map((msg, i) => {
          const isMe = msg.senderId === user?.uid;
          const showSender = i === 0 || messages[i-1].senderId !== msg.senderId;

          return (
            <div key={msg.id} style={{ 
              alignSelf: isMe ? 'flex-end' : 'flex-start',
              maxWidth: '70%',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem'
            }}>
              {!isMe && showSender && (
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                  {msg.senderName}
                </span>
              )}
              <div style={{
                background: isMe ? 'var(--primary)' : 'var(--surface-hover)',
                padding: '0.75rem 1rem',
                borderRadius: isMe ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                color: 'white',
                fontSize: '0.925rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                {msg.text}
              </div>
            </div>
          );
        })}
        <div ref={scrollRef} />
      </div>

      <form onSubmit={sendMessage} style={{ padding: '1.5rem', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '1rem' }}>
        <div className="glass" style={{ 
          flex: 1, 
          borderRadius: 'var(--radius-md)', 
          display: 'flex', 
          alignItems: 'center', 
          padding: '0 1rem',
          background: 'rgba(255,255,255,0.03)'
        }}>
          <button type="button" style={{ color: 'var(--text-muted)' }}><Smile size={20} /></button>
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              padding: '0.875rem',
              color: 'white',
              outline: 'none'
            }}
          />
          <button type="button" style={{ color: 'var(--text-muted)' }}><Paperclip size={20} /></button>
        </div>
        <button 
          type="submit" 
          disabled={!newMessage.trim()}
          style={{
            background: 'var(--primary)',
            color: 'white',
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: !newMessage.trim() ? 0.5 : 1
          }}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default Messaging;

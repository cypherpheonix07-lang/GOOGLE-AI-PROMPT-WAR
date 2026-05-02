import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { AuthProvider, useAuth } from './AuthContext';
import Navbar from './components/Navbar';
import KanbanBoard from './components/KanbanBoard';
import Messaging from './components/Messaging';
import AIInsights from './components/AIInsights';
import Auth from './components/Auth';
import { motion, AnimatePresence } from 'framer-motion';

const AppContent = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('tasks');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'tasks'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, [user]);

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="fade-in">Loading TeamSync...</div>
    </div>
  );

  if (!user) return <Auth />;

  return (
    <div style={{ padding: '90px 2rem 2rem' }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <AnimatePresence mode="wait">
          {activeTab === 'tasks' && (
            <motion.div
              key="tasks"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>Task Board</h1>
                <p style={{ color: 'var(--text-muted)' }}>Track and manage your team's workflow</p>
              </div>
              <AIInsights tasks={tasks} />
              <KanbanBoard tasks={tasks} />
            </motion.div>
          )}

          {activeTab === 'messages' && (
            <motion.div
              key="messages"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>Messages</h1>
                <p style={{ color: 'var(--text-muted)' }}>Real-time team communication</p>
              </div>
              <Messaging />
            </motion.div>
          )}

          {activeTab === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="glass"
              style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}
            >
              <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem' }}>Admin Panel</h1>
              <p style={{ color: 'var(--text-muted)' }}>Manage team roles and permissions (Coming soon...)</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

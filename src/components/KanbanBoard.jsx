import React, { useState, useEffect } from 'react';
import { db } from '../firebase';

import { Plus, MoreVertical, Clock, CheckCircle2, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const KanbanBoard = ({ tasks }) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const moveTask = async (taskId, newStatus) => {
    await updateDoc(doc(db, 'tasks', taskId), { status: newStatus });
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    await addDoc(collection(db, 'tasks'), {
      title: newTaskTitle,
      status: 'To Do',
      createdAt: serverTimestamp(),
      priority: 'Medium'
    });
    setNewTaskTitle('');
    setIsAddingTask(false);
  };

  const columns = [
    { id: 'To Do', icon: <Clock size={18} color="#94a3b8" /> },
    { id: 'In Progress', icon: <PlayCircle size={18} color="#2563eb" /> },
    { id: 'Done', icon: <CheckCircle2 size={18} color="#10b981" /> }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', height: 'calc(100vh - 150px)' }}>
      {columns.map(column => (
        <div key={column.id} className="glass" style={{ 
          borderRadius: 'var(--radius-lg)', 
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          minWidth: '300px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {column.icon}
              <h2 style={{ fontSize: '1rem', fontWeight: 600 }}>{column.id}</h2>
              <span style={{ 
                background: 'rgba(255,255,255,0.05)', 
                padding: '2px 8px', 
                borderRadius: '10px', 
                fontSize: '0.75rem',
                color: 'var(--text-muted)'
              }}>
                {tasks.filter(t => t.status === column.id).length}
              </span>
            </div>
            {column.id === 'To Do' && (
              <button onClick={() => setIsAddingTask(true)} style={{ color: 'var(--text-muted)' }}>
                <Plus size={20} />
              </button>
            )}
          </div>

          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {column.id === 'To Do' && isAddingTask && (
              <form onSubmit={addTask} className="card fade-in" style={{ padding: '1rem' }}>
                <input
                  autoFocus
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Task title..."
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    outline: 'none',
                    marginBottom: '0.5rem'
                  }}
                />
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => setIsAddingTask(false)} style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cancel</button>
                  <button type="submit" style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>Add</button>
                </div>
              </form>
            )}

            <AnimatePresence>
              {tasks
                .filter(t => t.status === column.id)
                .map(task => (
                  <motion.div
                    key={task.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="card"
                    style={{ padding: '1rem', cursor: 'grab' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ 
                        fontSize: '0.625rem', 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.05em',
                        color: task.priority === 'High' ? 'var(--error)' : 'var(--text-muted)'
                      }}>
                        {task.priority || 'Medium'} Priority
                      </span>
                      <MoreVertical size={14} color="#64748b" />
                    </div>
                    <h3 style={{ fontSize: '0.925rem', fontWeight: 500, marginBottom: '1rem' }}>{task.title}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', WebkitMaskImage: 'linear-gradient(to right, black 80%, transparent)' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary)', border: '2px solid var(--surface)' }} />
                      </div>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        {column.id !== 'To Do' && (
                          <button onClick={() => moveTask(task.id, 'To Do')} style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Back</button>
                        )}
                        {column.id !== 'Done' && (
                          <button 
                            onClick={() => moveTask(task.id, column.id === 'To Do' ? 'In Progress' : 'Done')} 
                            style={{ 
                              fontSize: '0.7rem', 
                              color: 'var(--primary)',
                              fontWeight: 600
                            }}
                          >
                            {column.id === 'To Do' ? 'Start' : 'Finish'}
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;

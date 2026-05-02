import React from 'react';
import { useAuth } from '../AuthContext';
import { Layout, MessageSquare, Shield, LogOut, User } from 'lucide-react';
import { auth } from '../firebase';

const Navbar = ({ activeTab, setActiveTab }) => {
  const { user, role } = useAuth();

  return (
    <nav className="glass" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      zIndex: 1000,
      borderBottom: '1px solid var(--glass-border)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          background: 'var(--primary)',
          padding: '0.5rem',
          borderRadius: 'var(--radius-sm)',
          display: 'flex'
        }}>
          <Layout size={24} color="white" />
        </div>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.025em' }}>TeamSync</h1>
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <NavItem 
          active={activeTab === 'tasks'} 
          onClick={() => setActiveTab('tasks')}
          icon={<Layout size={20} />}
          label="Tasks"
        />
        <NavItem 
          active={activeTab === 'messages'} 
          onClick={() => setActiveTab('messages')}
          icon={<MessageSquare size={20} />}
          label="Messages"
        />
        {role === 'Admin' && (
          <NavItem 
            active={activeTab === 'admin'} 
            onClick={() => setActiveTab('admin')}
            icon={<Shield size={20} />}
            label="Admin"
          />
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ textAlign: 'right', display: 'none' }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{user?.displayName}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{role}</div>
        </div>
        <button 
          onClick={() => auth.signOut()}
          className="glass"
          style={{
            padding: '0.5rem',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            color: 'var(--text-muted)'
          }}
          aria-label="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  );
};

const NavItem = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      borderRadius: 'var(--radius-sm)',
      color: active ? 'var(--text)' : 'var(--text-muted)',
      background: active ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
      fontWeight: 500,
      fontSize: '0.925rem'
    }}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default Navbar;

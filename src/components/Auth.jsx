import React, { useState } from 'react';
import { auth, db } from '../firebase';


import { Mail, Lock, User, Globe, Shield } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        // Initial user role in Firestore
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          displayName: name,
          email,
          role: 'Member',
          createdAt: new Date().toISOString()
        });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at top left, #1e293b, #0f172a)',
      padding: '1rem'
    }}>
      <div className="glass fade-in" style={{
        width: '100%',
        maxWidth: '400px',
        padding: '2.5rem',
        borderRadius: 'var(--radius-lg)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>TeamSync</h1>
          <p style={{ color: 'var(--text-muted)' }}>{isLogin ? 'Welcome back, team!' : 'Create your account'}</p>
        </div>

        {error && (
          <div style={{ 
            background: 'rgba(239, 68, 68, 0.1)', 
            color: 'var(--error)', 
            padding: '0.75rem', 
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.875rem',
            marginBottom: '1.5rem',
            border: '1px solid rgba(239, 68, 68, 0.2)'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {!isLogin && (
            <div className="glass" style={{ borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', padding: '0 1rem' }}>
              <User size={18} color="var(--text-muted)" />
              <input
                type="text"
                placeholder="Full Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ background: 'transparent', border: 'none', padding: '1rem', color: 'white', outline: 'none', flex: 1 }}
              />
            </div>
          )}
          <div className="glass" style={{ borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', padding: '0 1rem' }}>
            <Mail size={18} color="var(--text-muted)" />
            <input
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ background: 'transparent', border: 'none', padding: '1rem', color: 'white', outline: 'none', flex: 1 }}
            />
          </div>
          <div className="glass" style={{ borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', padding: '0 1rem' }}>
            <Lock size={18} color="var(--text-muted)" />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ background: 'transparent', border: 'none', padding: '1rem', color: 'white', outline: 'none', flex: 1 }}
            />
          </div>

          <button type="submit" style={{
            background: 'var(--primary)',
            color: 'white',
            padding: '1rem',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 600,
            fontSize: '1rem',
            marginTop: '0.5rem',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
          }}>
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div style={{ margin: '2rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }} />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>OR CONTINUE WITH</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }} />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="glass" style={{ flex: 1, padding: '0.75rem', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'center' }}>
            <Shield size={20} color="var(--text-muted)" />
          </button>
          <button className="glass" style={{ flex: 1, padding: '0.75rem', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'center' }}>
            <Globe size={20} color="var(--text-muted)" />
          </button>
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button 
            onClick={() => setIsLogin(!isLogin)}
            style={{ background: 'transparent', color: 'var(--primary)', fontSize: '0.875rem', fontWeight: 500 }}
          >
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;

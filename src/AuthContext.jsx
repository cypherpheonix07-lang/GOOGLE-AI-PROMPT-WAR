import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState('Member');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        // Fetch or create user profile in Firestore
        const userDoc = await getDoc(doc(db, 'users', authUser.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role || 'Member');
        } else {
          // Default role for new users
          const defaultRole = 'Member';
          await setDoc(doc(db, 'users', authUser.uid), {
            email: authUser.email,
            role: defaultRole,
            displayName: authUser.displayName || 'Anonymous',
            createdAt: new Date().toISOString()
          });
          setRole(defaultRole);
        }
        setUser(authUser);
      } else {
        setUser(null);
        setRole('Member');
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    role,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

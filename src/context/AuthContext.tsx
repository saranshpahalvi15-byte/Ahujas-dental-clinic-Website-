import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  authError: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AUTHORIZED_ADMIN_EMAIL = 'gridandgift@gmail.com';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Strict check: only gridandgift@gmail.com is granted admin rights
  const isAdmin = Boolean(
    user && user.email && user.email.trim().toLowerCase() === AUTHORIZED_ADMIN_EMAIL.toLowerCase()
  );

  const loginWithGoogle = async () => {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: unknown) {
      console.error('Login error:', err);
      const message = err instanceof Error ? err.message : 'Google sign-in failed.';
      setAuthError(message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err: unknown) {
      console.error('Logout error:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, loginWithGoogle, logout, authError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

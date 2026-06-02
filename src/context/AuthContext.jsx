import { createContext, useContext, useState, useEffect } from 'react';
import { emailAPI } from '../services/api';

const AuthContext = createContext(null);

const USERS_KEY   = 'fashion_users';
const SESSION_KEY = 'fashion_session';

const getUsers   = () => { try { return JSON.parse(localStorage.getItem(USERS_KEY))   || []; } catch { return []; } };
const getSession = () => { try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || null; } catch { return null; } };
const saveUsers  = (u) => localStorage.setItem(USERS_KEY, JSON.stringify(u));

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    const checkAuth = () => {
      // Create demo user if it doesn't exist
      const users = getUsers();
      const demoUser = users.find(u => u.email === 'demo@fashion.com');
      if (!demoUser) {
        const newDemoUser = {
          id: 999999,
          firstName: 'Demo',
          lastName: 'User',
          email: 'demo@fashion.com',
          password: 'demo123',
          phone: '+91 98765 43210',
          city: 'Mumbai',
          createdAt: new Date().toISOString()
        };
        saveUsers([...users, newDemoUser]);
      }
      
      const session = getSession();
      if (session) {
        setUser(session);
      }
      setLoading(false);
    };

    // Simulate a brief loading time for better UX
    setTimeout(checkAuth, 800);
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    else localStorage.removeItem(SESSION_KEY);
  }, [user]);

  const signup = ({ firstName, lastName, email, password }) => {
    const users = getUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase()))
      return { ok: false, error: 'An account with this email already exists.' };
    const newUser = { id: Date.now(), firstName, lastName, email, password, createdAt: new Date().toISOString() };
    saveUsers([...users, newUser]);
    const { password: _p, ...safe } = newUser;
    setUser(safe);
    
    // Send welcome email
    emailAPI.sendSignupEmail(firstName, email);
    
    return { ok: true };
  };

  const login = ({ email, password }) => {
    const found = getUsers().find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) return { ok: false, error: 'Invalid email or password.' };
    const { password: _p, ...safe } = found;
    setUser(safe);
    
    // Send login alert email
    emailAPI.sendLoginEmail(safe.firstName, safe.email);
    
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
    // Clear user-specific data
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('cart_') || key.startsWith('wishlist_')) {
        localStorage.removeItem(key);
      }
    });
  };

  const updateProfile = (updates) => {
    const users = getUsers();
    saveUsers(users.map(u => u.id === user.id ? { ...u, ...updates } : u));
    setUser(prev => ({ ...prev, ...updates }));
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() { return useContext(AuthContext); }

import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, setToken, getToken } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      if (!getToken()) {
        setLoading(false);
        return;
      }
      try {
        const { user: me } = await authAPI.me();
        setUser(me);
      } catch {
        setToken(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const handleAuthSuccess = (data) => {
    setToken(data.token);
    setUser(data.user);
    return { ok: true };
  };

  const signup = async (body) => {
    try {
      const data = await authAPI.signup(body);
      return handleAuthSuccess(data);
    } catch (err) {
      return { ok: false, error: err.message };
    }
  };

  const login = async (body) => {
    try {
      const data = await authAPI.login(body);
      return handleAuthSuccess(data);
    } catch (err) {
      return { ok: false, error: err.message };
    }
  };

  const signInWithDemo = async () => {
    try {
      const data = await authAPI.demo();
      return handleAuthSuccess(data);
    } catch (err) {
      return { ok: false, error: err.message };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const data = await authAPI.google();
      return handleAuthSuccess(data);
    } catch (err) {
      return { ok: false, error: err.message };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const updateProfile = async (updates) => {
    try {
      const { user: updated } = await authAPI.updateProfile(updates);
      setUser(updated);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, signInWithDemo, signInWithGoogle, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() { return useContext(AuthContext); }

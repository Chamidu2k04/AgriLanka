import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

/**
 * ===============================================================
 * AUTH CONTEXT (Assigned to: Member A - Auth & Role Management)
 * ===============================================================
 * Purpose: Global state for logged-in user and JWT session.
 * 
 * Member A Tasks:
 * 1. Initialize user and token from localStorage on page load.
 * 2. Implement login(phone, password) calling POST /api/auth/login.
 * 3. Implement register(userData) calling POST /api/auth/register.
 * 4. Implement logout() clearing localStorage and state.
 * 5. Provide easy access via useAuth() hook.
 * ===============================================================
 */

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Safely initialize user from localStorage on load
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('agri_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      console.error('Failed to parse agri_user from localStorage:', e);
      return null;
    }
  });

  // Initialize JWT token from localStorage on load
  const [token, setToken] = useState(() => {
    return localStorage.getItem('agri_token') || null;
  });

  const [loading, setLoading] = useState(false);

  // Authenticate user with phone & password
  const login = async (phone, password) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { phone, password });
      if (res && res.token && res.user) {
        setUser(res.user);
        setToken(res.token);
        localStorage.setItem('agri_token', res.token);
        localStorage.setItem('agri_user', JSON.stringify(res.user));
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  // Register a new Farmer or Buyer
  const register = async (userData) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/register', userData);
      if (res && res.token && res.user) {
        setUser(res.user);
        setToken(res.token);
        localStorage.setItem('agri_token', res.token);
        localStorage.setItem('agri_user', JSON.stringify(res.user));
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('agri_token');
    localStorage.removeItem('agri_user');
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

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
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('agri_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('agri_token') || null;
  });

  const [loading, setLoading] = useState(false);

  // TODO: Member A - Implement login function
  const login = async (phone, password) => {
    setLoading(true);
    try {
      // Example call:
      // const res = await api.post('/auth/login', { phone, password });
      // setUser(res.user);
      // setToken(res.token);
      // localStorage.setItem('agri_token', res.token);
      // localStorage.setItem('agri_user', JSON.stringify(res.user));
      console.log('Member A TODO: login() with:', { phone, password });
      throw new Error('login() is not yet implemented by Member A');
    } finally {
      setLoading(false);
    }
  };

  // TODO: Member A - Implement register function
  const register = async (userData) => {
    setLoading(true);
    try {
      // Example call:
      // const res = await api.post('/auth/register', userData);
      // setUser(res.user);
      // setToken(res.token);
      // localStorage.setItem('agri_token', res.token);
      // localStorage.setItem('agri_user', JSON.stringify(res.user));
      console.log('Member A TODO: register() with:', userData);
      throw new Error('register() is not yet implemented by Member A');
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

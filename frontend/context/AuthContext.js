'use client';

import React, { createContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('token');

      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await authAPI.getMe();
        setUser(response.data.data.user);
      } catch (error) {
        console.error('Auth check failed:', error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, []); // ← runs ONCE on mount, reads token directly

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      const { user, token } = response.data.data;
      localStorage.setItem('token', token);
      setUser(user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const signup = async (userData) => {
    try {
      const response = await authAPI.signup(userData);
      const { user, token } = response.data.data;
      localStorage.setItem('token', token);
      setUser(user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Signup failed'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isTenant: user?.accountType === 'tenant',
    isOwner: user?.accountType === 'owner',
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
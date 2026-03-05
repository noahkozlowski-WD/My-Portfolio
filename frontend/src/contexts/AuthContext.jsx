import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('admin_token'));

  useEffect(() => {
    verifyToken();
  }, []);

  const verifyToken = async () => {
    const storedToken = localStorage.getItem('admin_token');
    if (!storedToken) {
      setIsLoading(false);
      return;
    }

    try {
      await axios.get(`${API}/admin/verify`, {
        headers: { Authorization: `Bearer ${storedToken}` }
      });
      setIsAuthenticated(true);
      setToken(storedToken);
    } catch (error) {
      localStorage.removeItem('admin_token');
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API}/admin/login`, {
        username,
        password
      });
      const { token } = response.data;
      localStorage.setItem('admin_token', token);
      setToken(token);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || 'Login failed' };
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API}/admin/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
    localStorage.removeItem('admin_token');
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

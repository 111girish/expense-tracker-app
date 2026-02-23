import { createContext, useState, useEffect } from 'react';
import { login as loginAPI, signup as signupAPI } from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const data = await loginAPI({ username, password });
      localStorage.setItem('token', data.access);
      
      // Store user info
      const userInfo = { username };
      localStorage.setItem('user', JSON.stringify(userInfo));
      setUser(userInfo);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Login failed' 
      };
    }
  };

  const signup = async (username, email, password) => {
    try {
      await signupAPI({ username, email, password });
      // After signup, automatically login
      return await login(username, password);
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.username?.[0] || 'Signup failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
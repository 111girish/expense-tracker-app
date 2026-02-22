import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/';

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
});

// Add token to every request
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const signup = async (userData) => {
  const response = await axios.post(`${API_URL}signup/`, userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}login/`, credentials);
  return response.data;
};

// Expense APIs
export const getExpenses = async () => {
  const response = await api.get('expenses/');
  return response.data;
};

export const createExpense = async (expenseData) => {
  const response = await api.post('expenses/', expenseData);
  return response.data;
};

export const updateExpense = async (id, expenseData) => {
  const response = await api.put(`expenses/${id}/`, expenseData);
  return response.data;
};

export const deleteExpense = async (id) => {
  await api.delete(`expenses/${id}/`);
};
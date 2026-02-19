import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/expenses/';

//Get all expenses
export const getExpenses = async () => {
  const response = await axios.get(API_URL);
  return response.data;
}

export const createExpense = async (expenseData) => {
  const response = await axios.post(API_URL, expenseData);
  return response.data;
}

export const updateExpense = async (id, expenseData) => {
  const response = await axios.put(`${API_URL}${id}`, expenseData);
  return response.data; 
}

export const deleteExpense = async (id) => {
  const response = await axios.delete(`${API_URL}${id}`);
  return response.data;
}

import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);
  return response.data; // Returns both token and user information
};

export const resetPassword = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/reset-password`, userData);
  return response.data;
};

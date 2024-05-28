// services/trainCenter.js
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const getConfig = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllTrainCenters = async () => {
  try {
    const response = await axios.get(`${API_URL}/train-centre`, getConfig());
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch train centers');
  }
};

export const searchTrainCenterByName = async (name) => {
  try {
    const response = await axios.post(`${API_URL}/train-centre/search`, { name });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to search train center');
  }
};

export const createTrainCenter = async (trainCenterData) => {
  try {
    const response = await axios.post(`${API_URL}/train-centre`, trainCenterData, getConfig());
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create train center');
  }
};

export const updateTrainCenter = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/train-centre/${id}`, updatedData, getConfig());
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update train center');
  }
};

export const deleteTrainCenter = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/train-centre/${id}`, getConfig());
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete train center');
  }
};

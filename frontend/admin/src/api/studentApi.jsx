import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/students';

// Configure axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for potential authentication
api.interceptors.request.use(config => {
  // You can add auth token here if needed
  // const token = localStorage.getItem('token');
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
}, error => {
  return Promise.reject(error);
});

export const fetchStudents = async (department = '', rollNumberPrefix = '') => {
  try {
    const response = await api.get('/filter', {
      params: {
        department,
        rollNumberPrefix
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deactivateStudent = async (email) => {
  try {
    const response = await api.post('/deactivate', null, {
      params: { email }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const bulkDeactivateStudents = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/bulk-deactivate', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const downloadTemplate = async () => {
  try {
    const response = await api.get('/template', {
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
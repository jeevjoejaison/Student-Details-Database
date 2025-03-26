import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/faculties';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchFaculties = async (department = '') => {
  try {
    const response = await api.get('/filter', {
      params: { department }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const fetchDepartments = async () => {
  try {
    // In a real app, you might fetch this from an API endpoint
    return ['Computer Science', 'Electrical', 'Electronics', 'Mechanical'];
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deactivateFaculty = async (facultyId) => {
  try {
    const response = await api.patch(`/${facultyId}/deactivate`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const bulkDeactivateFaculties = async (file) => {
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

export const downloadDeactivationTemplate = async () => {
  try {
    const response = await api.get('/template', {
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
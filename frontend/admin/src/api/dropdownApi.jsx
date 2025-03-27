import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/dropdown';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchDropdownOptions = async (category, dropdownName) => {
  try {
    const response = await api.get('/fetch', {
      params: { category, dropdownName }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addDropdownOption = async (dropdownDTO) => {
  try {
    const response = await api.post('/add', dropdownDTO);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteDropdownOption = async (id) => {
  try {
    const response = await api.delete('/delete', {
      params: { id }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const createShippingAddress = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/shipping`, data);
  return response.data;
};

// Add other API calls as needed

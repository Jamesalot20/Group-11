// src/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // replace with your backend API base URL
});

export default api;

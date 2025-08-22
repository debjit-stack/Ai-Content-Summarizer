import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // 30 seconds timeout for summary generation
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

// API endpoints
export const summaryAPI = {
  // Create a new summary
  createSummary: async (data) => {
    const response = await api.post('/summaries', data);
    return response.data;
  },

  // Get all summaries with pagination
  getSummaries: async (page = 1, limit = 10) => {
    const response = await api.get('/summaries', {
      params: { page, limit }
    });
    return response.data;
  },

  // Get summary by ID
  getSummaryById: async (id) => {
    const response = await api.get(`/summaries/${id}`);
    return response.data;
  },

  // Delete summary
  deleteSummary: async (id) => {
    const response = await api.delete(`/summaries/${id}`);
    return response.data;
  },

  // Search summaries
  searchSummaries: async (query, page = 1, limit = 10) => {
    const response = await api.get('/summaries/search', {
      params: { q: query, page, limit }
    });
    return response.data;
  }
};

export default api;
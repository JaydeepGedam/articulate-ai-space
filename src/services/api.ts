import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Helper function to make API calls
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  // ensure GET requests do not use browser cache which can return 304
  const method = (options.method || 'GET').toString().toUpperCase();
  const fetchOptions: RequestInit = {
    ...options,
    headers,
    // prevent cached GET responses
    ...(method === 'GET' ? { cache: 'no-store' } : {}),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, fetchOptions);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || 'Request failed');
  }
  
  return response.json();
};

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    return apiCall(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  
  signup: async (name: string, email: string, password: string) => {
    return apiCall(API_ENDPOINTS.SIGNUP, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  },
  
  logout: async () => {
    return apiCall(API_ENDPOINTS.LOGOUT, {
      method: 'POST',
    });
  },
};

// Content API
export const contentAPI = {
  generate: async (params: {
    topic: string;
    contentType: string;
    goal: string;
    tone: string;
    mood: number;
  }) => {
    return apiCall(API_ENDPOINTS.GENERATE, {
      method: 'POST',
      body: JSON.stringify(params),
    });
  },
  
  save: async (content: {
    topic: string;
    contentType: string;
    goal: string;
    tone: string;
    mood: number;
    generatedText: string;
  }) => {
    return apiCall(API_ENDPOINTS.SAVE, {
      method: 'POST',
      body: JSON.stringify(content),
    });
  },
  
  list: async () => {
    const data = await apiCall(API_ENDPOINTS.LIST, {
      method: 'GET',
    });
    // backend returns an array for the dashboard; normalize to { contents }
    if (Array.isArray(data)) return { contents: data };
    return data;
  },
  
  delete: async (id: string) => {
    return apiCall(API_ENDPOINTS.DELETE, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
  },
};

// User API
export const userAPI = {
  getPreferences: async () => {
    return apiCall(API_ENDPOINTS.PREFERENCES, {
      method: 'GET',
    });
  },
  
  updatePreferences: async (preferences: {
    defaultTone?: string;
    defaultContentType?: string;
    defaultGoal?: string;
  }) => {
    return apiCall(API_ENDPOINTS.UPDATE_PREFERENCES, {
      method: 'PUT',
      body: JSON.stringify(preferences),
    });
  },
};

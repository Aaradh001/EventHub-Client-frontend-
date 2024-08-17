import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_BACKEND_API_URL;
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID;
export const G_MAP_API_KEY = import.meta.env.VITE_REACT_APP_G_MAP_API_KEY;

export const api = axios.create({
  baseURL: BASE_URL
});

// Function to get token from local storage
const getAccessToken = () => localStorage.getItem('access');
const getRefreshToken = () => localStorage.getItem('refresh');

// Function to set token to local storage
const setAccessToken = (token) => localStorage.setItem('access', token);
const setRefreshToken = (token) => localStorage.setItem('refresh', token);

// Function to refresh tokens
const refreshTokens = async () => {
  const refreshToken = getRefreshToken();
  try {
    const response = await axios.post('/auth/refresh', { token: refreshToken });
    const { accessToken, refreshToken: newRefreshToken } = response.data;
    setAccessToken(accessToken);
    setRefreshToken(newRefreshToken);
    return accessToken;
  } catch (error) {
    // Handle error (e.g., redirect to login)
    return null;
  }
};

// Axios request interceptor
api.interceptors.request.use(async (config) => {
  let token = getAccessToken();
  if (token) {
    const decoded = jwtDecode(token);
    const isExpired = decoded.exp * 1000 < Date.now();
    if (isExpired) {
      token = await refreshTokens();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      } else {
        // Handle token refresh failure (e.g., redirect to login)
      }
    } else {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Axios response interceptor to handle 401 errors
api.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const token = await refreshTokens();
    if (token) {
      originalRequest.headers['Authorization'] = `Bearer ${token}`;
      return api(originalRequest);
    }
  }
  return Promise.reject(error);
});

export default api;

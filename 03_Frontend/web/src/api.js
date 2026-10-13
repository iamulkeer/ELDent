import axios from "axios";

// Docker: nginx "/api" yolunu backend-ə yönləndirir. Lokal inkişaf: REACT_APP_API_URL.
const api = axios.create({ baseURL: process.env.REACT_APP_API_URL || "/api" });

export const TOKEN_KEY = "eldent_token";

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

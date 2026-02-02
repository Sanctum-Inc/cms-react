// axiosConfig.ts
import axios from "axios";

// Create and configure the default axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5158",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      //window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

// Override the default axios instance globally
// This makes the OpenAPI generated client use our configured instance
axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:5158";
axios.defaults.timeout = 10000;

// Add the interceptors to the default axios instance too
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      //window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

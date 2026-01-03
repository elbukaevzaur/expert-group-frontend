import axios from 'axios';
import {loadFromLocalStorage} from "@/lib/storage/localStorageCustom";

const axiosInstance = axios.create({
  baseURL: '/api/proxy',
  // timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = loadFromLocalStorage('authToken');
    if (token && token.accessToken) {
        config.headers.Authorization = token.accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error('API Response Error:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('API Request Error: No response received', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
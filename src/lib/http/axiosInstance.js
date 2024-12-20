import axios from 'axios';
import {loadFromLocalStorage} from "@/lib/storage/localStorageCustom";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = loadFromLocalStorage('authToken');
    if (token) {
        config.headers.Authorization = token.accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
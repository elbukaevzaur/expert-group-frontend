import axiosInstance from './axiosInstance'

export function getAll() {
    return axiosInstance.get('/categories/all');
}
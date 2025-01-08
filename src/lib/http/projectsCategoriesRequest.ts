import axiosInstance from './axiosInstance'

export function getAllProjectsCategories() {
    return axiosInstance.get(`/projects/categories/all`);
}
import axiosInstance from './axiosInstance'

export function getAllFilters(categoryId: number) {
    return axiosInstance.get(`/filters/products?categoryId=${categoryId}`);
}
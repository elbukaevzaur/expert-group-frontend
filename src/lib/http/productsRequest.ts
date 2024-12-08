import axiosInstance from './axiosInstance'

export function getAll(pageRequest: any) {
    return axiosInstance.post('/products/all', pageRequest);
}
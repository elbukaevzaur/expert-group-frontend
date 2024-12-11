import axiosInstance from './axiosInstance'

export function getAll(parentId: number | undefined) {
    const params = parentId !== undefined ? `?parentId=${parentId}` : '';
    return axiosInstance.get(`/categories/all${params}`);
}
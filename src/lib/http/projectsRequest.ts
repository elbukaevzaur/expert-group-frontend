import axiosInstance from './axiosInstance'

export function getAllProjects(categoryId?: number) {
    console.log(categoryId)
    const params = categoryId !== undefined ? `?categoryId=${categoryId}` : '';
    return axiosInstance.get(`/projects/all${params}`);
}
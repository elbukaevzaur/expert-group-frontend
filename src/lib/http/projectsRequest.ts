import axiosInstance from './axiosInstance'

export function getAllProjects(categoryId?: number) {
    const params = categoryId !== undefined ? `?categoryId=${categoryId}` : '';
    return axiosInstance.get(`/projects/all${params}`);
}

export function getProjectDetails(projectId?: number) {
    return axiosInstance.get(`/projects/details?projectId=${projectId}`);
}
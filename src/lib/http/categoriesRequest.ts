import axiosInstance from './axiosInstance'

export function getAll(parentId: number | undefined) {
    const params = parentId !== undefined ? `?parentId=${parentId}` : '';
    return axiosInstance.get(`/categories/all${params}`);
}

export function get(categoryId: number) {
    return axiosInstance.get(`/categories/get?categoryId=${categoryId}`);
}

export function getCategoryById(categoryId: number) {
    return axiosInstance.get(`/categories/get?categoryId=${categoryId}`);
}

export function getCategoryBySlug(slug: string) {
    return axiosInstance.get(`/categories/get/slug?slug=${slug}`);
}
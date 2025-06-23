import axiosInstance from './axiosInstance'
import {PageRequest} from "@/lib/models";

export function getPopularProducts(pageRequest: PageRequest) {
    const params = [];
    if (pageRequest.page > 1) {
        params.push(`page=${pageRequest.page}`)
    }
    return axiosInstance.get(`/popular/products?${params}`);
}

export function getPopularCategories(pageRequest: PageRequest) {
    const params = [];
    if (pageRequest.page > 1) {
        params.push(`page=${pageRequest.page}`)
    }
    return axiosInstance.get(`/popular/categories?${params}`);
}

export function getPopularProjects(pageRequest: PageRequest) {
    const params = [];
    if (pageRequest.page > 1) {
        params.push(`page=${pageRequest.page}`)
    }
    return axiosInstance.get(`/popular/projects?${params}`);
}

export function getPopularShorts() {
    return axiosInstance.get(`/shorts/popular`);
}
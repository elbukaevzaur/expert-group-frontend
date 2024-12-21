import axiosInstance from './axiosInstance'
import {PageRequest} from "@/lib/models";

export function getAll(pageRequest: PageRequest) {
    return axiosInstance.post('/products/all', pageRequest);
}

export function getDetails(productId: number) {
    return axiosInstance.get(`/products/details?productId=${productId}`);
}

export function getAllFavoriteProducts() {
    return axiosInstance.get('/products/me/favorite/all');
}
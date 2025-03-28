import axiosInstance from './axiosInstance'
import {PageRequest} from "@/lib/models";

export function getAll(pageRequest: PageRequest) {
    return axiosInstance.post('/products/all', pageRequest);
}

export function getDetails(productId: number) {
    return axiosInstance.get(`/products/details?productId=${productId}`);
}

export function getProductDetailsBySlug(slug: string) {
    return axiosInstance.get(`/products/details/slug?slug=${slug}`);
}

export function getAllFavoriteProducts() {
    return axiosInstance.get('/products/me/favorite/all');
}

export function getProductsFullTextSearch(query: string) {
    return axiosInstance.get(`/products/search?query=${query}`);
}

export function getModelsForProduct(productId: string) {
    return axiosInstance.get(`/files/product/${productId}`);
}
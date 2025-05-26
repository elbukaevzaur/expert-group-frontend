import axiosInstance from './axiosInstance'
import {PageRequest} from "@/lib/models";

export function getPopularProducts(pageRequest: PageRequest) {
    const params = [];
    if (pageRequest.page > 1) {
        params.push(`page=${pageRequest.page}`)
    }
    return axiosInstance.get(`/popular/products?${params}`);
}
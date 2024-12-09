import axiosInstance from './axiosInstance'
import {PageRequest} from "@/lib/models";

export function getAll(pageRequest: PageRequest) {
    return axiosInstance.post('/products/all', pageRequest);
}
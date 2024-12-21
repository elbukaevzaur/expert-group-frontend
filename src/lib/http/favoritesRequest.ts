import axiosInstance from './axiosInstance'
import {ChangeFavoriteRequest} from "@/lib/models/favorites";

export function changeFavoriteProduct(request: ChangeFavoriteRequest) {
    return axiosInstance.post('/favorites/me/change', request);
}

export function getAllFavoritesForMe(){
    return axiosInstance.get('/favorites/me/all');
}
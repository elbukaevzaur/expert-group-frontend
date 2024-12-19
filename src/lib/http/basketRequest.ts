import axiosInstance from './axiosInstance'
import {OrderItemsRequest} from "@/lib/models";

export function addOrderItems(request: OrderItemsRequest[]) {
    return axiosInstance.post('/basket/order/items/save', request);
}

export function getAllOrderItems(){
    return axiosInstance.get('/basket/order/items/me/all');
}
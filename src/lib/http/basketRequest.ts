import axiosInstance from './axiosInstance'
import {OrderItemsRequest} from "@/lib/models";

export function addOrderItems(request: OrderItemsRequest) {
    return axiosInstance.post('/basket/order/items/create', request);
}
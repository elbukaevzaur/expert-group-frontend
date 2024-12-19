import axiosInstance from './axiosInstance'
import {OrderItemsRequest} from "@/lib/models";

export function addOrderItems(request: OrderItemsRequest[]) {
    return axiosInstance.post('/basket/order/items/save', request);
}

export function getAllOrderItems(){
    return axiosInstance.get('/basket/order/items/me/all');
}

export function getAllBasketItemsDetails(request: {productIds: []}) {
    return axiosInstance.post('/products/basket/items/details', request)
}

export function removeByProductId(productId: number) {
    return axiosInstance.delete(`/basket/order/items?productId=${productId}`)
}

export function basketCleanRequest() {
    return axiosInstance.delete(`/basket/order/items/clean`)
}
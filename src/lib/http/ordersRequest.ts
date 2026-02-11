import axiosInstance from './axiosInstance'
import {ChangeOrderStatusRequest} from "@/lib/models";

export function createOrderRequest(request: { 
    pickupPointId?: number, 
    deliveryAddress?: string,
    fullName?: string,
    phone?: string,
    email?: string,
    city?: string,
    comment?: string
}) {
    return axiosInstance.post('/basket/order/create', request);
}

export function findMeCurrentOrdersRequest() {
    return axiosInstance.get('/orders/me/current');
}

export function findMeAllOrdersRequest() {
    return axiosInstance.get('/orders/me/all');
}

export function findMeOrderItemsByOrderRequest(orderId: number) {
    return axiosInstance.get(`/orders/me/items/all?orderId=${orderId}`);
}

export function findMeOrdersGetRequest(orderId: number) {
    return axiosInstance.get(`/orders/me/get?orderId=${orderId}`);
}

export function changeOrderStatus(request: ChangeOrderStatusRequest) {
    return axiosInstance.post(`/orders/change/status`, request);
}
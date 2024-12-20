import axiosInstance from './axiosInstance'

export function createOrderRequest() {
    return axiosInstance.post('/basket/order/create');
}

export function findMeCurrentOrdersRequest() {
    return axiosInstance.get('/orders/me/current');
}

export function findMeAllOrdersRequest() {
    return axiosInstance.get('/orders/me/all');
}
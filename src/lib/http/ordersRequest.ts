import axiosInstance from './axiosInstance'

export function createOrderRequest() {
    return axiosInstance.post('/basket/order/create');
}
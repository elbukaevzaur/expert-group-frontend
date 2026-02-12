import axiosInstance from './axiosInstance'

export function getActiveSliders() {
    return axiosInstance.get('/slider/active');
}

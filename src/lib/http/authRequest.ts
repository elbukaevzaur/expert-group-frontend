import axiosInstance from './axiosInstance'
import {Login, RegisterRequest} from "@/lib/models/login";

export function signIn(request: Login) {
    return axiosInstance.post('/auth/login', request);
}

export function registerRequest(request: RegisterRequest) {
    return axiosInstance.post('/auth/register', request);
}

export function confirmRequest(token: string) {
    return axiosInstance.get(`/auth/confirm?token=${token}`);
}
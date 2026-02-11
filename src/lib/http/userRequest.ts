import axiosInstance from './axiosInstance'

export interface UserUpdateRequest {
    fullName: string | null;
    email: string | null;
    phoneNumber: string | null;
}

export interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
}

export function updateProfileRequest(request: UserUpdateRequest) {
    return axiosInstance.post('/user/update', request);
}

export function changePasswordRequest(request: ChangePasswordRequest) {
    return axiosInstance.post('/user/change-password', request);
}

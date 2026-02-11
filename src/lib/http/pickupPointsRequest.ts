import axiosInstance from './axiosInstance'

export interface PickupPoint {
    id: number;
    name: string;
    address: string;
    workingHours?: string;
    phone?: string;
    description?: string;
    active: boolean;
    latitude?: number;
    longitude?: number;
}

export function getActivePickupPointsRequest() {
    return axiosInstance.get<PickupPoint[]>('/pickup-points');
}

export function getAllPickupPointsAdminRequest() {
    return axiosInstance.get<PickupPoint[]>('/admin/pickup-points');
}

export function savePickupPointAdminRequest(pickupPoint: Partial<PickupPoint>) {
    return axiosInstance.post('/admin/pickup-points/save', pickupPoint);
}

export function deletePickupPointAdminRequest(id: number) {
    return axiosInstance.delete(`/admin/pickup-points/${id}`);
}

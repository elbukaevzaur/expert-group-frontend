import axiosInstance from './axiosInstance'

export function getAll(){
    return axiosInstance.post('/products/all', JSON.stringify({}), {headers: {'Content-Type': 'application/json'}});
}
import axiosInstance from './axiosInstance'

export function getAll(filterData: any){
    return axiosInstance.post('/products/all', JSON.stringify(filterData), {headers: {'Content-Type': 'application/json'}});
}
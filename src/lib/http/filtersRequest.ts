import axiosInstance from './axiosInstance'

export function getAllFilters(categoryId: number | undefined, categoryIds?: number[], onlyPopular?: boolean) {
    const params = new URLSearchParams();
    if (categoryIds && categoryIds.length > 0) {
        categoryIds.forEach(id => params.append('categoryIds', id.toString()));
    } else if (categoryId !== undefined && categoryId !== null) {
        params.append('categoryId', categoryId.toString());
    }
    if (onlyPopular) {
        params.append('onlyPopular', 'true');
    }
    const queryString = params.toString();
    return axiosInstance.get(`/filters/products${queryString ? `?${queryString}` : ''}`);
}
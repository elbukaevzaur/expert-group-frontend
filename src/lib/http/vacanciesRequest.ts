import axiosInstance from './axiosInstance'

export function getAllVacancies() {
    return axiosInstance.get(`/vacancies/all`);
}

export function getVacancyDetails(slug: string) {
    return axiosInstance.get(`/vacancies/details?slug=${slug}`);
}
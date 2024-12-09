export interface PageResponse<T> {
    totalPages: number,
    currentPage: number,
    perPage: number,
    content: T[]
}

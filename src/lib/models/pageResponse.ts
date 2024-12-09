export interface Product {
    id: number,
    name: string
    price: number;
    currentQuantity: number;
}

export interface PageResponse {
    totalPages: number,
    currentPage: number,
    perPage: number,
    content: Product[]
}

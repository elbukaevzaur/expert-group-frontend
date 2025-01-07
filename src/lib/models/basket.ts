export interface OrderItems {
    productId: number,
    quantity: number
}

export interface OrderItemsDetails {
    productId: number,
    name: string,
    price: number,
    currentQuantity: number,
    logo: string,
    categoryId: number,
    parentCategoryId: number,
    defaultImage: string
}

export interface OrderItemsRequest {
    productId: number,
    quantity: number
}

export interface Orders {
    id: number,
    total: number,
    status: string
}
import {Products} from "@/lib/models/products";

export enum OrderStatusEnum {
    PENDING = "PENDING",
    ACCEPT = "ACCEPT",
    DELIVERY = "DELIVERY",
    COMPLETE = "COMPLETE",
    CANCELLED = "CANCELLED",
}

export interface OrderItems {
    productId: number,
    quantity: number
}

export interface OrderItemsProductResponse {
    productId: number,
    quantity: number,
    price: number,
    product: Products
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
    status: OrderStatusEnum,
    createdAt: string
}

export interface ChangeOrderStatusRequest{
    orderId: number,
    status: OrderStatusEnum
}
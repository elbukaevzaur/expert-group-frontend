import {Products} from "@/lib/models/products";
import { PickupPoint } from "@/lib/http/pickupPointsRequest";

export enum OrderStatusEnum {
    PENDING = "PENDING",
    ACCEPT = "ACCEPT",
    DELIVERY = "DELIVERY",
    COMPLETE = "COMPLETE",
    CANCELLED = "CANCELLED",
}

export interface OrderItems {
    productId: number | string,
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
    defaultImage: string,
    slug: string,
    allowOrderWithoutStock?: boolean
}

export interface OrderItemsRequest {
    productId: number,
    quantity: number
}

export interface Orders {
    id: number,
    total: number,
    status: OrderStatusEnum,
    createdAt: string,
    pickupPoint?: PickupPoint,
    deliveryAddress?: string,
    fullName?: string,
    phone?: string,
    email?: string,
    city?: string,
    comment?: string
}

export interface ChangeOrderStatusRequest{
    orderId: number,
    status: OrderStatusEnum
}
import {Products} from "@/lib/models";

export interface OrderItems extends Products {
    productId: number,
    quantity: number
}

export interface OrderItemsRequest {
    productId: number,
    quantity: number
}
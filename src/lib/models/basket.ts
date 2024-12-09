import {Product} from "@/lib/models";

export interface BasketItem extends Product {
    count: number
}
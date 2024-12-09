import {Products} from "@/lib/models";

export interface BasketItem extends Products {
    count: number
}
import {findMeOrderItemsByOrderRequest} from "@/lib/http/ordersRequest";

export const useProductsRequestActions = () => {
    const handleAllOrderItemsRequest = (orderId: number) => {
        return findMeOrderItemsByOrderRequest(orderId);
    }

    return { handleAllOrderItemsRequest };
};
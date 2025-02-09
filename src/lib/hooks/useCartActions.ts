import { useDispatch } from 'react-redux';
import {BASKET_CLEAR, ORDER_ITEMS_DECREMENT, ORDER_ITEMS_INCREMENT, REMOVE} from "@/lib/reducers";
import {OrderItems} from "@/lib/models";

export const useCartActions = () => {
    const dispatch = useDispatch();

    const handleAddItem = (orderItem: OrderItems | null, productId: number, productQuantity: number) => {
        if (orderItem?.quantity === undefined && productQuantity > 0)
            dispatch(ORDER_ITEMS_INCREMENT({orderItem: orderItem, productId: productId}));
        else if (orderItem?.quantity && orderItem?.quantity < productQuantity)
            dispatch(ORDER_ITEMS_INCREMENT({orderItem: orderItem, productId: productId}));
    };

    const handleRemoveItem = (orderItem: OrderItems | null) => {
        dispatch(ORDER_ITEMS_DECREMENT(orderItem));
    };

    const handleRemoveItemFromBasket = (productId: string) => {
        dispatch(REMOVE(productId));
    }

    const handleRemoveAllItems = () => {
        dispatch(BASKET_CLEAR());
    }

    return { handleAddItem, handleRemoveItem, handleRemoveItemFromBasket, handleRemoveAllItems };
};
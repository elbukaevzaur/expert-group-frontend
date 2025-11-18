import { useDispatch } from 'react-redux';
import {BASKET_CLEAR, ORDER_ITEMS_DECREMENT, ORDER_ITEMS_INCREMENT, REMOVE} from "@/lib/reducers";
import {OrderItems} from "@/lib/models";

export const useCartActions = () => {
    const dispatch = useDispatch();

    const handleAddItem = (orderItem: OrderItems | null, productId: number, productQuantity: number, allowOrderWithoutStock?: boolean) => {
        // Разрешаем добавление, если товар есть в наличии или разрешен заказ без наличия
        const canAdd = productQuantity > 0 || allowOrderWithoutStock === true;
        
        if (orderItem?.quantity === undefined && canAdd)
            dispatch(ORDER_ITEMS_INCREMENT({orderItem: orderItem, productId: productId}));
        else if (orderItem?.quantity && (orderItem.quantity < productQuantity || allowOrderWithoutStock === true))
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
"use client"

import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {useEffect} from "react";
import {
    ALL_FAVORITES_REQUEST,
    FAVORITE_PRODUCTS_FETCH_REQUESTED,
    ORDER_ITEMS_DECREMENT,
    ORDER_ITEMS_INCREMENT
} from "@/lib/reducers";
import {ProductsListItemComponent} from "@/components/catalog/products-list-item-component";
import {OrderItems, OrderItemsRequest, Products} from "@/lib/models";

export default function Page() {
    const { content } = useAppSelector((state) => state.products.allFavoriteProducts);
    const { allFavorites } = useAppSelector((state) => state.favorites);
    const { orderItems } = useAppSelector((state) => state.basket);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(FAVORITE_PRODUCTS_FETCH_REQUESTED());
        dispatch(ALL_FAVORITES_REQUEST());
    }, []);

    const addToBasket = (item: Products) => {
        const basketItem = findBasketItemByProductId(item.id);
        const request: OrderItemsRequest = {
            productId: basketItem ? basketItem.productId : item.id,
            quantity: basketItem ? (basketItem.quantity + 1) : 1,
        }
        dispatch(ORDER_ITEMS_INCREMENT(request))
    }

    const handleRemoveFromBasket = (item: Products) => {
        const basketItem = findBasketItemByProductId(item.id);
        if (basketItem !== null){
            const request: OrderItemsRequest = {
                productId: basketItem.productId,
                quantity: (basketItem.quantity - 1)
            }
            dispatch(ORDER_ITEMS_DECREMENT(request))
        }
    }

    function findBasketItemByProductId(productId: number): OrderItems | null{
        const index = orderItems.map(m => m.productId).indexOf(productId);
        if (index === -1){
            return null;
        }
        return orderItems[index]
    }

    return (
        <div className="items favorites">
            {
                content.map((item) => {
                    return <ProductsListItemComponent
                        key={item.id}
                        product={item}
                        basketItem={findBasketItemByProductId(item.id)}
                        addToBasket={() => addToBasket(item)}
                        removeFromBasket={() => handleRemoveFromBasket(item)}
                        categoryId={item.categoryId.toString()}
                        isFavorite={allFavorites.hasOwnProperty(item.id)}
                    />
                })
            }
        </div>
    )
}
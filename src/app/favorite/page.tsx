"use client"

import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {useEffect} from "react";
import {
    ALL_FAVORITES_REQUEST,
    FAVORITE_PRODUCTS_FETCH_REQUESTED
} from "@/lib/reducers";
import {ProductsListItemComponent} from "@/components/catalog/products-list-item-component";
import {OrderItems} from "@/lib/models";
import ListNotContent from "@/components/ListNotContent";
import styles from './favorite.module.css'

export default function FavoritePage() {
    const { content } = useAppSelector((state) => state.products.allFavoriteProducts);
    const { allFavorites } = useAppSelector((state) => state.favorites);
    const { orderItems } = useAppSelector((state) => state.basket);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(FAVORITE_PRODUCTS_FETCH_REQUESTED());
        dispatch(ALL_FAVORITES_REQUEST());
    }, []);

    function findBasketItemByProductId(productId: any): OrderItems | null {
        // Сравниваем ID как строки для поддержки UUID
        const index = orderItems.findIndex(m => String(m.productId) === String(productId));
        if (index === -1) {
            return null;
        }
        return orderItems[index]
    }

    return(
         <div className={styles.page}>
            <h1 className={styles.title}>Избранное</h1>
                    {
                        content.length === 0 ?
                            <ListNotContent text="Список избранных товаров пуст"/>
                            :
                            <div className={styles.favorites}>
                                {
                                    content.map((item) => {
                                        return <ProductsListItemComponent
                                            key={item.id}
                                            product={item}
                                            basketItem={findBasketItemByProductId(item.id)}
                                            isFavorite={allFavorites.hasOwnProperty(item.id)}
                                        />
                                    })
                                }
                            </div>
                    }
                </div>
    )
}
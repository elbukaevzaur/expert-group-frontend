'use client'

import ProductsFilter from "@/components/filter/products-filter";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ProductsListItemComponent } from "@/components/catalog/products-list-item-component";
import {
    ADD_FILTER,
    FILTERS_FETCH_REQUESTED, ORDER_ITEMS_DECREMENT, ORDER_ITEMS_INCREMENT,
} from "@/lib/reducers";
import {useEffect} from "react";
import {OrderItems, OrderItemsRequest, Products} from "@/lib/models";
import CategoryTitle from "@/components/catalog/category-title-component";
import ProductsPagination from "@/components/catalog/products-pagination-component";

interface Props {
    categoryId: string | string[] | undefined,
}

export default function ProductsListComponent(props: Props) {
    const { allProducts } = useAppSelector((state) => state.products);
    const { orderItems } = useAppSelector((state) => state.basket);
    const { allCategories } = useAppSelector((state) => state.categories);
    const { allFavorites } = useAppSelector((state) => state.favorites);

    const dispatch = useAppDispatch();

    useEffect(() => {
    }, [props.categoryId, allCategories]);

    useEffect(() => {
        dispatch(FILTERS_FETCH_REQUESTED(props.categoryId));
        dispatch(ADD_FILTER({ field: 'categoryId', value: [String(props.categoryId)], operator: 'EQUAL' }));
    }, [props.categoryId])

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
        <div className="products">
            <CategoryTitle/>
            {
                allProducts.content.length > 0 &&
                <ProductsFilter/>
            }
            <div className="items">
                {
                    allProducts.content.map((value, index) => {
                        return <ProductsListItemComponent
                            key={index}
                            product={value}
                            basketItem={findBasketItemByProductId(value.id)}
                            addToBasket={() => addToBasket(value)}
                            removeFromBasket={() => handleRemoveFromBasket(value)}
                            categoryId={props.categoryId}
                            isFavorite={allFavorites.hasOwnProperty(value.id)}
                        />
                    })
                }
            </div>
            {
                allProducts.content.length > 0 ?
                    <ProductsPagination />
                    :
                    <h3 style={{textAlign: 'center'}}>Список товаров пуст!</h3>
            }
        </div>
    )
}
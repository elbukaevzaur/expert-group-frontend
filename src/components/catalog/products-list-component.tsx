'use client'

import ProductsFilter from "@/components/filter/products-filter";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ProductsListItemComponent } from "@/components/catalog/products-list-item-component";
import {
    ADD_FILTER,
    ADD_SAVE, FILTERS_FETCH_REQUESTED,
    REMOVE_COUNT, SUB_CATEGORIES_FETCH_REQUESTED
} from "@/lib/reducers";
import {useEffect, useState} from "react";
import {BasketItem, Products} from "@/lib/models";
import CategoryTitle from "@/components/catalog/category-title-component";
import ProductsPagination from "@/components/catalog/products-pagination-component";

interface Props {
    categoryId: string | string[] | undefined,
}

export default function ProductsListComponent(props: Props) {
    const { allProducts } = useAppSelector((state) => state.products);
    const { allItems } = useAppSelector((state) => state.basket);
    const { allCategories } = useAppSelector((state) => state.categories);
    const dispatch = useAppDispatch();

    useEffect(() => {
    }, [props.categoryId, allCategories]);

    useEffect(() => {
        dispatch(FILTERS_FETCH_REQUESTED(props.categoryId));
        dispatch(ADD_FILTER({ field: 'categoryId', value: [props.categoryId + ''] }));
    }, [props.categoryId])

    const addToBasket = (item: Products) => {
        dispatch(ADD_SAVE(item))
    }

    const handleRemoveFromBasket = (item: Products) => {
        dispatch(REMOVE_COUNT(item))
    }

    function findBasketItemByProductId(productId: number): BasketItem | null{
        const index = allItems.map(m => m.id).indexOf(productId);
        if (index === -1){
            return null;
        }
        return allItems[index]
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
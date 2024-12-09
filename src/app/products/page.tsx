'use client'

import ProductsFilter from "@/components/products-filter";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ProductsListItem } from "@/components/products-list-item";
import {
    ADD_FILTER,
    ADD_SAVE, FILTERS_FETCH_REQUESTED,
    PRODUCTS_FETCH_REQUESTED,
    PRODUCTS_SHOW_MORE_FETCH_REQUESTED,
    REMOVE_COUNT
} from "@/lib/reducers";
import { useEffect } from "react";
import {BasketItem, Pageable, Products} from "@/lib/models";

export default function ProductsPage() {
    const { allProducts, pageable } = useAppSelector((state) => state.products);
    const { allItems } = useAppSelector((state) => state.basket);

    const dispatch = useAppDispatch();

    useEffect(() => {
        loadProducts({});
        // УБРАТЬ ПОТОМ
        dispatch(FILTERS_FETCH_REQUESTED(1));
        dispatch(ADD_FILTER({ field: 'categoryId', value: ['1'] }));
    }, [])

    const loadProducts = (pageable: Pageable) => {
        dispatch(PRODUCTS_FETCH_REQUESTED(pageable));
    }

    const nextPage = () => {
        const page: Pageable = {
            page: (pageable.page + 1),
            perPage: pageable.perPage
        }
        loadProducts(page)
    }

    const prevPage = () => {
        const page: Pageable = {
            page: (pageable.page - 1),
            perPage: pageable.perPage
        }
        loadProducts(page)
    }

    const selectPage = (selectPage: number) => {
        const page: Pageable = {
            page: selectPage,
            perPage: pageable.perPage
        }
        loadProducts(page)
    }

    const showMore = () => {
        const page: Pageable = {
            page: (pageable.page + 1),
            perPage: pageable.perPage
        }
        dispatch(PRODUCTS_SHOW_MORE_FETCH_REQUESTED(page));
    }

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
            <div className="products__info_wrapper">
                <h1 className="products__title">КАРНИЗЫ ПОТОЛОЧНЫЕ</h1>
                <div className="products__info">
                    <h3 className="products__info_text">910</h3>
                </div>
            </div>
            <ProductsFilter />
            <div className="items">
                {
                    allProducts.content.map((value, index) => {
                        return <ProductsListItem
                            key={index}
                            product={value}
                            basketItem={findBasketItemByProductId(value.id)}
                            addToBasket={() => addToBasket(value)}
                            removeFromBasket={() => handleRemoveFromBasket(value)}
                        />
                    })
                }
            </div>
            {
                pageable.page < allProducts.totalPages &&
                <button className="items__more" onClick={showMore}>
                    <h2 className="items__more_text">Показать еще</h2>
                </button>
            }

            <div className="items__buttons">
                <button className="items__button_left" onClick={prevPage}>
                    <Image src={'/images/Vector_left.png'} alt="Лево" width={9} height={17} />
                </button>
                {
                    Array.from({ length: allProducts.totalPages }, (v, i) => {
                        i++;
                        let buttonClass = 'items__button_number';
                        let textClass = 'items__button_number_text';
                        if (i == 1) {
                            buttonClass += ' items__button_number_first';
                        } else if (i == allProducts.totalPages) {
                            buttonClass += ' items__button_number_last';
                        }
                        if (i == allProducts.currentPage) {
                            buttonClass += ' items__button_number_active';
                            textClass += ' items__button_number_text_active';
                        }
                        return <button className={buttonClass} key={i} onClick={() => selectPage(i)}>
                            <h3 className={textClass}>{i}</h3>
                        </button>
                    })
                }
                <button className="items__button_right" onClick={nextPage}>
                    <Image src={'/images/Vector_right.png'} alt="Право" width={9} height={17} />
                </button>
            </div>
        </div>
    )
}
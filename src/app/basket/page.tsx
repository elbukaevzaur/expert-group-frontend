'use client'

import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import {
    BASKET_CLEAR,
    ORDER_ITEMS_DETAILS_REQUEST
} from "@/lib/reducers";
import Image from "next/image"
import Link from "next/link";
import React, {useEffect} from "react";
import styles from "./basket.module.css"
import {useRouter} from "next/navigation";
import ListNotContent from "@/components/ListNotContent";
import {CartItemQuantityBasket, RemoveAllBasket, RemoveItemBasket} from "@/components/basket/basket-actions";

export default function Basket() {
    const { orderItems, orderItemsDetails } = useAppSelector((state) => state.basket);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(ORDER_ITEMS_DETAILS_REQUEST())
    }, []);

    const removeAllFromBasket = () => {
        dispatch(BASKET_CLEAR());
    }

    const getTotalPrice = (): string => {
        let totalSum: number = 0;
        if (orderItems.length > 0)
            orderItems.forEach((value) => {
                totalSum += Number((value.quantity * orderItemsDetails[value.productId]?.price).toFixed(2));
            })
        return totalSum.toFixed(2);
    }

    function handleCreateOrder() {
        router.push('/basket/buy')
    }

    return (
        <div className={styles.basket}>
            <div className={styles.title}>
                <h1 className={styles.title_text}>Корзина</h1>
                <p className={styles.title_quantity}>/ {orderItems.length} шт.</p>
            </div>
            <div className={styles.content}>
                <div className={styles.items_content}>
                    <div className={styles.items_wrapper}>
                        <div>
                            <h2 className={styles.items_title}>{orderItems.length > 0 && 'Товары в корзине'}</h2>
                            {
                                orderItems.length === 0 &&
                                <ListNotContent text="Вы пока ничего не добавили в корзину"/>
                            }
                            {
                                orderItems.length === 0 || orderItemsDetails.length === 0 &&
                                <div style={{paddingTop: '25px', paddingBottom: '25px'}}>
                                    <Link href={'/catalog'}><h4 style={{color: '#1fa038'}}>Перейти в каталог товаров</h4></Link>
                                </div>
                            }
                        </div>
                        {
                            orderItems.length > 0 &&
                            <RemoveAllBasket />
                        }
                    </div>
                    {
                        orderItems.map((value, index) => {
                            return <div key={index} className={styles.item}>
                                {
                                    orderItemsDetails[value.productId]?.defaultImage == null ?
                                        <Image className={styles.item_image} src={'/images/Basket_image.png'} alt="Карниз Кт-68" width={283} height={130}/>
                                        :
                                        <Image 
                                            className={styles.item_image} 
                                            width={283} height={130}
                                            src={`${process.env.NEXT_PUBLIC_API_URL}/images/get/product?name=${'small_' + orderItemsDetails[value.productId].defaultImage}`} 
                                            alt={orderItemsDetails[value.productId].name}
                                        />
                                }
                                <div className={styles.item_container}>
                                <Link className={styles.item_text_link} href={`/catalog/${orderItemsDetails[value.productId]?.parentCategoryId}/${orderItemsDetails[value.productId]?.categoryId}/details/${value.productId}`}>
                                    <h3 className={styles.item_text}>{orderItemsDetails[value.productId]?.name}</h3>
                                </Link>
                                <div className={styles.item_content}>
                                <div className={styles.item_wrapper}>
                                    <CartItemQuantityBasket orderItem={value} productId={value.productId} productQuantity={orderItemsDetails[value.productId]?.currentQuantity}/>
                                    <h4 className={styles.item_quantity_sum}>{orderItemsDetails[value.productId]?.price} &#8381; /шт</h4>
                                </div>
                                <h3 className={styles.item_price}>{(value.quantity * orderItemsDetails[value.productId]?.price).toFixed(2)} &#8381;</h3>
                                </div>
                                    <RemoveItemBasket productId={value.productId.toString()}/>
                                </div>
                            </div>
                        })
                    }
                </div>
                {
                    orderItems.length > 0 &&
                    <div className={styles.buy}>
                        <div className={styles.buy_total}>
                            <h2 className={styles.buy_title}>Итого:</h2>
                            <h2 className={styles.buy_sum}>{getTotalPrice()} &#8381;/шт</h2>
                        </div>
                        <button onClick={handleCreateOrder} className={styles.buy_button}>
                            <h3 className={styles.buy_text}>Перейти к оформлению</h3>
                        </button>
                        {/*<button className={`${styles.buy_button} ${styles.buy_button_white}`}>*/}
                        {/*    <h3 className={`${styles.buy_text} ${styles.buy_text_green}`}>Купить в 1 клик</h3>*/}
                        {/*</button>*/}
                    </div>
                }
            </div>
        </div>
    )
}
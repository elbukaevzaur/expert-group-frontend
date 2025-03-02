'use client'

import styles from "@/app/basket/buy/buy.module.css"
import Image from "next/image"
import {
    CREATE_ORDER_REQUEST,
    ORDER_ITEMS_DETAILS_REQUEST
} from "@/lib/reducers";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import React, {useEffect} from "react";
import {OrderItemsDetails} from "@/lib/models";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {getCurrentUrlForProductDetails} from "@/components/catalog/products-list-item-component";

export default function Buy() {
    const dispatch = useAppDispatch();
    const { orderItems, orderItemsDetails } = useAppSelector((state) => state.basket);
    const router = useRouter();

    useEffect(() => {
        dispatch(ORDER_ITEMS_DETAILS_REQUEST())
    }, []);

    const getTotalPrice = (): string => {
        let totalSum: number = 0;
        if (orderItems.length > 0)
            orderItems.forEach((value) => {
                totalSum += Number((value.quantity * orderItemsDetails[value.productId]?.price).toFixed(2));
            })
        return totalSum.toFixed(2);
    }

    function handleCreateOrder() {
        dispatch(CREATE_ORDER_REQUEST());
        router.push('/lk/current-orders')
    }

    function handleToProductDetails(value: OrderItemsDetails) {
        getCurrentUrlForProductDetails(value).then((result) => {
            router.push(result);
        })
    }

    const styleImage = [styles.item_image, 'product_details_link_button']


    return (
        <div className={styles.buy}>
            <div className={styles.title_wrapper}>
                <h1 className={styles.title}>Товары в заказе</h1>
                <p className={styles.subtitle}>/{orderItems.length} шт.</p>
            </div>
            <div className={styles.wrapper}>
            <div className={styles.items}>
                {
                    orderItems.map((item, index) => {
                        return <div key={index} className={styles.item}>
                            <button onClick={() => handleToProductDetails(orderItemsDetails[item.productId])} className={styleImage.join(" ")}>
                                {
                                    orderItemsDetails[item.productId]?.defaultImage == null ?
                                        <Image className={styles.item_image} src={'/images/image.png'} alt="Image" width={283} height={100}/>
                                        :
                                        <img 
                                            className={styles.item_image} 
                                            width={283} 
                                            height={100}
                                            src={`${process.env.NEXT_PUBLIC_API_URL}/images/get/product?name=${'small_' + orderItemsDetails[item.productId].defaultImage}`} 
                                            alt={orderItemsDetails[item.productId].name}
                                        />
                                }
                            </button>
                            <div className={styles.item_wrapper}>
                                <button className="product_details_link_button" onClick={() => handleToProductDetails(orderItemsDetails[item.productId])}>
                                    <h3 className={styles.item_name}>{orderItemsDetails[item.productId]?.name}</h3>
                                </button>
                                <h3 className={styles.item_name}>{item.quantity} шт</h3>
                                <h3 className={styles.item_summ}>{orderItemsDetails[item.productId]?.price * item.quantity} &#8381;</h3>
                            </div>
                        </div>
                    })
                }
               <div className={styles.delivery}>
                <div className={styles.delivery_info}>
                    <h3 className={styles.delivery_title}>Способ доставки</h3>
                    <button className={styles.delivery_button}>Изменить</button>
                </div>
                <div className={styles.delivery_wrapper}>
                        <h4 className={styles.delivery_text}>Самовывоз</h4>
                        <h4 className={`${styles.delivery_text} ${styles.delivery_text_grey}`}>м. Ботанический сад</h4>
                    </div>
                    <h4 className={`${styles.delivery_text} ${styles.delivery_text_size}`}>Бесплатно</h4>
                
            </div>
            </div>
            <div className={styles.total}>
                    <div className={styles.total_wrapper}>
                        <h3 className={styles.total_title}>Итого:</h3>
                        <h3 className={`${styles.total_title} ${styles.total_title_color}`}>{getTotalPrice()} &#8381;/шт</h3>
                    </div>
                    <div className={`${styles.total_wrapper} ${styles.total_wrapper_margin}`}>
                        <h3 className={styles.total_text}>Товаров на:</h3>
                        <h3 className={`${styles.total_text} ${styles.total_text_weight}`}>{getTotalPrice()} &#8381;/шт</h3>
                    </div>
                    <div className={`${styles.total_wrapper} ${styles.total_wrapper_margin}`}>
                        <h3 className={styles.total_text}>Доставка:</h3>
                        <h3 className={`${styles.total_text} ${styles.total_text_weight}`}>Бесплатно</h3>
                    </div>
                    <h3 className={`${styles.total_text} ${styles.total_text_weight}`}>Оплата:</h3>
                    <h3 className={`${styles.total_text} ${styles.total_text_weight} ${styles.total_wrapper_margin}`}>Банковской картой онлайн</h3>
                    <h3 className={`${styles.total_text} ${styles.total_text_weight}`}>Доставка:</h3>
                    <h3 className={`${styles.total_text} ${styles.total_text_weight} ${styles.total_title_color}`}>Самовывоз</h3>
                    <button onClick={handleCreateOrder} className={styles.total_button}>Оформить заказ</button>
                </div>
                </div>
        </div>
    )
}
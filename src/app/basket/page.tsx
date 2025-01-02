'use client'

import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import {OrderItems, OrderItemsRequest} from "@/lib/models";
import {
    ORDER_ITEMS_DECREMENT,
    ORDER_ITEMS_INCREMENT,
    REMOVE,
    BASKET_CLEAR,
    ORDER_ITEMS_DETAILS_REQUEST
} from "@/lib/reducers";
import Image from "next/image"
import Link from "next/link";
import {useEffect} from "react";
import {GreenMinus, GreenPlus} from "@/lib/icon-svg";
import styles from "./basket.module.css"
import {useRouter} from "next/navigation";

export default function Basket() {
    const { orderItems, orderItemsDetails } = useAppSelector((state) => state.basket);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(ORDER_ITEMS_DETAILS_REQUEST())
    }, []);

    const removeFromBasket = (item: OrderItems) => {
        dispatch(REMOVE(item.productId));
    }

    const removeAllFromBasket = () => {
        dispatch(BASKET_CLEAR());
    }

    const handleAddToBasket = (item: OrderItems) => {
        const request: OrderItemsRequest = {
            productId: item.productId,
            quantity: (item.quantity + 1),
        }
        dispatch(ORDER_ITEMS_INCREMENT(request))
    }

    const handleRemoveFromBasket = (item: OrderItems) => {
        const request: OrderItemsRequest = {
            productId: item.productId,
            quantity: (item.quantity - 1)
        }
        dispatch(ORDER_ITEMS_DECREMENT(request))
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
                        <h2 className={styles.items_title}>{orderItems.length > 0 ? 'Товары в корзине': 'Вы пока ничего не добавили в корзину'}</h2>
                        {
                            orderItems.length === 0 &&
                            <div style={{paddingTop: '25px', paddingBottom: '25px'}}>
                                <Link href={'/catalog'}><h4 style={{color: '#1fa038'}}>Перейти в каталог товаров</h4></Link>
                            </div>
                        }
                        </div>
                        {
                            orderItems.length > 0 &&
                            <button className={styles.items_clear} onClick={removeAllFromBasket}>
                                <h3 className={styles.items_clear_text}>ОЧИСТИТЬ</h3>
                                <Image src={'/images/Clear_button.png'} alt="Очистить" width={6.5} height={6.5}/>
                            </button>
                        }
                    </div>
                    {
                        orderItems.map((value, index) => {
                            return <div key={index} className={styles.item}>
                                <Image src={'/images/Basket_image.png'} alt="Карниз Кт-68" width={283} height={130}/>
                                <Link href={`/catalog/${orderItemsDetails[value.productId]?.parentCategoryId}/${orderItemsDetails[value.productId]?.categoryId}/details/${value.productId}`}>
                                    <h3 className={styles.item_text}>{orderItemsDetails[value.productId]?.name}</h3>
                                </Link>
                                <div className={styles.item_wrapper}>
                                    <div className={styles.item_quantity}>
                                        <button onClick={() => handleRemoveFromBasket(value)} className={styles.item_button}>
                                            {<GreenMinus width={19.5} height={19.5} />}
                                        </button>
                                        <h4 className={styles.item_quantity_text}>{value.quantity}</h4>
                                        <button onClick={() => handleAddToBasket(value)} className={styles.item_button}>
                                        {<GreenPlus width={19.5} height={19.5} />}
                                        </button>
                                    </div>
                                    <h4 className={styles.item_quantity_sum}>{orderItemsDetails[value.productId]?.price} &#8381; /шт</h4>
                                </div>
                                <h3 className={styles.item_price}>{(value.quantity * orderItemsDetails[value.productId]?.price).toFixed(2)} &#8381;</h3>
                                <button className={styles.item_delete} onClick={() => removeFromBasket(value)}>
                                    <Image src={'/images/Clear_button.png'} alt="Удалить" width={6} height={6} />
                                </button>
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
                        <button className={`${styles.buy_button} ${styles.buy_button_white}`}>
                            <h3 className={`${styles.buy_text} ${styles.buy_text_green}`}>Купить в 1 клик</h3>
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}
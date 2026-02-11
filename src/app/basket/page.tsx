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
import {OrderItemsDetails, ProductImages} from "@/lib/models";
import {getCurrentUrlForProductDetails} from "@/components/catalog/products-list-item-component";
import { CloseSvg, SearchSvg } from "@/lib/icon-svg";
import { OneClickOrderModal } from "@/components/basket/one-click-order-modal";
import ImageLightbox from "@/components/catalog/image-lightbox";

export default function Basket() {
    const { orderItems, orderItemsDetails } = useAppSelector((state) => state.basket);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [isOneClickModalOpen, setIsOneClickModalOpen] = React.useState(false);
    const [lightboxState, setLightboxState] = React.useState<{isOpen: boolean, images: ProductImages[], index: number}>({
        isOpen: false,
        images: [],
        index: 0
    });

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
        return totalSum.toLocaleString();
    }

    const getTotalProductsQuantity = (): number => {
    return orderItems.reduce((sum, item) => sum + item.quantity, 0);
}

    function handleCreateOrder() {
        router.push('/basket/buy')
    }

    function handleToProductDetails(value: OrderItemsDetails) {
        getCurrentUrlForProductDetails(value).then((result) => {
            router.push(result);
        })
    }

    const openLightbox = (details: OrderItemsDetails) => {
        if (details.defaultImage) {
            setLightboxState({
                isOpen: true,
                images: [{ imagePath: details.defaultImage } as ProductImages],
                index: 0
            });
        }
    }

    const styleText = [styles.item_text_link, 'product_details_link_button']

    return (
        <div className={styles.basket}>
            <div className={styles.content}>
                <div className={styles.items_content}>
                    <div className={styles.items_wrapper}>
                        <div>
                            <h2 className={styles.items_title}>{orderItems.length > 0 && 'Товары в корзине'}</h2>
                            {
                                orderItems.length === 0 &&
                                <ListNotContent text="Ваша корзина пуста"/>
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
                                        <img className={styles.item_image} src={'/images/Basket_image.png'} alt="No image" />
                                        :
                                        <div 
                                            className={styles.item_image_container}
                                            onClick={() => openLightbox(orderItemsDetails[value.productId])}
                                        >
                                            <img 
                                                className={styles.item_image} 
                                                src={`${process.env.NEXT_PUBLIC_API_URL}/images/get/product?name=${'small_' + orderItemsDetails[value.productId].defaultImage}`} 
                                                alt={orderItemsDetails[value.productId].name}
                                            />
                                            <div className={styles.loupe_overlay}>
                                                <SearchSvg width={32} height={32} color="#fff" />
                                            </div>
                                        </div>
                                }
                                <div className={styles.item_container}>
                                    <div className={styles.item_text_link}>
                                        <button className="product_details_link_button" onClick={() => handleToProductDetails(orderItemsDetails[value.productId])}>
                                            <h3 className={styles.item_text}>{orderItemsDetails[value.productId]?.name}</h3>
                                        </button>
                                        <div className={styles.item__summ}>
                                            <h3 className={styles.item_price}>{(value.quantity * orderItemsDetails[value.productId]?.price).toLocaleString()} &#8381;</h3>
                                            <div className={styles.item__display_mobile}>
                                                <CartItemQuantityBasket orderItem={value} productId={value.productId} productQuantity={orderItemsDetails[value.productId]?.currentQuantity} allowOrderWithoutStock={orderItemsDetails[value.productId]?.allowOrderWithoutStock}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.item__display}>
                                        <CartItemQuantityBasket orderItem={value} productId={value.productId} productQuantity={orderItemsDetails[value.productId]?.currentQuantity} allowOrderWithoutStock={orderItemsDetails[value.productId]?.allowOrderWithoutStock}/>
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
                            <h2 className={styles.buy_title}>Итого</h2>
                            <h2 className={styles.buy_title}>{getTotalPrice()} &#8381;</h2>
                        </div>
                        <div className={styles.buy_wrapper}>
                            <div className={styles.buy_contain}>
                                <h4 className={styles.buy_subtitle}>Количество товара</h4>
                                <span className={styles.dots}>............................................................................</span>
                                <h4 className={styles.buy_subtitle}>{getTotalProductsQuantity()} шт.</h4>
                            </div>
                        </div>
                        <button onClick={handleCreateOrder} className={styles.buy_button}>
                            <h3 className={styles.buy_text}>К оформлению</h3>
                        </button>
                        <button onClick={() => setIsOneClickModalOpen(true)} className={`${styles.buy_button} ${styles.buy_button_white}`}>
                            <h3 className={`${styles.buy_text} ${styles.buy_text_green}`}>Купить в 1 клик</h3>
                        </button>
                    </div>
                }
            </div>
            <OneClickOrderModal isOpen={isOneClickModalOpen} onClose={() => setIsOneClickModalOpen(false)} items={orderItems} />
        </div>
    )
}
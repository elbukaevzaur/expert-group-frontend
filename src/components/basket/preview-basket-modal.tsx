import styles from "@/components/basket/preview-basket-modal.module.css"
import Image from "next/image"
import {CloseSvg} from "@/lib/icon-svg";
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {
    ORDER_ITEMS_DETAILS_REQUEST,
} from "@/lib/reducers";
import { OrderItemsDetails } from "@/lib/models";
import {useRouter} from "next/navigation";
import Link from "next/link";
import ListNotContent from "@/components/ListNotContent";
import {
    CartItemQuantityPreviewBasket,
    RemoveAllPreviewBasket,
    RemoveItemPreviewBasket
} from "@/components/basket/basket-actions";
import {getCurrentUrlForProductDetails} from "@/components/catalog/products-list-item-component";

interface Props {
    onClose: () => void;
}

export default function PreviewBasketModal(props: Props) {
    const { orderItems, orderItemsDetails } = useAppSelector((state) => state.basket);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        dispatch(ORDER_ITEMS_DETAILS_REQUEST());
        return () => {
            setIsVisible(false);
        };
    }, [orderItems]);

    const getTotalPrice = (): string => {
        let totalSum: number = 0;
        if (orderItems.length > 0)
            orderItems.forEach((value) => {
                totalSum += Number((value.quantity * orderItemsDetails[value.productId]?.price).toFixed(2));
            })
        return totalSum.toFixed(2);
    }

    function handleNavigateToBasket() {
        handleOnClose()
        router.push("/basket");
    }

    function handleOnClose () {
        setIsVisible(false);
        setTimeout(() => {
            props.onClose();
        }, 300);
    }

    function handleToProductDetails(product: OrderItemsDetails) {
        getCurrentUrlForProductDetails(product).then((result) => {
            router.push(result)
        })
    }

    const styleImage = [styles.image, "product_details_link_button"]

    return (
        <div className={styles.overlay} onClick={handleOnClose}>
            <div className={`${styles.content} ${isVisible ? styles.show : ''}`} onClick={(e) => e.stopPropagation()}>
                <h1 className={styles.title}>Корзина</h1>
                <button onClick={handleOnClose} className={styles.close}>{<CloseSvg/>}</button>
                {
                    orderItems.length === 0 &&
                    <ListNotContent text="Вы пока ничего не добавили в корзину"/>
                }
                <div className={styles.items}>
                    {
                        orderItems.map((item, index) => {
                            return <div key={index} className={styles.item}>
                                <button onClick={() => handleToProductDetails(orderItemsDetails[item.productId])} className={styleImage.join(" ")}>
                                    {
                                        orderItemsDetails[item.productId]?.defaultImage == null ?
                                            <Image src={"/images/image.png"} alt="image" width={158} height={105}/>
                                            :
                                            <Image 
                                                width={158} 
                                                height={105}
                                                src={`${process.env.NEXT_PUBLIC_API_URL}/images/get/product?name=${'small_' + orderItemsDetails[item.productId].defaultImage}`}
                                                alt={orderItemsDetails[item.productId].name}
                                            />
                                    }
                                </button>
                                <div className={styles.wrapper}>
                                    <div className={styles.name}>
                                        <button className="product_details_link_button" onClick={() => handleToProductDetails(orderItemsDetails[item.productId])}>
                                            <h2 className={styles.text}>{orderItemsDetails[item.productId]?.name}</h2>
                                        </button>
                                        <RemoveItemPreviewBasket productId={item.productId.toString()}/>
                                    </div>
                                    <div className={styles.name}>
                                        <CartItemQuantityPreviewBasket productId={item.productId} orderItem={item} productQuantity={orderItemsDetails[item.productId]?.currentQuantity}/>
                                        <h3 className={styles.summ}>{(item.quantity * orderItemsDetails[item.productId]?.price).toFixed(2)} &#8381;</h3>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
                {
                    orderItems.length > 0 &&
                    <div className={styles.total}>
                        <h3 className={styles.total_text}>Итого <span className={styles.total_span}>{getTotalPrice()} &#8381;</span></h3>
                        <RemoveAllPreviewBasket/>
                    </div>
                }
                <div className={styles.total}>
                    <button onClick={handleNavigateToBasket} className={`${styles.button} ${styles.button_white}`}>
                        ПЕРЕЙТИ В КОРЗИНУ
                    </button>
                    {/*<div className={styles.button}>БЫСТРЫЙ ЗАКАЗ</div>*/}
                </div>
            </div>
        </div>
    )
}
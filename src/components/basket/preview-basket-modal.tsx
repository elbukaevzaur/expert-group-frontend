import styles from "@/components/basket/preview-basket-modal.module.css"
import Image from "next/image"
import {CloseSvg} from "@/lib/icon-svg";
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {
    ORDER_ITEMS_DETAILS_REQUEST,
} from "@/lib/reducers";
import { OrderItemsDetails } from "@/lib/models";
import {useRouter} from "next/navigation";
import ListNotContent from "@/components/ListNotContent";
import {
    CartItemQuantityPreviewBasket,
    RemoveItemPreviewBasket
} from "@/components/basket/basket-actions";
import {getCurrentUrlForProductDetails} from "@/components/catalog/products-list-item-component";
import { motion } from "framer-motion";

interface Props {
    onClose: () => void;
}

export default function PreviewBasketModal(props: Props) {
    const { orderItems, orderItemsDetails } = useAppSelector((state) => state.basket);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(ORDER_ITEMS_DETAILS_REQUEST());
    }, [orderItems, dispatch]);

    const getTotalPrice = (): string => {
        let totalSum: number = 0;
        if (orderItems.length > 0)
            orderItems.forEach((value) => {
                const details = orderItemsDetails[value.productId];
                if (details) {
                    totalSum += Number((value.quantity * details.price).toFixed(2));
                }
            })
        return totalSum.toLocaleString();
    }

    function handleNavigateToBasket() {
        props.onClose();
        router.push("/basket");
    }

    function handleToProductDetails(product: OrderItemsDetails) {
        if (!product) return;
        getCurrentUrlForProductDetails(product).then((result) => {
            router.push(result)
        })
    }

    const styleImage = [styles.image, "product_details_link_button"]

    return (
        <div className={styles.overlay}>
            <motion.div 
                className={styles.modal__overlay} 
                onClick={props.onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />
            <motion.div 
                className={styles.content}
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
                <div className={styles.header}>
                    <h1 className={styles.title}>Товары в корзине</h1>
                    <button onClick={props.onClose} className={styles.close}><CloseSvg/></button>
                </div>
                
                <div className={styles.body}>
                    {
                        orderItems.length === 0 ?
                        <ListNotContent text="Вы пока ничего не добавили в корзину"/>
                        :
                        <div className={styles.items}>
                            {
                                orderItems.map((item, index) => {
                                    const details = orderItemsDetails[item.productId];
                                    if (!details) return null;
                                    
                                    return <div key={index} className={styles.item}>
                                        <button onClick={() => handleToProductDetails(details)} className={styleImage.join(" ")}>
                                            {
                                                details.defaultImage == null ?
                                                    <Image src={"/images/image.png"} alt="image" width={100} height={100} style={{ objectFit: 'contain' }}/>
                                                    :
                                                    <img 
                                                        width={100} 
                                                        height={100}
                                                        src={`${process.env.NEXT_PUBLIC_API_URL}/images/get/product?name=${'small_' + details.defaultImage}`}
                                                        alt={details.name}
                                                        style={{ objectFit: 'contain' }}
                                                    />
                                            }
                                        </button>
                                        <div className={styles.wrapper}>
                                            <div className={styles.name}>
                                                <button className="product_details_link_button" onClick={() => handleToProductDetails(details)}>
                                                    <h2 className={styles.text}>{details.name}</h2>
                                                </button>
                                                <RemoveItemPreviewBasket productId={item.productId.toString()}/>
                                            </div>
                                            <div className={styles.controls_row}>
                                                <CartItemQuantityPreviewBasket 
                                                    productId={item.productId} 
                                                    orderItem={item} 
                                                    productQuantity={details.currentQuantity} 
                                                    allowOrderWithoutStock={details.allowOrderWithoutStock}
                                                />
                                                <h3 className={styles.summ}>{(item.quantity * details.price).toLocaleString()} ₽</h3>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    }
                </div>

                {orderItems.length > 0 && (
                    <div className={styles.footer}>
                        <div className={styles.total_info}>
                            <h2 className={styles.total_text}>Итого к оплате</h2>
                            <h2 className={`${styles.total_text} ${styles.total_span}`}>{getTotalPrice()} ₽</h2>
                        </div>
                        <button onClick={handleNavigateToBasket} className={styles.button}>ПЕРЕЙТИ В КОРЗИНУ</button>
                    </div>
                )}
            </motion.div>
        </div>
    )
}
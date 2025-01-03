import styles from "@/components/preview-basket-modal.module.css"
import Image from "next/image"
import {MinusSmall, PlusSmall, CloseSvg, CloseSmall} from "@/lib/icon-svg";
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {
    BASKET_CLEAR,
    ORDER_ITEMS_DECREMENT,
    ORDER_ITEMS_DETAILS_REQUEST,
    ORDER_ITEMS_INCREMENT,
    REMOVE
} from "@/lib/reducers";
import {OrderItems, OrderItemsRequest} from "@/lib/models";
import {useRouter} from "next/navigation";

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

    function handleNavigateToBasket() {
        handleOnClose()
        router.push("/basket");
    }

    function handleOnClose () {
        setIsVisible(false); 
        setTimeout(() => {
            props.onClose();
        }, 300);
    };

    return (
        <div className={styles.overlay} onClick={handleOnClose}>
            <div className={`${styles.content} ${isVisible ? styles.show : ''}`} onClick={(e) => e.stopPropagation()}>
                <h1 className={styles.title}>Корзина</h1>
                <button onClick={handleOnClose} className={styles.close}>{<CloseSvg/>}</button>
                {
                    orderItems.length === 0 && <span style={{paddingLeft: 27, paddingRight: 27}}>Вы пока ничего не добавили в корзину</span>
                }
                <div className={styles.items}>
                    {
                        orderItems.map((item, index) => {
                            return <div key={index} className={styles.item}>
                                <div className={styles.image}>
                                    <Image src={"/images/image.png"} alt="image" width={158} height={105}/>
                                </div>
                                <div className={styles.wrapper}>
                                    <div className={styles.name}>
                                        <h2 className={styles.text}>{orderItemsDetails[item.productId]?.name}</h2>
                                        <button onClick={() => removeFromBasket(item)} className={styles.delete}>{<CloseSmall/>}</button>
                                    </div>
                                    <div className={styles.name}>
                                        <div className={styles.name}>
                                            <button onClick={() => handleRemoveFromBasket(item)} className={styles.quantity_button}><MinusSmall/></button>
                                            <h3 className={styles.quantity}>{item.quantity}</h3>
                                            <button onClick={() => handleAddToBasket(item)} className={styles.quantity_button}><PlusSmall/></button>
                                        </div>
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
                        <button onClick={removeAllFromBasket} className={styles.clear}>Очистить {<CloseSmall stroke={'#7B7B7B'}/>}</button>
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
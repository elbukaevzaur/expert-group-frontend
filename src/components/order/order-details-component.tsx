"use client"

import styles from "@/components/order/order-details-component.module.css";
import Image from "next/image";
import {changeOrderStatus, findMeOrderItemsByOrderRequest, findMeOrdersGetRequest} from "@/lib/http/ordersRequest";
import {useEffect, useState} from "react";
import {ChangeOrderStatusRequest, OrderItemsProductResponse, Orders, OrderStatusEnum} from "@/lib/models";
import moment from "moment/moment";
import {getStatusInfo} from "@/lib/constants/statusConstants";
import LoadingCard from "@/components/loading/loading-card";
import LoadingTableRow from "@/components/loading/loading-table-row";

interface Props {
    orderId: number,
}

export default function OrderDetailsComponent(props: Props) {
    const { orderId } = props;
    const [orderItems, setOrderItems] = useState<OrderItemsProductResponse[]>([]);
    const [order, setOrder] = useState<Orders>({} as Orders);
    const [isLoadingOrder, setIsLoadingOrder] = useState(true);
    const [isLoadingOrderItems, setIsLoadingOrderItems] = useState(true);

    useEffect(() => {
        loadData();
    }, [orderId]);

    const handleChangeOrderStatus = (nextStatus: OrderStatusEnum) => {
        const request: ChangeOrderStatusRequest = {
            orderId: orderId,
            status: nextStatus
        }

        changeOrderStatus(request).then((resp) => loadData());
    }

    function loadData() {
        findMeOrdersGetRequest(orderId).then((orderResp) => {
            setOrder(orderResp.data)
            setTimeout(() => setIsLoadingOrder(false), 500)
            findMeOrderItemsByOrderRequest(orderId).then((resp) => {
                setOrderItems(resp.data);
                setTimeout(() => setIsLoadingOrderItems(false), 500)
            })
        })
    }

    const getTotalPrice = (): string => {
        let totalSum: number = 0;
        if (orderItems.length > 0)
            orderItems.forEach((value) => {
                totalSum += Number((value.quantity * value.price).toFixed(2));
            })
        return totalSum.toFixed(2);
    }


    return <div className={styles.buy}>
        {
            isLoadingOrder ?
                <div>
                    <LoadingTableRow rowCount={2}/>
                </div>:
                <>
                    <h1 className={styles.order_title}>Заказ №{orderId}</h1>
                    <div className={styles.order}>
                        <h4 className={styles.order_text}>Статус заказа: <span
                            className={styles.order_span}>{getStatusInfo(order.status).title}</span></h4>
                        <h4 className={styles.order_text}>Дата заказа: {moment(order.createdAt).format("DD.MM.YYYY HH:mm")}</h4>
                    </div>
                    <div className={styles.title_wrapper}>
                        <h2 className={styles.title}>Товары в заказе</h2>
                        <p className={styles.subtitle}>/{orderItems.length} шт.</p>
                    </div>
                </>
        }
        <div className={styles.wrapper}>
            <div className={styles.items}>
                {
                    !isLoadingOrderItems ?
                    orderItems.map((item, index) => {
                        return <div key={index} className={styles.item}>
                            <Image
                                className={styles.item_image} src={"/images/image.png"} alt="Image" width={283}
                                height={100}/>
                            <div className={styles.item_wrapper}>
                                <h3 className={styles.item_name}>{item.product.name}</h3>
                                <h3 className={styles.item_name}>{item.quantity} шт</h3>
                                <h3 className={styles.item_summ}>{item.quantity * item.price} &#8381;</h3>
                            </div>
                        </div>
                    })
                        :
                        <div className={styles.order_items_loading_container}>
                            <LoadingTableRow rowCount={3}/>
                            <LoadingTableRow rowCount={3}/>
                            <LoadingTableRow rowCount={3}/>
                        </div>
                }
                {
                    !isLoadingOrderItems ?
                        <div className={styles.total}>
                            <div className={styles.total_wrapper}>
                                <h3 className={styles.total_title}>Итого:</h3>
                                <h3 className={`${styles.total_title} ${styles.total_title_color}`}>{getTotalPrice()} &#8381;/шт
                                </h3>
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
                            <h3 className={`${styles.total_text} ${styles.total_text_weight} ${styles.total_wrapper_margin}`}>Банковской
                                картой онлайн</h3>
                            <h3 className={`${styles.total_text} ${styles.total_text_weight}`}>Доставка:</h3>
                            <h3 className={`${styles.total_text} ${styles.total_text_weight} ${styles.total_title_color}`}>Самовывоз</h3>
                            {
                                getStatusInfo(order.status).actions.map((item, index) => {
                                    return <button key={index}
                                                   className={styles.total_button} onClick={() => handleChangeOrderStatus(item)}>{getStatusInfo(item).actionTitle}</button>
                                })
                            }
                        </div>
                        :
                        <LoadingCard/>
                }
            </div>
        </div>
    </div>
}
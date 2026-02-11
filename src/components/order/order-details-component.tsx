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

    const getTotalProductsQuantity = (): number => {
    return orderItems.reduce((sum, item) => sum + item.quantity, 0);
    }


    return <div className={styles.page}>
        {
            isLoadingOrder ?
                <div>
                    <LoadingTableRow rowCount={2}/>
                </div>:
                <>
                    <h1 className={styles.order_title}>Заказ №{orderId}</h1>
                    <div className={styles.order}>
                        <h4 className={styles.order_text}>Дата заказа: <span
                            className={styles.order_span}>{moment(order.createdAt).format("DD.MM.YYYY HH:mm")}</span></h4>
                        <h4 className={styles.order_text}>Статус заказа: <span
                            className={styles.order_span}>{getStatusInfo(order.status).title}</span></h4>
                        {order.pickupPoint && (
                            <div className={styles.pickup_info}>
                                <h4 className={styles.order_text} style={{ color: '#272323', marginBottom: '5px' }}>Пункт самовывоза:</h4>
                                <h4 className={styles.order_text} style={{ fontSize: '15px' }}>{order.pickupPoint.name}</h4>
                                <p className={styles.order_text} style={{ fontSize: '14px', fontWeight: 400 }}>{order.pickupPoint.address}</p>
                                {order.pickupPoint.workingHours && (
                                    <p className={styles.order_text} style={{ fontSize: '13px', fontWeight: 500, color: '#21a038', marginTop: '5px' }}>
                                        {order.pickupPoint.workingHours}
                                    </p>
                                )}
                            </div>
                        )}
                        {order.deliveryAddress && (
                            <div className={styles.pickup_info} style={{ borderLeftColor: '#3D9BFF' }}>
                                <h4 className={styles.order_text} style={{ color: '#272323', marginBottom: '5px' }}>Адрес доставки:</h4>
                                <p className={styles.order_text} style={{ fontSize: '15px', fontWeight: 500 }}>{order.deliveryAddress}</p>
                            </div>
                        )}
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
                                {/* <h3 className={styles.item_name}>{item.quantity} шт</h3> */}
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
            </div>
                {
                    !isLoadingOrderItems ?
                    <div className={styles.buy}>
                        <div className={styles.buy_total}>
                            <h2 className={styles.buy_title}>Итого</h2>
                        </div>
                        <div className={styles.buy_wrapper}>
                            <div className={styles.buy_contain}>
                                <h4 className={styles.buy_subtitle}>Количество товара</h4>
                                <span className={styles.dots}>............................................................................</span>
                                <h4 className={styles.buy_subtitle}>{getTotalProductsQuantity()} шт.</h4>
                            </div>
                            <div className={styles.buy_contain}>
                                <h4 className={styles.buy_subtitle}>Доставка</h4>
                                <span className={styles.dots}>............................................................................</span>
                                <h4 className={styles.buy_subtitle}>Бесплатно</h4>
                            </div>
                            <div className={styles.buy_contain}>
                                <h4 className={styles.buy_subtitle}>Итоговая сумма</h4>
                                <span className={styles.dots}>............................................................................</span>
                                <h4 className={styles.buy_title}>{getTotalPrice()}&#8381;</h4>
                            </div>
                        </div>
                        {
                                getStatusInfo(order.status).actions.map((item, index) => {
                                    return <button key={index}
                                                   className={styles.buy_button} onClick={() => handleChangeOrderStatus(item)}>{getStatusInfo(item).actionTitle}</button>
                                })
                            }
                    </div>
                        :
                        <LoadingCard/>
                }
        </div>
    </div>
}
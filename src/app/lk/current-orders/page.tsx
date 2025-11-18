"use client"

import {useEffect, useState} from "react";
import OrderListItemView from "@/components/order/orderListItemViewComponent";
import ListNotContent from "@/components/ListNotContent";
import LoadingTableRow from "@/components/loading/loading-table-row";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {CURRENT_ORDERS_REQUEST} from "@/lib/reducers";

export default function Page() {
    const dispatch = useAppDispatch();
    const { currentOrders } = useAppSelector((state) => state.orders);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Запрашиваем заказы через Redux
        dispatch(CURRENT_ORDERS_REQUEST());
        // Устанавливаем задержку для скрытия индикатора загрузки
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, [dispatch]);

    // Обновляем состояние загрузки при изменении Redux state
    useEffect(() => {
        if (currentOrders !== undefined) {
            setIsLoading(false);
        }
    }, [currentOrders]);

    return (
        <div className="history">
            <div className="table">
                <div className='table_title'>Дата</div>
                <div className='table_title'>Номер заказа</div>
                <div className='table_title'>Доставка</div>
                <div className='table_title'>Оплата</div>
                <div className='table_title'>Сумма</div>
                <div className='table_title'>Статус</div>
            </div>
            {
                !isLoading ?
                    currentOrders && currentOrders.length > 0 ?
                        currentOrders.map((item, index) => {
                            return <OrderListItemView key={index} order={item}/>
                        })
                        :
                        <ListNotContent text="Список заказов пуст"/>
                    :
                    <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
                        <LoadingTableRow rowCount={6}/>
                        <LoadingTableRow rowCount={6}/>
                        <LoadingTableRow rowCount={6}/>
                    </div>
            }
        </div>
    )
}
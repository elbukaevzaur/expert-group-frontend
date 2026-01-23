"use client"

import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {useEffect, useState} from "react";
import {ALL_ORDERS_REQUEST} from "@/lib/reducers";
import OrderListItemView from "@/components/order/orderListItemViewComponent";
import ListNotContent from "@/components/ListNotContent";
import {findMeAllOrdersRequest} from "@/lib/http/ordersRequest";
import {Orders} from "@/lib/models";
import LoadingTableRow from "@/components/loading/loading-table-row";

export default function Page() {
  const [allOrders, setAllOrders] = useState<Orders[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleAllOrdersRequest();
  }, []);

  const handleAllOrdersRequest = () => {
    findMeAllOrdersRequest().then((resp) => {
      setAllOrders(resp.data);
      setTimeout(() => setIsLoading(false), 500);
    })
  }

  return (
    <div className="history">
      <div className="table">
        <div className='table_title'>Дата</div>
        <div className='table_title'>Номер заказа</div>
        <div className='table_title'>Доставка</div>
        <div className='table_title'>Оплата</div>
        <div className='table_title'>Сумма</div>
        <div className='table_title'>Статус</div>
        <div className='table_title'>Действие</div>
      </div>
      {
        !isLoading ?
        allOrders.length > 0 ?
        allOrders.map((item, index) => {
          return <OrderListItemView key={index} order={item}/>
        })
            :
            <ListNotContent text="Список заказов пуст"/>

            :
            <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
              <LoadingTableRow rowCount={6} />
              <LoadingTableRow rowCount={6} />
              <LoadingTableRow rowCount={6} />
            </div>

      }
      
    </div>
  );
}

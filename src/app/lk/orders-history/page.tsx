"use client"

import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {useEffect} from "react";
import {ALL_ORDERS_REQUEST} from "@/lib/reducers";
import OrderListItemView from "@/components/order/orderListItemViewComponent";

export default function Page() {
  const { allOrders } = useAppSelector((state) => state.orders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ALL_ORDERS_REQUEST())
  }, []);

  return (
    <div className="history">
      {
        allOrders.length > 0 ?
        allOrders.map((item, index) => {
          return <OrderListItemView key={index} order={item}/>
        })
            :
            <div style={{
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex'
            }}>
              <h2>Список заказов пуст</h2>
            </div>
      }
    </div>
  );
}

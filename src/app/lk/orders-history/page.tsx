"use client"

import Image from "next/image";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {useEffect} from "react";
import {ALL_ORDERS_REQUEST} from "@/lib/reducers";

export default function Page() {
  const { allOrders } = useAppSelector((state) => state.orders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ALL_ORDERS_REQUEST())
  }, []);

  return (
    <div className="history">
      {
        allOrders.map((item, index) => {
          return <div key={index} className="history__item">
            <Image
                className="history__item_img"
                src={"/images/image.png"}
                alt="Изображение"
                width={166}
                height={95}
            />
            <div className="history__item_content">
              <div className="history__item_wrapper">
                <h3 className="history__item_text">Гладкий отливной карниз Кт-68, 56Hx34мм</h3>
                <h3 className="history__item_text history__item_width">Статус:{" "}<span className="history__item_span">{item.status}</span>
                </h3>
              </div>
              <div className="history__item_wrapper">
                <h3 className="history__item_text history__item_width">№ Заказа: {item.id}</h3>
                <h3 className="history__item_text history__item_width">Итого: {item.total} ₽</h3>
              </div>
            </div>
            <div className="history__item_wrapper">
              <button className="history__item_button">Посмотреть детали</button>
            </div>
          </div>
        })
      }
    </div>
  );
}

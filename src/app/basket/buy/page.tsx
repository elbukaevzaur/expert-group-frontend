"use client";

import styles from "@/app/basket/buy/buy.module.css";
import Image from "next/image";
import {
  CREATE_ORDER_REQUEST,
  ORDER_ITEMS_DETAILS_REQUEST,
} from "@/lib/reducers";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useEffect, useState } from "react";
import { OrderItemsDetails } from "@/lib/models";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCurrentUrlForProductDetails } from "@/components/catalog/products-list-item-component";
import { Login } from "@/components/login/login-modal";
import { BusSVG, LocationSvg } from "@/lib/icon-svg";
import YandexMap from "@/components/maps/YandexMap";

export default function Buy() {
  const dispatch = useAppDispatch();
  const { orderItems, orderItemsDetails } = useAppSelector(
    (state) => state.basket,
  );
  const { isAuth } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [pendingOrder, setPendingOrder] = useState(false);

  useEffect(() => {
    dispatch(ORDER_ITEMS_DETAILS_REQUEST());
  }, []);

  useEffect(() => {
    // Если пользователь авторизовался и был запрос на оформление заказа
    if (isAuth && pendingOrder) {
      setPendingOrder(false);
      setIsLoginVisible(false);
      // Продолжаем оформление заказа
      dispatch(CREATE_ORDER_REQUEST());
      router.push("/lk/current-orders");
    }
  }, [isAuth, pendingOrder, dispatch, router]);

  const getTotalPrice = (): string => {
    let totalSum: number = 0;
    if (orderItems.length > 0)
      orderItems.forEach((value) => {
        totalSum += Number(
          (value.quantity * orderItemsDetails[value.productId]?.price).toFixed(
            2,
          ),
        );
      });
    return totalSum.toFixed();
  };

  const getTotalProductsQuantity = (): number => {
    return orderItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  function handleCreateOrder() {
    // Проверяем авторизацию
    if (!isAuth) {
      // Сохраняем намерение создать заказ и показываем модальное окно авторизации
      setPendingOrder(true);
      setIsLoginVisible(true);
      return;
    }
    // Если авторизован, создаем заказ
    dispatch(CREATE_ORDER_REQUEST());
    router.push("/lk/current-orders");
  }

  function handleToProductDetails(value: OrderItemsDetails) {
    getCurrentUrlForProductDetails(value).then((result) => {
      router.push(result);
    });
  }

  const styleImage = [styles.item_image, "product_details_link_button"];

  return (
    <div className={styles.buy}>
      <div className={styles.wrapper}>
        <div className={styles.contain}>
          <h1 className={styles.title}>Укажите ваши данные</h1>
          <div className={styles.grid}>
            <input className={styles.input} type="text" placeholder="ФИО" />
            <input className={styles.input} type="text" placeholder="Телефон" />
            <input
              className={styles.input}
              type="email"
              placeholder="Электронный адрес"
            />
            <input className={styles.input} type="text" placeholder="Город" />
          </div>
          <h1 className={styles.title}>Способ получения заказа</h1>
          <div className={styles.buttons}>
            <button className={styles.button}>
              <LocationSvg
                stroke="rgba(39, 35, 35, 1)"
                width={20}
                height={20}
              />
              <div className={styles.button_wrapper}>
                <h4 className={styles.button_title}>Самовывоз</h4>
                <p className={styles.button_subtitle}>Бесплатно</p>
              </div>
            </button>
            <button className={styles.button}>
              <BusSVG />
              <div className={styles.button_wrapper}>
                <h4 className={styles.button_title}>Доставка</h4>
                <p className={styles.button_subtitle}>от 1000 ₽</p>
              </div>
            </button>
          </div>
          <h5 className={styles.address}>
            ​г.Грозный,улица Нурсултана Назарбаева, 79
          </h5>
          <h5 className={styles.address}>Ежедневно с 09:00 до 18:00</h5>
          <div className={styles.map}>
            <YandexMap />
          </div>
          <h1 className={styles.title}>Способ оплаты</h1>
          <div className={styles.buttons}>
            <button className={styles.button}>
              <LocationSvg
                stroke="rgba(39, 35, 35, 1)"
                width={20}
                height={20}
              />
              <div className={styles.button_wrapper}>
                <h4 className={styles.button_title}>Оплата онлайн</h4>
              </div>
            </button>
            <button className={styles.button}>
              <BusSVG />
              <div className={styles.button_wrapper}>
                <h4 className={styles.button_title}>Наличный расчет</h4>
              </div>
            </button>
          </div>
        </div>
        <div className={styles.total}>
          <div className={styles.total_total}>
            <h2 className={styles.total_title}>Итого</h2>
          </div>
          <div className={styles.total_wrapper}>
            <div className={styles.total_contain}>
              <h4 className={styles.total_subtitle}>Количество товара</h4>
              <span className={styles.dots}>
                ........................................................................................................
              </span>
              <h4 className={styles.total_subtitle}>
                {" "}
                {getTotalProductsQuantity()} шт.
              </h4>
            </div>
            <div className={styles.total_contain}>
              <h4 className={styles.total_subtitle}>Доставка</h4>
              <span className={styles.dots}>
                ........................................................................................................
              </span>
              <h4 className={styles.total_subtitle}>Бесплатно</h4>
            </div>
            <div className={styles.total_contain}>
              <h4 className={styles.total_subtitle}>Итоговая сумма</h4>
              <span className={styles.dots}>
                ........................................................................................................
              </span>
              <h4 className={styles.total_title}>{getTotalPrice()}&#8381;</h4>
            </div>
          </div>
          <button onClick={handleCreateOrder} className={styles.total_button}>
            <h3 className={styles.total_text}>К оформлению</h3>
          </button>
        </div>
      </div>
      {isLoginVisible && (
        <Login
          onCloseModal={() => {
            setIsLoginVisible(false);
            setPendingOrder(false);
          }}
        />
      )}
    </div>
  );
}

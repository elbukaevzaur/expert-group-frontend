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
import { getActivePickupPointsRequest, PickupPoint } from "@/lib/http/pickupPointsRequest";

export default function Buy() {
  const dispatch = useAppDispatch();
  const { orderItems, orderItemsDetails } = useAppSelector(
    (state) => state.basket,
  );
  const { isAuth, user } = useAppSelector((state) => state.auth);
  const { selectedCity } = useAppSelector((state) => state.app);
  const router = useRouter();
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup');
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cash'>('online');
  const [pickupPoints, setPickupPoints] = useState<PickupPoint[]>([]);
  const [selectedPickupPointId, setSelectedPickupPointId] = useState<number | null>(null);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [cityName, setCityName] = useState(selectedCity);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    dispatch(ORDER_ITEMS_DETAILS_REQUEST());
    getActivePickupPointsRequest().then(res => {
      setPickupPoints(res.data);
      if (res.data.length > 0) {
        setSelectedPickupPointId(res.data[0].id);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      if (!fullName) setFullName(user.fullName || '');
      if (!phone) setPhone(user.phoneNumber || '');
      if (!email) setEmail(user.email || '');
      if (user.city && (!cityName || cityName === selectedCity)) setCityName(user.city);
    }
  }, [user, selectedCity, fullName, phone, email, cityName]);

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
      setIsLoginVisible(true);
      return;
    }
    // Если авторизован, создаем заказ
    dispatch(CREATE_ORDER_REQUEST({ 
      pickupPointId: deliveryMethod === 'pickup' ? selectedPickupPointId : null,
      deliveryAddress: deliveryMethod === 'delivery' ? deliveryAddress : null,
      fullName,
      phone,
      email,
      city: cityName,
      comment
    }));
    router.push("/lk/current-orders");
  }

  function handleToProductDetails(value: OrderItemsDetails) {
    getCurrentUrlForProductDetails(value).then((result) => {
      router.push(result);
    });
  }

  const selectedPoint = pickupPoints.find(p => p.id === selectedPickupPointId);

  return (
    <div className={styles.buy}>
      <Link href="/basket" className={styles.back_link}>
        <span style={{ marginRight: '8px' }}>←</span> Вернуться в корзину
      </Link>
      <div className={styles.wrapper}>
        <div className={styles.contain}>
          <h1 className={styles.title}>Оформление заказа</h1>
          <div className={styles.section_title}>1. Контактные данные</div>
          <div className={styles.grid}>
            <input 
              className={styles.input} 
              type="text" 
              placeholder="ФИО" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input 
              className={styles.input} 
              type="text" 
              placeholder="Телефон" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              className={styles.input}
              type="email"
              placeholder="Электронный адрес"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className={styles.input}
              type="text"
              placeholder="Город"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
            />
          </div>
          <div className={styles.comment_section}>
            <h4 className={styles.label_simple}>Комментарий к заказу</h4>
            <textarea
              className={styles.textarea_simple}
              placeholder="Напишите ваши пожелания к заказу"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
          </div>
          <div className={styles.section_title}>2. Способ получения</div>
          <div className={styles.buttons}>
            <button 
              className={`${styles.button} ${deliveryMethod === 'pickup' ? styles.button_active : ''}`}
              onClick={() => setDeliveryMethod('pickup')}
            >
              <LocationSvg
                stroke={deliveryMethod === 'pickup' ? "#21a038" : "rgba(39, 35, 35, 1)"}
                width={20}
                height={20}
              />
              <div className={styles.button_wrapper}>
                <h4 className={styles.button_title}>Самовывоз</h4>
                <p className={styles.button_subtitle}>Бесплатно</p>
              </div>
            </button>
            <button 
              className={`${styles.button} ${deliveryMethod === 'delivery' ? styles.button_active : ''}`}
              onClick={() => setDeliveryMethod('delivery')}
            >
              <BusSVG color={deliveryMethod === 'delivery' ? "#21a038" : undefined} />
              <div className={styles.button_wrapper}>
                <h4 className={styles.button_title}>Доставка</h4>
                <p className={styles.button_subtitle}>от 1000 ₽</p>
              </div>
            </button>
          </div>

          {deliveryMethod === 'pickup' ? (
            <div className={styles.pickup_selection}>
              <h4 className={styles.select_title}>Выберите пункт самовывоза:</h4>
              <div className={styles.pickup_list}>
                {pickupPoints.map(point => (
                  <div 
                    key={point.id} 
                    className={`${styles.pickup_item} ${selectedPickupPointId === point.id ? styles.pickup_item_active : ''}`}
                    onClick={() => setSelectedPickupPointId(point.id)}
                  >
                    <div className={styles.pickup_info}>
                      <h5 className={styles.pickup_name}>{point.name}</h5>
                      <p className={styles.pickup_address}>{point.address}</p>
                      {point.workingHours && <p className={styles.pickup_hours}>{point.workingHours}</p>}
                    </div>
                    <div className={styles.pickup_radio}>
                      <div className={styles.radio_outer}>
                        {selectedPickupPointId === point.id && <div className={styles.radio_inner} />}
                      </div>
                    </div>
                  </div>
                ))}
                {pickupPoints.length === 0 && <p className={styles.no_points}>Пункты самовывоза не найдены</p>}
              </div>
            </div>
          ) : (
            <div className={styles.delivery_address_container}>
              <h4 className={styles.select_title}>Укажите адрес доставки:</h4>
              <textarea 
                className={styles.textarea} 
                placeholder="Улица, дом, квартира/офис, подъезд, этаж"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
              />
              <p className={styles.delivery_note}>Стоимость доставки будет уточнена менеджером (от 1000 ₽)</p>
            </div>
          )}
          
          {deliveryMethod === 'pickup' && (
            <div className={styles.map}>
              <YandexMap 
                latitude={selectedPoint?.latitude} 
                longitude={selectedPoint?.longitude} 
              />
            </div>
          )}
          <div className={styles.section_title}>3. Способ оплаты</div>
          <div className={styles.buttons}>
            <button 
              className={`${styles.button} ${paymentMethod === 'online' ? styles.button_active : ''}`}
              onClick={() => setPaymentMethod('online')}
            >
              <LocationSvg
                stroke={paymentMethod === 'online' ? "#21a038" : "rgba(39, 35, 35, 1)"}
                width={20}
                height={20}
              />
              <div className={styles.button_wrapper}>
                <h4 className={styles.button_title}>Оплата онлайн</h4>
              </div>
            </button>
            <button 
              className={`${styles.button} ${paymentMethod === 'cash' ? styles.button_active : ''}`}
              onClick={() => setPaymentMethod('cash')}
            >
              <BusSVG color={paymentMethod === 'cash' ? "#21a038" : undefined} />
              <div className={styles.button_wrapper}>
                <h4 className={styles.button_title}>Наличный расчет</h4>
              </div>
            </button>
          </div>
        </div>
        <div className={styles.total}>
          <div className={styles.total_total}>
            <h2 className={styles.total_title}>Ваш заказ</h2>
          </div>
          <div className={styles.total_wrapper}>
            <div className={styles.total_items_list}>
              {orderItems.map((item, index) => {
                const details = orderItemsDetails[item.productId];
                if (!details) return null;
                return (
                  <div key={index} className={styles.total_item}>
                    <div className={styles.total_item_info}>
                      <span className={styles.total_item_name}>{details.name}</span>
                      <span className={styles.total_item_quantity}>{item.quantity} шт.</span>
                    </div>
                    <span className={styles.total_item_price}>{(item.quantity * details.price).toLocaleString()} ₽</span>
                  </div>
                );
              })}
            </div>
            <div className={styles.total_contain} style={{ marginTop: '10px' }}>
              <h4 className={styles.total_subtitle}>Товары ({getTotalProductsQuantity()})</h4>
              <h4 className={styles.total_subtitle}>{Number(getTotalPrice()).toLocaleString()} ₽</h4>
            </div>
            <div className={styles.total_contain}>
              <h4 className={styles.total_subtitle}>Доставка</h4>
              <h4 className={styles.total_subtitle}>{deliveryMethod === 'pickup' ? 'Бесплатно' : 'от 1000 ₽'}</h4>
            </div>
            <div className={styles.total_contain} style={{ marginTop: '15px', borderTop: '1px solid #E8E8E8', paddingTop: '15px' }}>
              <h2 className={styles.total_title} style={{ fontSize: '20px' }}>Итого</h2>
              <h2 className={styles.total_title} style={{ fontSize: '22px', color: '#21a038' }}>
                {(Number(getTotalPrice()) + (deliveryMethod === 'delivery' ? 1000 : 0)).toLocaleString()} ₽
              </h2>
            </div>
          </div>
          <button onClick={handleCreateOrder} className={styles.total_button}>
            <h3 className={styles.total_text}>Оформить заказ</h3>
          </button>
        </div>
      </div>
      {isLoginVisible && (
        <Login
          onCloseModal={() => {
            setIsLoginVisible(false);
          }}
        />
      )}
    </div>
  );
}

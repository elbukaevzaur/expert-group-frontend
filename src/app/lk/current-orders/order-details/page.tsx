import styles from "@/app/lk/current-orders/order-details/order-details.module.css";
import Image from "next/image";

export default function orderDetails() {
  return (
    <div className={styles.buy}>
        <h1 className={styles.order_title}>Заказ №20911</h1>
        <div className={styles.order}>
            <h4 className={styles.order_text}>Статус заказа: <span className={styles.order_span}>В ожидании</span></h4>
            <h4 className={styles.order_text}>Дата заказа: 10.01.2025</h4>
        </div>
      <div className={styles.title_wrapper}>
        <h2 className={styles.title}>Товары в заказе</h2>
        <p className={styles.subtitle}>/5 шт.</p>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.items}>
          <div className={styles.item}>
            <Image
              className={styles.item_image} src={"/images/image.png"} alt="Image" width={283} height={100}/>
            <div className={styles.item_wrapper}>
              <h3 className={styles.item_name}>Гладкий отливной карниз Кт-68, 56Hx34мм</h3>
              <h3 className={styles.item_name}>2 шт</h3>
              <h3 className={styles.item_summ}>1030 &#8381;</h3>
            </div>
          </div>
          <div className={styles.total}>
            <div className={styles.total_wrapper}>
              <h3 className={styles.total_title}>Итого:</h3>
              <h3 className={`${styles.total_title} ${styles.total_title_color}`}>3052 &#8381;/шт
              </h3>
            </div>
            <div className={`${styles.total_wrapper} ${styles.total_wrapper_margin}`}>
              <h3 className={styles.total_text}>Товаров на:</h3>
              <h3 className={`${styles.total_text} ${styles.total_text_weight}`}>8546 &#8381;/шт</h3>
            </div>
            <div className={`${styles.total_wrapper} ${styles.total_wrapper_margin}`}>
              <h3 className={styles.total_text}>Доставка:</h3>
              <h3 className={`${styles.total_text} ${styles.total_text_weight}`}>Бесплатно</h3>
            </div>
            <h3 className={`${styles.total_text} ${styles.total_text_weight}`}>Оплата:</h3>
            <h3 className={`${styles.total_text} ${styles.total_text_weight} ${styles.total_wrapper_margin}`}>Банковской картой онлайн</h3>
            <h3 className={`${styles.total_text} ${styles.total_text_weight}`}>Доставка:</h3>
            <h3 className={`${styles.total_text} ${styles.total_text_weight} ${styles.total_title_color}`}>Самовывоз</h3>
            <button className={styles.total_button}>Отменить заказ</button>
          </div>
        </div>
      </div>
    </div>
  );
}

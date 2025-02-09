import { Orders } from "@/lib/models";
import styles from "@/components/order/orderListItemViewComponent.module.css";
import Link from "next/link";

interface Props {
  order: Orders;
}
export default function OrderListItemView(props: Props) {
  const { order } = props;

  return (
    <div className={styles.history__table}>
      <h4 className={styles.history__table_row}>03.01.2025</h4>
      <h4 className={styles.history__table_row}><span className={`${styles.history__table_row} ${styles.history__table_span}`}>№</span>{order.id}</h4>
      <h4 className={styles.history__table_row}>г.Грозный ул. 8марта</h4>
      <h4 className={styles.history__table_row}>Банковский перевод</h4>
      <h4 className={styles.history__table_row}><span className={`${styles.history__table_row} ${styles.history__table_span}`}>Сумма: </span>{order.total} ₽</h4>
      <h4 className={`${styles.history__table_row} ${styles.history__table_row_color}`}><span className={`${styles.history__table_row} ${styles.history__table_span}`}>Статус: </span>{order.status}</h4>
      <Link className={`${styles.history__table_row} ${styles.history__table_link}`} href={"/lk/current-orders/order-details"}>Посмотреть детали</Link>
    </div>
    // <div className={styles.history__item}>
    //     <div className={styles.history__item_content}>
    //         <div className={styles.history__item_wrapper}>
    //             <h3 className={`${styles.history__item_text}}`}>Гладкий отливной карниз Кт-68, 56Hx34мм  </h3>
    //             <h3 className={`${styles.history__item_text} ${styles.history__item_width}`}>Статус:{" "}<span
    //                 className={styles.history__item_span}>{order.status}</span>
    //             </h3>
    //         </div>
    //         <div className={styles.history__item_wrapper}>
    //         <h3 className={`${styles.history__item_text} ${styles.history__item_width}`}>№ Заказа: {order.id}</h3>
    //             <h3 className={`${styles.history__item_text} ${styles.history__item_width}`}>Итого: {order.total} ₽</h3>
    //         </div>
    //     </div>
    //     <Link href={'/lk/current-orders/order-details'}>
    //     <div className={styles.history__item_wrapper}>

    //         <button className={styles.history__item_button}>Посмотреть детали</button>

    //     </div>
    //     </Link>
    // </div>
  );
}

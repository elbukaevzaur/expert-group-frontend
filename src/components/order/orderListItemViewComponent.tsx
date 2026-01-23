import { Orders } from "@/lib/models";
import styles from "@/components/order/orderListItemViewComponent.module.css";
import Link from "next/link";
import moment from "moment";
import {getStatusInfo} from "@/lib/constants/statusConstants";

interface Props {
  order: Orders;
}
export default function OrderListItemView(props: Props) {
  const { order } = props;

  return (
    <>
    <div className={styles.history__table}>
      <h4 className={styles.history__table_row}>{moment(order.createdAt).format("DD.MM.YYYY")}</h4>
      <h4 className={styles.history__table_row}><span className={`${styles.history__table_row} ${styles.history__table_span}`}>№</span>{order.id}</h4>
      <h4 className={styles.history__table_row}>г.Грозный ул. 8марта</h4>
      <h4 className={styles.history__table_row}>Банковский перевод</h4>
      <h4 className={styles.history__table_row}><span className={`${styles.history__table_row} ${styles.history__table_span}`}>Сумма: </span>{order.total} ₽</h4>
      <h4 className={`${styles.history__table_row} ${styles.history__table_row_color}`}><span className={`${styles.history__table_row} ${styles.history__table_span}`}>Статус: </span>{getStatusInfo(order.status).title}</h4>
      <Link className={`${styles.history__table_row} ${styles.history__table_link}`} href={`/lk/current-orders/${order.id}`}>Посмотреть детали</Link>
    </div>
    <div className={styles.mobile}>
      <h1 className={styles.mobile__title}>№ {order.id}</h1>
      <div className={styles.mobile__wrapper}>
        <h3 className={styles.mobile__text}>Дата заказа</h3>
        <h3 className={styles.mobile__text}>{moment(order.createdAt).format("DD.MM.YYYY")}</h3>
      </div>
      <div className={styles.mobile__wrapper}>
        <h3 className={styles.mobile__text}>Доставка</h3>
        <h3 className={styles.mobile__text}>г.Грозный ул. 8марта</h3>
      </div>
      <div className={styles.mobile__wrapper}>
        <h3 className={styles.mobile__text}>Оплата</h3>
        <h3 className={styles.mobile__text}>Банковский перевод</h3>
      </div>
      <div className={styles.mobile__wrapper}>
        <h3 className={styles.mobile__text}>Сумма</h3>
        <h3 className={styles.mobile__text}>{order.total} ₽</h3>
      </div>
      <div className={styles.mobile__wrapper}>
        <h3 className={styles.mobile__text}>Статус</h3>
        <h3 className={`${styles.mobile__text} ${styles.history__table_row_color}`}>{getStatusInfo(order.status).title}</h3>
      </div>
      <button className={styles.mobile__button}>Детали заказа</button>
    </div>
    </>
  );
}

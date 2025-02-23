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
    <div className={styles.history__table}>
      <h4 className={styles.history__table_row}>{moment(order.createdAt).format("DD.MM.YYYY HH:mm")}</h4>
      <h4 className={styles.history__table_row}><span className={`${styles.history__table_row} ${styles.history__table_span}`}>№</span>{order.id}</h4>
      <h4 className={styles.history__table_row}>г.Грозный ул. 8марта</h4>
      <h4 className={styles.history__table_row}>Банковский перевод</h4>
      <h4 className={styles.history__table_row}><span className={`${styles.history__table_row} ${styles.history__table_span}`}>Сумма: </span>{order.total} ₽</h4>
      <h4 className={`${styles.history__table_row} ${styles.history__table_row_color}`}><span className={`${styles.history__table_row} ${styles.history__table_span}`}>Статус: </span>{getStatusInfo(order.status).title}</h4>
      <Link className={`${styles.history__table_row} ${styles.history__table_link}`} href={`/lk/current-orders/${order.id}`}>Посмотреть детали</Link>
    </div>
  );
}

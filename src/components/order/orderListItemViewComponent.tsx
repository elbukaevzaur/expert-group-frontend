import Image from "next/image";
import {Orders} from "@/lib/models";
import styles from "@/components/order/orderListItemViewComponent.module.css"

interface Props {
    order: Orders
}
export default function OrderListItemView(props: Props) {

    const { order } = props;

    return <div className={styles.history__item}>
        <div className={styles.history__item_content}>
            <div className={styles.history__item_wrapper}>
                <h3 className={`${styles.history__item_text} ${styles.history__item_width}`}>№ Заказа: {order.id}</h3>
                <h3 className={`${styles.history__item_text} ${styles.history__item_width}`}>Статус:{" "}<span
                    className={styles.history__item_span}>{order.status}</span>
                </h3>
            </div>
            <div className={styles.history__item_wrapper}>
                <h3 className={`${styles.history__item_text} ${styles.history__item_width}`}>Итого: {order.total} ₽</h3>
            </div>
        </div>
        <div className={styles.history__item_wrapper}>
            <button className={styles.history__item_button}>Посмотреть детали</button>
        </div>
    </div>
}


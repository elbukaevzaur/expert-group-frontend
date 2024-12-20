import Image from "next/image";
import {Orders} from "@/lib/models";

interface Props {
    order: Orders
}
export default function OrderListItemView(props: Props) {

    const { order } = props;

    return <div className="history__item">
        <div className="history__item_content">
            <div className="history__item_wrapper">
                <h3 className="history__item_text history__item_width">№ Заказа: {order.id}</h3>
                <h3 className="history__item_text history__item_width">Статус:{" "}<span
                    className="history__item_span">{order.status}</span>
                </h3>
            </div>
            <div className="history__item_wrapper">
                <h3 className="history__item_text history__item_width">Итого: {order.total} ₽</h3>
            </div>
        </div>
        <div className="history__item_wrapper">
            <button className="history__item_button">Посмотреть детали</button>
        </div>
    </div>
}


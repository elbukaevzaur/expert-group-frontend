import styles from "@/app/stores/stores.module.css";
import {AddressPointSvg, ClockSvg, MailSvg, PhoneNumberSvg} from "@/lib/icon-svg";
import Link from "next/link";
import YandexMap from "@/components/maps/YandexMap";

export default function PageStores(){
    return <div className={styles.main}>
        <h1 className="title">Где купить</h1>
        <div className={styles.container}>
            <div className={styles.info_bar}>
                <Link href="https://yandex.ru/maps/-/CHBnY2Lp" target="_blank" className={styles.address}>
                    <AddressPointSvg/>
                    <span>Россия, г. Грозный, Назарбаева 79, 2-этаж</span>
                </Link>
                <Link href="tel:+7(929)898-41-66" target="_blank" className={styles.phone}>
                    <div className={styles.time_icon}>
                        <ClockSvg width="auto" height="auto"/>
                    </div>
                    <span>Мы работаем с понедельника по воскресенье с 9:00 до 18:00.<br/> Пятница — наш единственный выходной день</span>
                </Link>
            </div>
            <div className={styles.map_container}>
                <YandexMap/>
            </div>
        </div>
    </div>
}
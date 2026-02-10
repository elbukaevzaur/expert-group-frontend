import styles from "@/app/contacts/contacts.module.css";
import {AddressPointSvg, MailSvg, PhoneNumberSvg} from "@/lib/icon-svg";
import Link from "next/link";
import YandexMap from "@/components/maps/YandexMap";

export default function PageContacts(){
    return <div className={styles.main}>
        <h1 className="title">Контакты</h1>
        <div className={styles.container}>
            <div className={styles.info_bar}>
                <Link href="https://yandex.ru/maps/-/CHBnY2Lp" target="_blank" className={styles.address}>
                    <AddressPointSvg/>
                    <span>Россия, г. Грозный, Назарбаева 79, 2-этаж</span>
                </Link>
                <Link href="tel:+7(929)898-41-66" target="_blank" className={styles.phone}>
                    <PhoneNumberSvg/>
                    <span>+7 (929) 898-41-66</span>
                </Link>
                <Link href="mailto:office@proeg.ru" target="_blank" className={styles.email}>
                    <MailSvg/>
                    <span>office@proeg.ru</span>
                </Link>
            </div>
            <div className={styles.map_container}>
                <YandexMap/>
            </div>
        </div>
    </div>
}
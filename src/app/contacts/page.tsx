import styles from "@/app/contacts/contacts.module.css";
import {AddressPointSvg, MailSvg, PhoneNumberSvg} from "@/lib/icon-svg";
import Link from "next/link";

export default function PageContacts(){
    return <div className={styles.main}>
        <h1 className="title">Контакты</h1>
        <div className={styles.container}>
            <div className={styles.info_bar}>
                <Link href="https://yandex.ru/maps/?um=constructor%3Ae49d15f2bb27ed2238ad9a9e3d69b92ef80d20f7daa1fe364133d8a50928d6a6&source=constructorLink" target="_blank" className={styles.address}>
                    <AddressPointSvg/>
                    <span>Россия, г. Грозный, Назарбаева 79</span>
                </Link>
                <Link href="tel:+7(938)903-26-66" target="_blank" className={styles.phone}>
                    <PhoneNumberSvg/>
                    <span>+7 (938) 903-26-66</span>
                </Link>
                <Link href="mailto:support@expertgroupholding.ru" target="_blank" className={styles.email}>
                    <MailSvg/>
                    <span>support@expertgroupholding.ru</span>
                </Link>
            </div>
            <div className={styles.map_container}>
                <iframe
                    src="https://yandex.ru/map-widget/v1/?um=constructor%3Ae49d15f2bb27ed2238ad9a9e3d69b92ef80d20f7daa1fe364133d8a50928d6a6&amp;source=constructor"
                    width="100%" height="500" frameBorder="0"></iframe>
            </div>
        </div>
    </div>
}
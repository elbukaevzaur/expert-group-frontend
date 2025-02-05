import Image from "next/image";
import {YoutubeSvg, VkSvg, TelegramSvg, InstagramSvg} from "@/lib/icon-svg";
import styles from "@/components/footer.module.css"

export default function Footer() {

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.contact}>
                    <Image className={styles.contact_image} src={'/images/Logo.png'} alt='Логотип' width={324} height={67}/>
                    <div className={styles.contact_wrraper}>
                        <h3 className={styles.contact_text}>Россия, г. Грозный, Назарбаева 79</h3>
                        <h3 className={styles.contact_text}>+7 (938) 903-26-66</h3>
                    </div>
                    <div className={styles.contact_container}>
                        <div className={styles.contact_social}>
                            {<VkSvg/>}
                            {<TelegramSvg/>}
                            {<YoutubeSvg />}
                            {<InstagramSvg />}
                        </div>
                    <h3 className={styles.contact_text_last}>Присоединяйтесь к нам в социальных сетях</h3>
                    </div>
                </div>
                <div className={styles.wrraper}>
                <div className={styles.info}>
                    <h2 className={styles.info_title}>О компании</h2>
                    <div className={styles.info_wrraper}>
                        <h3 className={styles.info_text}>О нас</h3>
                        <h3 className={styles.info_text}>События</h3>
                        <h3 className={styles.info_text}>Сотрудники</h3>
                        <h3 className={styles.info_text}>Вакансии</h3>
                        <h3 className={styles.info_text}>Сертификаты</h3>
                        <h3 className={styles.info_text}>Отзывы</h3>
                        <h3 className={styles.info_text}>Политика</h3>
                        <h3 className={styles.info_text}>Реквизиты</h3>
                    </div>
                </div>
                <div className={styles.info}>
                    <h2 className={styles.info_title}>Покупателям</h2>
                    <div className={styles.info_wrraper}>
                        <h3 className={styles.info_text}>Как оформить заказ</h3>
                        <h3 className={styles.info_text}>Способы оплаты</h3>
                        <h3 className={styles.info_text}>Условия доставки</h3>
                        <h3 className={styles.info_text}>Гарантии и возврат</h3>
                        <h3 className={styles.info_text}>Общие условия продаж</h3>
                    </div>
                </div>
                <div className={`${styles.info} ${styles.info_absolute}`}>
                    <h2 className={styles.info_title}>Контакты</h2>
                    <div className={styles.info_wrraper}>
                        <h3 className={styles.info_text}>Наши реквизиты</h3>
                        <h3 className={styles.info_text}>Где купить</h3>
                        <h3 className={styles.info_text}>Как купить</h3>
                    </div>
                </div>
                </div>
            </div>
        </footer>
    )
}
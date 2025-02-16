import Image from "next/image";
import {YoutubeSvg, VkSvg, TelegramSvg, InstagramSvg} from "@/lib/icon-svg";
import styles from "@/components/footer.module.css"
import Link from "next/link";

export default function Footer() {

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.contact}>
                    <Image className={styles.contact_image} src={'/images/Logo.png'} alt='Логотип' width={324} height={67}/>
                    <div className={styles.contact_wrraper}>
                        <Link href="https://go.2gis.com/R1lEi" target="_blank">
                            <h3 className={styles.contact_text}>Россия, г. Грозный, Назарбаева 79</h3>
                        </Link>
                        <Link href="tel:+7(938)903-26-66" target="_blank">
                            <h3 className={styles.contact_text}>+7 (938) 903-26-66</h3>
                        </Link>
                    </div>
                    <div className={styles.contact_container}>
                        <div className={styles.contact_social}>
                            <Link href="https://vk.com/id769027474" target="_blank">
                                <VkSvg/>
                            </Link>
                            <Link href="https://t.me/EXPERTGROUPHOLDING" target="_blank">
                                <TelegramSvg/>
                            </Link>
                            <Link href="https://www.youtube.com/@ExpertGroupgips/shorts" target="_blank">
                                <YoutubeSvg />
                            </Link>
                            <Link href="https://www.instagram.com/expertgroup_official" target="_blank">
                                <InstagramSvg />
                            </Link>
                        </div>
                    <h3 className={styles.contact_text_last}>Присоединяйтесь к нам в социальных сетях</h3>
                    </div>
                </div>
                <div className={styles.wrraper}>
                <div className={styles.info}>
                    <h2 className={styles.info_title}>О компании</h2>
                    <div className={styles.info_wrraper}>
                        <h3 className={styles.info_text}>
                            <Link href={"/about-us"}>
                                О нас
                            </Link>
                        </h3>
                        <h3 className={styles.info_text}>
                            <Link href={"/vacancy"}>
                                Вакансии
                            </Link>
                        </h3>
                        <h3 className={styles.info_text}>
                            <Link href={"/certificate"}>
                                Сертификаты
                            </Link>
                        </h3>
                        <h3 className={styles.info_text}>
                            <Link href={""}>
                                Отзывы
                            </Link>
                        </h3>
                        <h3 className={styles.info_text}>
                            <Link href={"/politics"}>
                                Политика
                            </Link>
                        </h3>
                        <h3 className={styles.info_text}>
                            <Link href={"/requisites"}>
                                Реквизиты
                            </Link>
                        </h3>
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
                        <h3 className={styles.info_text}>
                            <Link href={"/requisites"}>
                                Наши реквизиты
                            </Link>
                        </h3>
                        <h3 className={styles.info_text}>Где купить</h3>
                        {/*<h3 className={styles.info_text}>Как купить</h3>*/}
                    </div>
                </div>
                </div>
            </div>
        </footer>
    )
}
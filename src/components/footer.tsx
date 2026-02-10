import Image from "next/image";
import {YoutubeSvg, VkSvg, TelegramSvg} from "@/lib/icon-svg";
import styles from "@/components/footer.module.css"
import Link from "next/link";
import { CatalogModal } from "./catalog/catalogModal";

export default function Footer() {

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.contact}>
                    {/* <Image className={styles.contact_image} src={'/images/Logo.png'} alt='Логотип' width={206} height={47}/> */}
                    <Image
              className={styles.contact_image}
              src={"/images/logo.svg"}
              alt="Логотип"
              width={206}
              height={47}
              priority={true}
            />
                    <div className={styles.contact_wrraper}>
                            <h3 className={styles.contact_text}>Строительная компания "ExpertGroup"</h3>
                        <Link href="https://go.2gis.com/R1lEi" target="_blank">
                            <h3 className={styles.contact_text}>Чеченская Республика, г. Грозный, улица Нурсултана Назарбаева, 79</h3>
                        </Link>
                    </div>
                </div>
                <div className={styles.wrraper}>
                <div>
                    <h2 className={styles.info_title}>Компания</h2>
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
                    </div>
                </div>
                    <div>
                        <h2 className={styles.info_title}>Покупателям</h2>
                        <div className={styles.info_wrraper}>
                        <h3 className={styles.info_text}>
                            <Link href={"/contacts"}>
                                Контакты
                            </Link>
                        </h3>
                        <h3 className={styles.info_text}>
                            <Link href={"/requisites"}>
                                Реквизиты
                            </Link>
                        </h3>
                        </div>
                </div>
                    <div className={styles.catalog}>
                        <h2 className={styles.info_title}>Каталог</h2>
                        <div className={styles.info_wrraper}>
                            <CatalogModal/>
                        </div>
                </div>
                </div>
                <div className={`${styles.info} ${styles.info_absolute}`}>
                    <h2 className={styles.info_title}>Контакты</h2>
                    <div className={styles.info_wrraper}>
                        <Link href="tel:+7(929)898-41-66" target="_blank">
                            <h3 className={styles.info_title}>+7 (929) 898-41-66</h3>
                        <p className={styles.info__subtitle}>Заказать звонок</p>
                        </Link>
                        <div className={styles.contact_social}>
                             <Link href="https://vk.com/id769027474" target="_blank">
                                <VkSvg />
                            </Link>
                            <Link href="https://t.me/EXPERTGROUPHOLDING" target="_blank">
                                <TelegramSvg />
                            </Link>
                            <Link href="https://www.youtube.com/@ExpertGroupgips/shorts" target="_blank">
                                <YoutubeSvg />
                            </Link>
                        </div>
                        <p className={styles.info__subtitle}>Присоединяйтесь к нам в социальных сетях</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
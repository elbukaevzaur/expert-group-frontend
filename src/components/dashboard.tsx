"use client"

import Link from "next/link";
import Image from "next/image";
import { CatalogModal } from './catalog/catalogModal';
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import NavigationHistory from "@/components/navigation-history";
import {useEffect, useState} from "react";
import {INITIAL_TOKEN} from "@/lib/reducers";
import {Login} from "@/components/login-modal";
import styles from "@/components/dashboard.module.css"

export default function Dashboard() {
    const { orderItems } = useAppSelector((state) => state.basket);
    const { isAuth } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const [isLoginVisible, setIsLoginVisible] = useState(false);

    useEffect(() => {
        dispatch(INITIAL_TOKEN());
    }, []);

    const toggleLogin = () => {
        setIsLoginVisible(!isLoginVisible);
    };

    return (
        <header>
            <div className={styles.dashboar}>
                <Link href='/'><Image src={"/images/Logo.png"} alt="Логотип" width={251} height={52} priority={true} /></Link>
                <div className={styles.location}>
                    <Image src={'/images/Location.png'} alt="Локация" width={14} height={18} />
                    <h3 className={styles.location__text}>Москва</h3>
                    <Image src={'/images/Vector_green.png'} alt="Стрелка" width={13} height={7} />
                </div>
                <div className={styles.number}>
                    <h3 className={styles.number__text}>+7 (938) 903-26-66</h3>
                    <Image src={'/images/Whatsapp_logo.png'} alt="Логотип Whatsapp" width={20} height={20} />
                </div>
                <div className={styles.search}>
                    <input type="search" className={styles.search_input} placeholder="Поиск" />
                    <button className={styles.search__button}>Найти</button>
                </div>
                {
                    !isAuth ?
                        <div className={styles.user} onClick={toggleLogin}>
                            <Image src={'/images/User.png'} alt="Пользователь" width={26} height={26}/>
                            <h2 className={styles.user__text}>Вход</h2>
                        </div>
                        :
                        <Link href={'/lk/current-orders'} className={styles.user}>
                            <Image src={'/images/User.png'} alt="Пользователь" width={26} height={26}/>
                            <h2 className={styles.user__text}>Мой кабинет</h2>
                        </Link>
                }
                <Link href='/basket'>
                    <div className={styles.dashboar__basket}>
                        <Image src={'/images/Basket.png'} alt="Корзина" width={26} height={26}/>
                        <div className={styles.dashboar__basket_container}>
                            <h2 className={styles.dashboar__bascet_text}>Корзина</h2>
                            <h3 className={styles.dashboar__bascet_info}>{orderItems.length > 0 ? orderItems.length : 'пусто'}</h3>
                        </div>
                    </div>
                </Link>
            </div>
            <div className={styles.navigator}>
                <div className={`${styles.navigator__container} ${styles.navigator__container_white} ${styles.dropdown__catalog}`}>
                    <Image src={'/images/Catalog_green.png'} alt="Каталог" width={17} height={10}/>
                    <Link href='/catalog'>
                        <h3 className={`${styles.navigator__text} ${styles.navigator__text_white}`}>Каталог</h3>
                    </Link>
                    <div className={styles.dropdown_catalog_content}>
                    <CatalogModal/>
                    </div>
                </div>
                <div className={styles.navigator__container}>
                    <h3 className={styles.navigator__text}>О Компании</h3>
                    <Image src={'/images/Vector_white.png'} alt="Стрелка" width={13} height={8} />
                </div>
                <div className={styles.navigator__container}>
                    <h3 className={styles.navigator__text}>Проекты</h3>
                    <Image src={'/images/Vector_white.png'} alt="Стрелка" width={13} height={8} />
                </div>
                <div className={styles.navigator__container}>
                    <h3 className={styles.navigator__text}>Как купить</h3>
                    <Image src={'/images/Vector_white.png'} alt="Стрелка" width={13} height={8} />
                </div>
                <div className={styles.navigator__container}>
                    <h3 className={styles.navigator__text}>Галерея</h3>
                    <Image src={'/images/Vector_white.png'} alt="Стрелка" width={13} height={8} />
                </div>
                <div className={styles.navigator__container}>
                    <h3 className={styles.navigator__text}>Услуги</h3>
                    <Image src={'/images/Vector_white.png'} alt="Стрелка" width={13} height={8} />
                </div>
                <div className={styles.navigator__container}>
                    <h3 className={styles.navigator__text}>Контакты</h3>
                    <Image src={'/images/Vector_white.png'} alt="Стрелка" width={13} height={8} />
                </div>
            </div>
            <NavigationHistory/>
            {isLoginVisible && <Login onCloseModal={() => setIsLoginVisible(false)}/>}
        </header>
    )
}
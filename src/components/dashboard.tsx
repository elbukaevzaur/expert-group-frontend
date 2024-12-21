"use client"

import Link from "next/link";
import Image from "next/image";
import { CatalogModal } from './catalog/catalogModal';
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import NavigationHistory from "@/components/navigation-history";
import {useEffect, useState} from "react";
import {ALL_FAVORITES_REQUEST, INITIAL_BASKET, INITIAL_TOKEN} from "@/lib/reducers";
import {Login} from "@/components/login-modal";

export default function Dashboard() {
    const { orderItems } = useAppSelector((state) => state.basket);
    const { isAuth } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const [isLoginVisible, setIsLoginVisible] = useState(false);

    useEffect(() => {
        dispatch(INITIAL_BASKET());
        dispatch(INITIAL_TOKEN());
        dispatch(ALL_FAVORITES_REQUEST());
    }, [isAuth]);

    const toggleLogin = () => {
        setIsLoginVisible(!isLoginVisible);
    };

    return (
        <header className="header">
            <div className="dashboar">
                <Link href='/'><Image src={"/images/Logo.png"} alt="Логотип" width={251} height={52} priority={true} /></Link>
                <div className="location">
                    <Image src={'/images/Location.png'} alt="Локация" width={14} height={18} />
                    <h3 className="location__text">Москва</h3>
                    <Image src={'/images/Vector_green.png'} alt="Стрелка" width={13} height={7} />
                </div>
                <div className="number">
                    <h3 className="number__text">+7 (938) 903-26-66</h3>
                    <Image src={'/images/Whatsapp_logo.png'} alt="Логотип Whatsapp" width={20} height={20} />
                </div>
                <div className="search">
                    <input type="search" className="search_input" placeholder="Поиск" />
                    <button className="search__button">Найти</button>
                </div>
                {
                    !isAuth ?
                        <div className="user" onClick={toggleLogin}>
                            <Image src={'/images/User.png'} alt="Пользователь" width={26} height={26}/>
                            <h2 className="user__text">Вход</h2>
                        </div>
                        :
                        <Link href={'/lk/current-orders'} className="user">
                            <Image src={'/images/User.png'} alt="Пользователь" width={26} height={26}/>
                            <h2 className="user__text">Мой кабинет</h2>
                        </Link>
                }
                <Link href='/basket'>
                    <div className="dashboar__basket">
                        <Image src={'/images/Basket.png'} alt="Корзина" width={26} height={26}/>
                        <div className="dashboar__basket_container">
                            <h2 className="dashboar__bascet_text">Корзина</h2>
                            <h3 className="dashboar__bascet_info">{orderItems.length > 0 ? orderItems.length : 'пусто'}</h3>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="navigator">
                <div className="navigator__container navigator__container_white dropdown__catalog">
                    <Image src={'/images/Catalog_green.png'} alt="Каталог" width={17} height={10}/>
                    <Link href='/catalog'>
                        <h3 className="navigator__text navigator__text_white">Каталог</h3>
                    </Link>
                    <div className="dropdown-catalog-content">
                    <CatalogModal/>
                    </div>
                </div>
                <div className="navigator__container">
                    <h3 className="navigator__text">О Компании</h3>
                    <Image src={'/images/Vector_white.png'} alt="Стрелка" width={13} height={8} />
                </div>
                <div className="navigator__container">
                    <h3 className="navigator__text">Проекты</h3>
                    <Image src={'/images/Vector_white.png'} alt="Стрелка" width={13} height={8} />
                </div>
                <div className="navigator__container">
                    <h3 className="navigator__text">Как купить</h3>
                    <Image src={'/images/Vector_white.png'} alt="Стрелка" width={13} height={8} />
                </div>
                <div className="navigator__container">
                    <h3 className="navigator__text">Галерея</h3>
                    <Image src={'/images/Vector_white.png'} alt="Стрелка" width={13} height={8} />
                </div>
                <div className="navigator__container">
                    <h3 className="navigator__text">Услуги</h3>
                    <Image src={'/images/Vector_white.png'} alt="Стрелка" width={13} height={8} />
                </div>
                <div className="navigator__container">
                    <h3 className="navigator__text">Контакты</h3>
                    <Image src={'/images/Vector_white.png'} alt="Стрелка" width={13} height={8} />
                </div>
            </div>
            <NavigationHistory/>
            {isLoginVisible && <Login onCloseModal={() => setIsLoginVisible(false)}/>}
        </header>
    )
}
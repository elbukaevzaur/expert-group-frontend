"use client"

import Link from "next/link";
import Image from "next/image";
import { CatalogModal } from './catalog/catalogModal';
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import NavigationHistory from "@/components/navigation-history";
import {useEffect, useState} from "react";
import {INITIAL_BASKET} from "@/lib/reducers";

export default function Dashboard() {
    const { allItems } = useAppSelector((state) => state.basket);
    const dispatch = useAppDispatch();
    const [isLoginVisible, setIsLoginVisible] = useState(false); 

    useEffect(() => {
        dispatch(INITIAL_BASKET())
    }, []);

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
                
                    <div className="user" onClick={toggleLogin}>
                        <Image src={'/images/User.png'} alt="Пользователь" width={26} height={26} />
                        <h2 className="user__text">Вход</h2>
                    </div>
                <Link href='/basket'>
                    <div className="dashboar__basket">
                        <Image src={'/images/Basket.png'} alt="Корзина" width={26} height={26} />
                        <div className="dashboar__basket_container">
                            <h2 className="dashboar__bascet_text">Корзина</h2>
                            <h3 className="dashboar__bascet_info">{allItems.length > 0 ? allItems.length : 'пусто'}</h3>
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
            {isLoginVisible && <Login />}
        </header>
    )
}

export function Login() {
    return (
        <div className="login">
            <div className="login__conteiner">
                <Image src={"/images/Logo.png"} alt="Логотип" width={251} height={52}/>
                <form action="" className="login__form">
                    <div className="login__content">
                        <h3 className="login__input_text">Логин</h3>
                        <input className="login__input" type="text" />
                    </div>
                    <div className="login__content login__content_margin">
                        <h3 className="login__input_text">Пароль</h3>
                        <input className="login__input" type="password" />
                    </div>
                    <div className="login__wrapper">
                        <button className="login__password">Забыли пароль?</button>
                    </div>
                    <button className="login__button">Войти</button>
                </form>
                <div className="login__wrapper login__line_margin">
                <div className="login__line login__line_left"></div>
                <h3 className="login__line_text">или</h3>
                <div className="login__line login__line_right"></div>
                </div>
                <div className="login__social">
                    <Image src={'/images/Yandex_logo.png'} alt="Яндекс" width={57} height={57} />
                    <Image src={'/images/Mail_logo.png'} alt="Яндекс" width={57} height={57} />
                    <Image src={'/images/VK_logo_login.png'} alt="Яндекс" width={57} height={57} />
                </div>
                <h3 className="login__registration">Нет аккаунта? <Link href='/registration'><span className="login__registration_span">Зарегистрироваться</span></Link></h3>
            </div>
        </div>
    )
}
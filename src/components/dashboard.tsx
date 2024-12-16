"use client"

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CatalogModal } from './catalog/catalogModal';
import { useAppSelector } from "@/lib/hooks";
import NavigationHistory from "@/components/navigation-history";

export default function Dashboard() {
    const router = useRouter()
    const { allItems } = useAppSelector((state) => state.basket);

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
                <Link href='/registration'>
                    <div className="user">
                        <Image src={'/images/User.png'} alt="Пользователь" width={26} height={26} />
                        <h2 className="user__text">Вход</h2>
                    </div>
                </Link>
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
        </header>
    )
}
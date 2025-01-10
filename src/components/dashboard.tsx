"use client"

import Link from "next/link";
import Image from "next/image";
import { CatalogModal } from './catalog/catalogModal';
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import NavigationHistory from "@/components/navigation-history";
import {useEffect, useState} from "react";
import {INITIAL_TOKEN, PROJECTS_CATEGORIES_FETCH_REQUESTED, SELECT_PROJECT_CATEGORY} from "@/lib/reducers";
import {Login} from "@/components/login-modal";
import styles from "@/components/dashboard.module.css"
import PreviewBasketModal from "./preview-basket-modal";
import {ProjectsCategories} from "@/lib/models/projectsCategories";
import {useParams, usePathname} from "next/navigation";
import { UserSvg, BasketSvg } from "@/lib/icon-svg";

export default function Dashboard() {
    const { orderItems } = useAppSelector((state) => state.basket);
    const { isAuth } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const [isLoginVisible, setIsLoginVisible] = useState(false);
    const [ isShowPreviewBasket, setIsShowPreviewBasket ] = useState(false);
    const { allProjectsCategories } = useAppSelector((state) => state.projectsCategories);
    const pathname = usePathname();
    const params = useParams();

    useEffect(() => {
        dispatch(INITIAL_TOKEN());
        dispatch(PROJECTS_CATEGORIES_FETCH_REQUESTED())
    }, []);

    const toggleLogin = () => {
        setIsLoginVisible(!isLoginVisible);
    };

    const containCurrentPage = (path: string): boolean => {
        return pathname.startsWith(path);
    }

    return (
        <header>
            <div className={styles.dashboar}>
                <Link href='/'>
                    <Image src={"/images/Logo.png"} alt="Логотип" width={251} height={52} priority={true} />
                </Link>
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
                            {<UserSvg/>}
                            <h2 className={styles.user__text}>Вход</h2>
                        </div>
                        :
                        <Link href={'/lk/current-orders'} className={styles.user}>
                            {<UserSvg fill={'#21A038'}/>}
                            <h2 className={styles.user__text}>Мой кабинет</h2>
                        </Link>
                }
                {/* <Link href='/basket'> */}
                    <div className={styles.dashboar__basket}>
                    {
                            orderItems.length > 0 ?
                            <BasketSvg onClick={() => setIsShowPreviewBasket(!isShowPreviewBasket)} fill={'#21A038'}/>
                            :
                            <BasketSvg onClick={() => setIsShowPreviewBasket(!isShowPreviewBasket)}/>
                        }
                        <div onClick={() => setIsShowPreviewBasket(!isShowPreviewBasket)} className={styles.dashboar__basket_container}>
                            <h2 className={styles.dashboar__bascet_text}>Корзина</h2>
                            <h3 className={styles.dashboar__bascet_info}>{orderItems.length > 0 ? orderItems.length : 'пусто'}</h3>
                        </div>
                        {
                            isShowPreviewBasket &&
                            <PreviewBasketModal onClose={() => setIsShowPreviewBasket(false)}/>
                        }
                    </div>
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
                <div className={`${styles.navigator__container} ${styles.dropdown__catalog}`}>
                    <h3 className={styles.navigator__text}>О Компании</h3>
                    {/* <Image src={'/images/Vector_white.png'} alt="Стрелка" width={13} height={8} /> */}
                    <div className={styles.dropdown_green}>
                        <div className={styles.dropdown_green_wrapper}>
                            <h3 className={styles.dropdown_green_text}>О нас</h3>
                        </div>
                        <div className={styles.dropdown_green_wrapper}>
                            <h3 className={styles.dropdown_green_text}>Сотрудники</h3>
                        </div>
                        <div className={styles.dropdown_green_wrapper}>
                            <h3 className={styles.dropdown_green_text}>Вакансии</h3>
                        </div>
                        <div className={styles.dropdown_green_wrapper}>
                            <h3 className={styles.dropdown_green_text}>Сертификаты</h3>
                        </div>
                        <div className={styles.dropdown_green_wrapper}>
                            <h3 className={styles.dropdown_green_text}>Отзывы</h3>
                        </div>
                        <div className={styles.dropdown_green_wrapper}>
                            <h3 className={styles.dropdown_green_text}>Политика</h3>
                        </div>
                        <div className={styles.dropdown_green_wrapper}>
                            <h3 className={styles.dropdown_green_text}>Реквизиты</h3>
                        </div>
                    </div>
                </div>

                <div className={`${styles.navigator__container} ${styles.dropdown__catalog} ${containCurrentPage('/projects') && styles.navigator__container_active}`}>
                    <Link href={'/projects'}>
                        <h3 className={styles.navigator__text}>Проекты</h3>
                        {/* <Image src={'/images/Vector_white.png'} alt="Стрелка" width={13} height={8} /> */}
                    </Link>
                    <div className={styles.dropdown_green}>
                        {
                            allProjectsCategories.map((value, index) => {
                                return <Link
                                    href={`/projects/${value.id}`}
                                    key={index}
                                >
                                    <div className={styles.dropdown_green_wrapper}>
                                        <h3 className={`${styles.dropdown_green_text} ${value.id.toString() === params?.projectsCategoriesId && styles.dropdown_green_text_active}`}>{value.name}</h3>
                                    </div>
                                </Link>
                            })
                        }
                    </div>
                </div>
                <div className={`${styles.navigator__container} ${styles.dropdown__catalog}`}>
                    <h3 className={styles.navigator__text}>Как купить</h3>
                    {/* <Image src={'/images/Vector_white.png'} alt="Стрелка" width={13} height={8} /> */}
                    <div className={styles.dropdown_green}>
                        <div className={styles.dropdown_green_wrapper}>
                            <h3 className={styles.dropdown_green_text}>Как оформить заказ</h3>
                        </div>
                        <div className={styles.dropdown_green_wrapper}>
                            <h3 className={styles.dropdown_green_text}>Способы оплаты</h3>
                        </div>
                        <div className={styles.dropdown_green_wrapper}>
                            <h3 className={styles.dropdown_green_text}>Условия доставки</h3>
                        </div>
                        <div className={styles.dropdown_green_wrapper}>
                            <h3 className={styles.dropdown_green_text}>Гарантии и возврат</h3>
                        </div>
                        <div className={styles.dropdown_green_wrapper}>
                            <h3 className={styles.dropdown_green_text}>Общие условия продаж</h3>
                        </div>
                    </div>
                </div>
                <div className={`${styles.navigator__container} ${styles.dropdown__catalog}`}>
                    <h3 className={styles.navigator__text}>Галерея</h3>
                    {/* <Image src={'/images/Vector_white.png'} alt="Стрелка" width={13} height={8} /> */}
                    <div className={styles.dropdown_green}>
                        <div className={styles.dropdown_green_wrapper}>
                            <h3 className={styles.dropdown_green_text}>Фото</h3>
                        </div>
                    </div>
                </div>
                <div className={`${styles.navigator__container} ${styles.dropdown__catalog}`}>
                    <h3 className={styles.navigator__text}>Контакты</h3>
                    {/* <Image src={'/images/Vector_white.png'} alt="Стрелка" width={13} height={8} /> */}
                    <div className={styles.dropdown_green}>
                        <div className={styles.dropdown_green_wrapper}>
                            <h3 className={styles.dropdown_green_text}>Phone</h3>
                        </div>
                    </div>
                </div>
            </div>
            <NavigationHistory/>
            {isLoginVisible && <Login onCloseModal={() => setIsLoginVisible(false)}/>}
        </header>
    )
}
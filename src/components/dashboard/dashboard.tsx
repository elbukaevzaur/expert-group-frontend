"use client"

import Link from "next/link";
import Image from "next/image";
import { CatalogModal } from '../catalog/catalogModal';
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import NavigationHistory from "@/components/dashboard/navigation-history";
import {useEffect, useState} from "react";
import {INITIAL_TOKEN, PROJECTS_CATEGORIES_FETCH_REQUESTED} from "@/lib/reducers";
import {Login} from "@/components/login/login-modal";
import styles from "@/components/dashboard/dashboard.module.css"
import PreviewBasketModal from "../basket/preview-basket-modal";
import {useParams, usePathname} from "next/navigation";
import {UserSvg, BasketSvg, SearchSvg, WatsappSvg, LocationSvg, MenuSvg, CloseSvg} from "@/lib/icon-svg";
import SearchForm from "@/components/dashboard/search-form";

export default function Dashboard() {
    const { orderItems } = useAppSelector((state) => state.basket);
    const { isAuth } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const [isLoginVisible, setIsLoginVisible] = useState(false);
    const [ isShowPreviewBasket, setIsShowPreviewBasket ] = useState(false);
    const { allProjectsCategories } = useAppSelector((state) => state.projectsCategories);
    const pathname = usePathname();
    const params = useParams();
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);

    const handleMenuClick = () => {
        setIsBurgerOpen(!isBurgerOpen);
    };

    const handleOverlayClick = () => {
        setIsBurgerOpen(false);
    };

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
        <header className={styles.header}>
            <div className={styles.dashboar_wrapper}>
                <div className={styles.dashboar}>
                    <Link href='/public'>
                        <Image className={styles.logo} src={"/images/Logo.png"} alt="Логотип" width={251} height={52}
                               priority={true}/>
                        <Image className={styles.logo__small} src={"/images/Logo_small.png"} alt="Логотип" width={94}
                               height={44} priority={true}/>
                    </Link>
                    <div className={styles.number}>
                        <h3 className={styles.number__text}>+7 (938) 903-26-66</h3>
                        <WatsappSvg className={styles.number__icon}/>
                    </div>
                    <div className={styles.location}>
                        <LocationSvg className={styles.location__icon}/>
                        <h3 className={styles.location__text}>Москва</h3>
                        <Image className={styles.location__vector} src={'/images/Vector_green.png'} alt="Стрелка"
                               width={13} height={7}/>
                    </div>
                    <SearchForm/>
                    {
                        !isAuth ?
                            <div className={styles.user} onClick={toggleLogin}>
                                {<UserSvg className={styles.user__icon}/>}
                                <h2 className={styles.user__text}>Вход</h2>
                            </div>
                            :
                            <Link href={'/lk/current-orders'} className={styles.user}>
                                {<UserSvg className={styles.user__icon}
                                          fill={pathname.startsWith('/lk') ? '#21A038' : 'none'}/>}
                                <h2 className={styles.user__text}>Кабинет</h2>
                            </Link>
                    }
                    <div>
                        <div
                            onClick={() => setIsShowPreviewBasket(!isShowPreviewBasket)}
                            className={styles.dashboar__basket}
                        >
                            <BasketSvg className={styles.dashboar__bascet_icon}
                                       fill={pathname.startsWith('/basket') ? '#21A038' : 'none'}
                            />
                            <div
                                className={styles.dashboar__basket_container}>
                                <h2 className={styles.dashboar__bascet_text}>Корзина</h2>
                                <h3 className={styles.dashboar__bascet_info}>{orderItems.length > 0 ? orderItems.length : 'пусто'}</h3>
                                <div className={styles.dashboar__bascet_info_mini}>
                                    <h3 className={styles.dashboar__bascet_info_mini_text}>{orderItems.length > 0 ? orderItems.length : '0'}</h3>
                                </div>
                            </div>
                        </div>
                        {
                            isShowPreviewBasket &&
                            <PreviewBasketModal onClose={() => setIsShowPreviewBasket(false)}/>
                        }
                    </div>
                    <button onClick={handleMenuClick} className={styles.dashboar__menu}><MenuSvg/></button>
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
                <div className={`${styles.navigator__container} ${styles.dropdown__catalog} ${containCurrentPage('/about-us') && styles.navigator__container_active}`}>
                    <Link className={styles.link} href={'/about-us'}>
                        <h3 className={styles.navigator__text}>О Компании</h3>
                    </Link>
                    {/* <Image src={'/images/Vector_white.png'} alt="Стрелка" width={13} height={8} /> */}
                    <div className={styles.dropdown_green}>
                    <Link href={'/about-us'}>
                        <div className={styles.dropdown_green_wrapper}>
                            <h3 className={`${styles.dropdown_green_text} ${containCurrentPage('/about-us') && styles.dropdown_green_text_active}`}>О нас</h3>
                        </div>
                    </Link>
                        <div className={styles.dropdown_green_wrapper}>
                            <h3 className={styles.dropdown_green_text}>Сотрудники</h3>
                        </div>
                        <Link href={'/vacancy'}>
                        <div className={styles.dropdown_green_wrapper}>
                            <h3 className={styles.dropdown_green_text}>Вакансии</h3>
                        </div>
                        </Link>
                        <Link href={'/certificate'}>
                        <div className={styles.dropdown_green_wrapper}>
                            <h3 className={styles.dropdown_green_text}>Сертификаты</h3>
                        </div>
                        </Link>
                        <div className={styles.dropdown_green_wrapper}>
                            <h3 className={styles.dropdown_green_text}>Отзывы</h3>
                        </div>
                        <Link href={'/politics'}>
                            <div className={styles.dropdown_green_wrapper}>
                                <h3 className={styles.dropdown_green_text}>Политика</h3>
                            </div>
                        </Link>
                        <Link href={'/requisites'}>
                            <div className={styles.dropdown_green_wrapper}>
                                <h3 className={styles.dropdown_green_text}>Реквизиты</h3>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className={`${styles.navigator__container} ${styles.dropdown__catalog} ${containCurrentPage('/projects') && styles.navigator__container_active}`}>
                    <Link className={styles.link} href={'/projects'}>
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
                <div className={`${styles.navigator__container} ${styles.dropdown__catalog} ${containCurrentPage('/gallery') && styles.navigator__container_active}`}>
                    <Link className={styles.link} href={'/gallery'}>
                        <h3 className={styles.navigator__text}>Галерея</h3>
                    </Link>
                </div>
                <div className={`${styles.navigator__container} ${styles.dropdown__catalog} ${containCurrentPage('/contacts') && styles.navigator__container_active}`}>
                    <Link className={styles.link} href={'/contacts'}>
                        <h3 className={styles.navigator__text}>Контакты</h3>
                    </Link>
                </div>
            </div>
            <NavigationHistory/>
            {isLoginVisible && <Login onCloseModal={() => setIsLoginVisible(false)}/>}
            {isBurgerOpen && (
                <>
                    <div className={styles.overlay} onClick={handleOverlayClick} />
                    <Burger onClose={() => setIsBurgerOpen(false)} toggleLogin={toggleLogin} isAuth={isAuth} pathname={pathname} orderItems={orderItems}/>
                </>
            )}

        </header>
    )
}

export function Burger({ onClose, toggleLogin, isAuth, pathname, orderItems }: {
    onClose: () => void;
    toggleLogin: () => void;
    isAuth: boolean;
    pathname: string;
    orderItems: any[];
}) {
    return(
        <div className={styles.burger}>
            <button className={styles.burger_close} onClick={onClose}><CloseSvg fill={'#fff'} width={25} height={25}/></button>
            <div className={styles.burger_nav}>
                <Link className={styles.burger_link} href='/catalog' onClick={onClose}>Каталог</Link>
                <Link className={styles.burger_link} href='/about-us' onClick={onClose}>О компании</Link>
                <Link className={styles.burger_link} href='/projects' onClick={onClose}>Проекты</Link>
                <Link className={styles.burger_link} href='/catalog' onClick={onClose}>Как купить</Link>
                <Link className={styles.burger_link} href='/gallery' onClick={onClose}>Галерея</Link>
                <Link className={styles.burger_link} href='/contacts' onClick={onClose}>Контакты</Link>
            </div>
            <div className={styles.burger_contacts}>
                {
                    !isAuth ?
                        <div className={styles.burger_wrapper} onClick={() => { toggleLogin(); onClose(); }}>
                            <UserSvg stroke={'#fff'} width={26} height={26}/>
                            <h4 className={styles.burger_text}>Вход</h4>
                        </div>
                        :
                        <Link href={'/lk/current-orders'} className={styles.burger_wrapper} onClick={onClose}>
                            <UserSvg stroke={'#fff'} width={26} height={26}/>
                            <h4 className={styles.burger_text}>Кабинет</h4>
                        </Link>
                }
                <Link href={'/basket'} className={styles.burger_wrapper} onClick={onClose}>
                    <div className={styles.burger_basket}>
                        <BasketSvg stroke={'#fff'} width={26} height={26}/>
                        <div className={styles.burger_basket_wrapper}>
                            <h5 className={styles.burger_basket_text}>{orderItems.length}</h5>
                        </div>
                    </div>
                    <h4 className={styles.burger_text}>Корзина</h4>
                </Link>
                <div className={styles.burger_wrapper}>
                    <LocationSvg stroke={'#fff'}/>
                    <h4 className={styles.burger_text}>Москва</h4>
                </div>
                <div className={styles.burger_wrapper}>
                    <WatsappSvg fill={'#fff'}/>
                    <a href="https://wa.me/+79389032666" target="_blank" className={styles.burger_text}>+7 (938) 903-26-66</a>
                </div>
                <h4 className={styles.burger_text}>Россия, г. Грозный, Назарбаева 79</h4>
            </div>
        </div>
    )
}

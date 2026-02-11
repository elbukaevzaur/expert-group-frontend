"use client";

import Link from "next/link";
import Image from "next/image";
import { CatalogModal } from "../catalog/catalogModal";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import NavigationHistory from "@/components/dashboard/navigation-history";
import { useEffect, useRef, useState } from "react";
import {
  INITIAL_TOKEN,
  PROJECTS_CATEGORIES_FETCH_REQUESTED,
  ALL_FAVORITES_REQUEST,
  SET_SELECTED_CITY,
} from "@/lib/reducers";
import { Login } from "@/components/login/login-modal";
import styles from "@/components/dashboard/dashboard.module.css";
import PreviewBasketModal from "../basket/preview-basket-modal";
import { useParams, usePathname } from "next/navigation";
import {
  UserSvg,
  BasketSvg,
  SearchSvg,
  LocationSvg,
  MenuSvg,
  CloseSvg,
  ArrowLeftSvg,
  VectorSvg,
  FavoriteSvg,
  VkSvg,
  TelegramSvg,
  YoutubeSvg,
} from "@/lib/icon-svg";
import SearchForm from "@/components/dashboard/search-form";
import { motion, AnimatePresence } from "framer-motion";
import LoadingCircle from "@/components/loading/loading-circle";
import { ArrowLeft } from "lucide-react";

export default function Dashboard() {
  const { orderItems } = useAppSelector((state) => state.basket);
  const { isAuth, isAuthLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isShowPreviewBasket, setIsShowPreviewBasket] = useState(false);
  const { allProjectsCategories } = useAppSelector(
    (state) => state.projectsCategories
  );
  const pathname = usePathname();
  const params = useParams();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const { selectedCity } = useAppSelector((state) => state.app);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);

  const cities = ["Грозный", "Москва", "Санкт-Петербург", "Пятигорск"];

  const handleCitySelect = (city: string) => {
    dispatch(SET_SELECTED_CITY(city));
    setIsCityDropdownOpen(false);
  };

  const handleMenuClick = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  const handleOverlayClick = () => {
    setIsBurgerOpen(false);
  };

  useEffect(() => {
    dispatch(INITIAL_TOKEN());
    dispatch(PROJECTS_CATEGORIES_FETCH_REQUESTED());
  }, []);

  const toggleLogin = () => {
    setIsLoginVisible(!isLoginVisible);
  };

  const containCurrentPage = (path: string): boolean => {
    containCurrentPage;
    return pathname.startsWith(path);
  };

  return (
    <header className={styles.header}>
      <div className={styles.dashboar_wrapper}>
        <div className={styles.dashboar}>
          <div className={styles.logo_container}>
            <Link href="/">
              <Image
                className={styles.logo}
                src={"/images/logo.svg"}
                alt="Логотип"
                width={206}
                height={47}
                priority={true}
              />
              <Image
                className={styles.logo__small}
                src={"/images/Logo_small.png"}
                alt="Логотип"
                width={94}
                height={44}
                priority={true}
              />
            </Link>
            <span className={styles.slogan}>Меняем методы, но не меняем принципы</span>
          </div>
          <div className={styles.navigator__wrapper}>
            <div className={styles.navigator}>
              <div
                className={`${styles.navigator__container} ${styles.navigator__container_white} ${styles.dropdown__catalog}`}
              >
                <MenuSvg width={24} height={24} />
                <Link href="/catalog">
                  <h3 className={`${styles.navigator__text}`}>Каталог</h3>
                </Link>
                <VectorSvg />
                <div className={styles.dropdown_catalog_content}>
                  <div className={styles.triangle_with_shadow}></div>
                  <div className={styles.dropdown_catalog_wrapper}>
                    <CatalogModal />
                  </div>
                </div>
              </div>
              <div
                className={`${styles.navigator__container} ${
                  styles.dropdown__catalog
                } ${
                  containCurrentPage("/about-us") &&
                  styles.navigator__container_active
                }`}
              >
                
                <Link className={styles.link} href={"/about-us"}>
                  <h3 className={styles.navigator__text}>О Компании</h3>
                  <VectorSvg />
                </Link>
                <div className={styles.dropdown_catalog_content}>
                  <div className={styles.triangle_with_shadow}></div>
                  <div className={styles.dropdown_catalog_wrapper}>
                  <Link href={"/about-us"}>
                    <div className={styles.dropdown_green_wrapper}>
                      <h3
                        className={`${styles.dropdown_green_text} ${
                          containCurrentPage("/about-us") &&
                          styles.dropdown_green_text_active
                        }`}
                      >
                        О нас
                      </h3>
                    </div>
                  </Link>
                  <Link href={"/vacancy"}>
                    <div className={styles.dropdown_green_wrapper}>
                      <h3 className={styles.dropdown_green_text}>Вакансии</h3>
                    </div>
                  </Link>
                  <Link href={"/certificate"}>
                    <div className={styles.dropdown_green_wrapper}>
                      <h3 className={styles.dropdown_green_text}>
                        Сертификаты
                      </h3>
                    </div>
                  </Link>
                  <div className={styles.dropdown_green_wrapper}>
                    <h3 className={styles.dropdown_green_text}>Отзывы</h3>
                  </div>
                  <Link href={"/politics"}>
                    <div className={styles.dropdown_green_wrapper}>
                      <h3 className={styles.dropdown_green_text}>Политика</h3>
                    </div>
                  </Link>
                  <Link href={"/requisites"}>
                    <div className={styles.dropdown_green_wrapper}>
                      <h3 className={styles.dropdown_green_text}>Реквизиты</h3>
                    </div>
                  </Link>
                </div>
              </div>
              </div>

              <div
                className={`${styles.navigator__container} ${
                  styles.dropdown__catalog
                } ${
                  containCurrentPage("/projects") &&
                  styles.navigator__container_active
                }`}
              >
                <Link className={styles.link} href={"/projects"}>
                  <h3 className={styles.navigator__text}>Проекты</h3>
                  <VectorSvg />
                </Link>
                <div className={styles.dropdown_catalog_content}>
                  <div className={styles.triangle_with_shadow}></div>
                  <div className={styles.dropdown_catalog_wrapper}>
                  {allProjectsCategories.map((value, index) => {
                    return (
                      <Link href={`/projects/${value.id}`} key={index}>
                        <div className={styles.dropdown_green_wrapper}>
                          <h3
                            className={`${styles.dropdown_green_text} ${
                              value.id.toString() ===
                                params?.projectsCategoriesId &&
                              styles.dropdown_green_text_active
                            }`}
                          >
                            {value.name}
                          </h3>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                </div>
              </div>
              <div
                className={`${styles.navigator__container} ${
                  styles.dropdown__catalog
                } ${
                  containCurrentPage("/contacts") &&
                  styles.navigator__container_active
                }`}
              >
                <Link className={styles.link} href={"/contacts"}>
                  <h3 className={styles.navigator__text}>Контакты</h3>
                </Link>
              </div>
            </div>
            <div className={styles.wrapper}>
              <div
                className={styles.location}
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              >
                <LocationSvg
                  stroke="rgba(0, 0, 0, 1)"
                  className={styles.location__icon}
                />
                <h3 className={styles.location__text}>{selectedCity}</h3>
                <VectorSvg
                  className={`${styles.location__vector} ${
                    isCityDropdownOpen ? styles.vector_active : ""
                  }`}
                />
                {isCityDropdownOpen && (
                  <div className={styles.city_dropdown}>
                    {cities.map((city) => (
                      <div
                        key={city}
                        className={styles.city_item}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCitySelect(city);
                        }}
                      >
                        {city}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Link
                href="tel:+79298984166"
                target="_blank"
                className={styles.number}
              >
                <h3 className={styles.number__text}>+7 (929) 898-41-66</h3>
              </Link>
            </div>
          </div>

          <button onClick={handleMenuClick} className={styles.dashboar__menu}>
            <MenuSvg stroke="rgba(39, 35, 35, 1)" width={24} height={24} />
          </button>
        </div>
        <div className={styles.search__wrapper}>
          <SearchForm />
          <div className={styles.icons}>
            {isAuthLoading ? (
              <div className={styles.user}>
                {<UserSvg className={styles.user__icon} />}
                <LoadingCircle
                  styles={{ marginTop: 5, width: 20, height: 20 }}
                />
              </div>
            ) : !isAuth ? (
              <div className={styles.user} onClick={toggleLogin}>
                {<UserSvg className={styles.user__icon} fill={isLoginVisible ? "#21a038" : undefined} />}
                <h2 className={`${styles.user__text} ${isLoginVisible ? styles.user_text_active : ""}`}>Войти</h2>
              </div>
            ) : (
              <Link href={"/lk/current-orders"} className={styles.user}>
                {
                  <UserSvg
                    className={styles.user__icon}
                    fill={pathname.startsWith("/lk") ? "#21a038" : undefined}
                  />
                }
                <h2 className={`${styles.user__text} ${pathname.startsWith("/lk") ? styles.user_text_active : ""}`}>Кабинет</h2>
              </Link>
            )}
            <div>
              <Link href={'/favorite'}
                className={styles.dashboar__basket}
              >
                <FavoriteSvg
                  fill={pathname.startsWith("/favorite") ? "#21a038" : undefined}
                />
                <div className={styles.dashboar__basket_container}>
                  <h2 className={`${styles.dashboar__bascet_text} ${pathname.startsWith("/favorite") ? styles.dashboar__bascet_text_active : ""}`}>Избранное</h2>
                </div>
              </Link>
            </div>
            <div>
              <div
                onClick={() => setIsShowPreviewBasket(!isShowPreviewBasket)}
                className={styles.dashboar__basket}
              >
                <BasketSvg
                  className={styles.dashboar__bascet_icon}
                  fill={(pathname.startsWith("/basket") || isShowPreviewBasket) ? "#21a038" : undefined}
                />
                <div className={styles.dashboar__basket_container}>
                  <h2 className={`${styles.dashboar__bascet_text} ${(pathname.startsWith("/basket") || isShowPreviewBasket) ? styles.dashboar__bascet_text_active : ""}`}>Корзина</h2>
                  {/* <h3 className={styles.dashboar__bascet_info}>
                    {orderItems.length > 0 ? orderItems.length : "пусто"}
                  </h3> */}
                  {/* <div className={styles.dashboar__bascet_info_mini}>
                    <h3 className={styles.dashboar__bascet_info_mini_text}>
                      {orderItems.length > 0 ? orderItems.length : "0"}
                    </h3>
                  </div> */}
                  {orderItems.length > 0 && <div className={styles.dashboar__bascet_info_mini}></div>}
                </div>
              </div>
            </div>
            <AnimatePresence>
              {isShowPreviewBasket && (
                <PreviewBasketModal
                  onClose={() => setIsShowPreviewBasket(false)}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <NavigationHistory />
      <AnimatePresence>
        {isLoginVisible && (
          <Login onCloseModal={() => setIsLoginVisible(false)} />
        )}
      </AnimatePresence>
      {isBurgerOpen && (
        <Burger
          onClose={() => setIsBurgerOpen(false)}
          toggleLogin={toggleLogin}
          isAuth={isAuth}
          pathname={pathname}
          orderItems={orderItems}
        />
      )}
    </header>
  );
}

export function Burger({
  onClose,
  toggleLogin,
  isAuth,
  pathname,
  orderItems,
}: {
  onClose: () => void;
  toggleLogin: () => void;
  isAuth: boolean;
  pathname: string;
  orderItems: any[];
}) {
  const [isClose, setIsClose] = useState(false);

  const burgerRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      burgerRef.current &&
      !burgerRef.current.contains(event.target as Node)
    ) {
      setIsClose(true);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleIsClose = () => {
    setIsClose(true);
  };

  return (
    <div ref={burgerRef}>
      <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: isClose ? 0 : 1 }}
    transition={{ duration: 0.2 }}
    className={styles.burger_overlay}
    onClick={handleIsClose}
  />
      <motion.div
        initial={{ right: isClose ? 0 : -280 }}
        animate={{ right: isClose ? -280 : 0 }}
        transition={{ duration: 0.2 }}
        onAnimationComplete={() => {
          if (isClose) {
            onClose();
          }
        }}
        className={styles.burger}
      >
        <button className={styles.burger_close} onClick={handleIsClose}>
          <CloseSvg width={24} height={24} />
        </button>
        
        <div className={styles.burger_nav}>
           {!isAuth ? (
            <div
              className={styles.burger_wrapper}
              onClick={() => {
                toggleLogin();
                handleIsClose();
              }}
            >
              <UserSvg  width={24} height={24} />
              <h4 className={styles.burger_text}>Вход</h4>
            </div>
          ) : (
            <Link
              href={"/lk/current-orders"}
              className={styles.burger_wrapper}
              onClick={handleIsClose}
            >
              <UserSvg width={24} height={24} />
              <h4 className={styles.burger_text}>Кабинет</h4>
            </Link>
          )}
          <Link
            href={"/favorite"}
            className={styles.burger_wrapper}
            onClick={handleIsClose}
          >
            <div className={styles.burger_basket}>
              <FavoriteSvg  width={24} height={24} fill={pathname.startsWith("/favorite") ? "#21a038" : undefined} />
            </div>
            <h4 className={`${styles.burger_text} ${pathname.startsWith("/favorite") ? styles.dashboar__bascet_text_active : ""}`}>Избранное</h4>
          </Link>
          <Link
            href={"/basket"}
            className={styles.burger_wrapper}
            onClick={handleIsClose}
          >
            <div className={styles.burger_basket}>
              <BasketSvg width={24} height={24} fill={pathname.startsWith("/basket") ? "#21a038" : undefined} />
              {orderItems.length > 0 && 
              <div className={styles.burger_basket_wrapper}>
              </div> }
            </div>
            <h4 className={`${styles.burger_text} ${pathname.startsWith("/basket") ? styles.dashboar__bascet_text_active : ""}`}>Корзина</h4>
          </Link>
          <Link
            className={styles.burger_link}
            href="/catalog"
            onClick={handleIsClose}
          >
            Каталог
          </Link>
          <Link
            className={styles.burger_link}
            href="/about-us"
            onClick={handleIsClose}
          >
            О компании
          </Link>
          <Link
            className={styles.burger_link}
            href="/projects"
            onClick={handleIsClose}
          >
            Проекты
          </Link>
          <Link
            className={styles.burger_link}
            href="/catalog"
            onClick={handleIsClose}
          >
            Как купить
          </Link>
          {/* <Link
            className={styles.burger_link}
            href="/gallery"
            onClick={handleIsClose}
          >
            Галерея
          </Link> */}
          <Link
            className={styles.burger_link}
            href="/contacts"
            onClick={handleIsClose}
          >
            Контакты
          </Link>
        </div>
        <div className={styles.burger_contacts}>
          <div className={styles.burger_social_icons}>
            <Link href={'https://vk.com/id769027474'} target="_blank">
              <VkSvg />
            </Link>
            <Link href={'https://t.me/EXPERTGROUPHOLDING'} target="_blank">
              <TelegramSvg />
            </Link>
            <Link href={'https://www.youtube.com/@ExpertGroupgips/shorts'} target="_blank">
              <YoutubeSvg />
            </Link>
          </div>
          <h4 className={styles.footer}>Присоединяйтесь к нам в социальных сетях</h4>
        </div>
      </motion.div>
    </div>
  );
}

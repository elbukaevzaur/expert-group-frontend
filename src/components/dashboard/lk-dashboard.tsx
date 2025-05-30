import Link from "next/link";
import { SIGN_OUT } from "@/lib/reducers";
import { useAppDispatch } from "@/lib/hooks";
import { usePathname, useRouter } from "next/navigation";
import styles from "@/components/dashboard/lk-dashboard.module.css";
import { useState } from "react";
import {
  OrdersSvg,
  PersonalDataSVG,
  PasswordSVG,
  HistorySvg,
  FavoritesSvg,
  ExitSvg,
} from "@/lib/icon-svg";

export default function LkDashboard() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  function handleSignOut() {
    router.push("/");
    dispatch(SIGN_OUT());
  }

  const containCurrentPage = (path: string): boolean => {
    return pathname.startsWith(path);
  };

  const getActivePage = () => {
    if (containCurrentPage("/lk/current-orders")) {
      return {
        name: "Текущие заказы",
        icon: <OrdersSvg />,
      };
    }
    if (containCurrentPage("/lk/personal-data")) {
      return {
        name: "Личные данные",
        icon: <PersonalDataSVG />,
      };
    }
    if (containCurrentPage("/lk/change-password")) {
      return {
        name: "Сменить пароль",
        icon: <PasswordSVG />,
      };
    }
    if (containCurrentPage("/lk/orders-history")) {
      return {
        name: "История заказов",
        icon: <HistorySvg />,
      };
    }
    if (containCurrentPage("/lk/favorites")) {
      return {
        name: "Избранные товары",
        icon: <FavoritesSvg />,
      };
    }
    return {
      name: "Меню",
      icon: null,
    };
  };

  const activePage = getActivePage();

  return (
    <ul>
      <div className={styles.lk_dashboard}>
        {/* Mobile header */}
        <div
          className={styles.mobile_header}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={styles.mobile_header_content}>
            {activePage.icon && (
              <div className={styles.mobile_header_icon}>{activePage.icon}</div>
            )}
            <span>{activePage.name}</span>
          </div>
          <svg
            className={`${styles.arrow} ${isOpen ? styles.arrow_open : ""}`}
            width="16"
            height="10"
            viewBox="0 0 16 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 1.5L8 8.5L1 1.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div
          className={`${styles.menu_items} ${
            isOpen ? styles.menu_items_open : ""
          }`}
        >
          <Link href={"/lk/current-orders"}>
            <li
              className={`${styles.lk_dashboard__button_first} ${
                styles.lk_dashboard__button
              } ${
                containCurrentPage("/lk/current-orders") && styles.active__first
              }`}
            >
              <div className={styles.lk_dashboard__icon}>
                <OrdersSvg />
              </div>
              Текущие заказы
            </li>
          </Link>
          <Link href={"/lk/personal-data"}>
            <li
              className={`${styles.lk_dashboard__button} ${
                containCurrentPage("/lk/personal-data") && styles.active
              }`}
            >
              <div className={styles.lk_dashboard__icon}>
                <PersonalDataSVG />
              </div>
              Личные данные
            </li>
          </Link>
          <Link href={"/lk/change-password"}>
            <li
              className={`${styles.lk_dashboard__button} ${
                containCurrentPage("/lk/change-password") && styles.active
              }`}
            >
              <div className={styles.lk_dashboard__icon}>
                <PasswordSVG />
              </div>
              Сменить пароль
            </li>
          </Link>
          <Link href={"/lk/orders-history"}>
            <li
              className={`${styles.lk_dashboard__button} ${
                containCurrentPage("/lk/orders-history") && styles.active
              }`}
            >
              <div className={styles.lk_dashboard__icon}>
                <HistorySvg />
              </div>
              История заказов
            </li>
          </Link>
          <Link href={"/lk/favorites"}>
            <li
              className={`${styles.lk_dashboard__button} ${
                containCurrentPage("/lk/favorites") && styles.active
              }`}
            >
              <div className={styles.lk_dashboard__icon}>
                <FavoritesSvg />
              </div>
              Избранные товары
            </li>
          </Link>
          <button
            onClick={handleSignOut}
            className={`${styles.lk_dashboard__button} ${styles.lk_dashboard__exit}`}
          >
            <div className={styles.lk_dashboard__icon}>
              <ExitSvg />
            </div>
            Выйти
          </button>
        </div>
      </div>
    </ul>
  );
}

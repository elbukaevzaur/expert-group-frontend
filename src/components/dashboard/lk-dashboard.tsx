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
  UserSvg,
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
      <div className={styles.lk_dashboard}>

        <div
          className={`${styles.menu_items} `}
        >
          <Link href={"/lk/current-orders"}>
            <li
              className={` ${
                styles.lk_dashboard__button
              } ${
                containCurrentPage("/lk/current-orders") && styles.active
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
                <UserSvg />
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
  );
}

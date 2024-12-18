import Link from "next/link";

export default function LkDashboard() {
    return (
        <ul>
            <li>
                <Link href={'/lk'}>Мой кабинет</Link>
            </li>
            <li>
                <Link href={'/lk/current-orders'}>Текущие заказы</Link>
            </li>
            <li>
                <Link href={'/lk/personal-data'}>Личные данные</Link>
            </li>
            <li>
                <Link href={'/lk/change-password'}>Сменить пароль</Link>
            </li>
            <li>
                <Link href={'/lk/orders-history'}>История заказов</Link>
            </li>
            <li>
                <Link href={'/lk/basket'}>Корзина</Link>
            </li>
            <li>
                <Link href={'/lk/favorites'}>Избранные товары</Link>
            </li>
            <button>Выйти</button>
        </ul>
    )
}
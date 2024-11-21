import Link from "next/link";
import Image from "next/image";

export default function Dashboard(){

    return (
        <header className="header">
        <div className="dashboar">
            <Link href='/'><Image src={"/images/Logo.png"} alt="Логотип" width={251} height={52} priority={true}/></Link>
            {/* <Link href='/products'>Products</Link> */}
            <div className="location">
                <Image src={'/images/Location.png'} alt="Локация" width={14} height={18}/>
                <h3 className="location__text">Москва</h3>
                <Image src={'/images/Vector_green.png'} alt="Стрелка" width={13} height={7}/>
            </div>
            <div className="number">
                <h3 className="number__text">+7 (938) 903-26-66</h3>
                <Image src={'/images/Whatsapp_logo.png'} alt="Логотип Whatsapp" width={20} height={20}/>
            </div>
            <div className="search">
                <input type="search" className="search_input" placeholder="Поиск"/>
                <button className="search__button">Найти</button>
            </div>
            <div className="user">
                <Image src={'/images/User.png'} alt="Пользователь" width={26} height={26}/>
                <h2 className="user__text">Вход</h2>
            </div>
            <div className="basket">
                <Image src={'/images/Basket.png'} alt="Корзина" width={26} height={26}/>
                <div className="basket__container">
                    <h2 className="bascet__text">Корзина</h2>
                    <h3 className="bascet__info">пусто</h3>
                </div>
            </div>
        </div>
        <div className="navigator">
            <div className="navigator__container navigator__container_white">
                <Image src={'/images/Catalog_green.png'} alt="Каталог" width={17} height={10}/>
                <h3 className="navigator__text navigator__text_white">Каталог</h3>
            </div>
            <div className="navigator__container">
                <h3 className="navigator__text">О Компании</h3>
                <Image src={'/images/Vector_white.png'} alt="Стрелка" width={13} height={8}/>
            </div>
            <div className="navigator__container">
                <h3 className="navigator__text">Проекты</h3>
                <Image src={'/images/Vector_white.png'} alt="Стрелка" width={13} height={8}/>
            </div>
            <div className="navigator__container">
                <h3 className="navigator__text">Как купить</h3>
                <Image src={'/images/Vector_white.png'} alt="Стрелка" width={13} height={8}/>
            </div>
            <div className="navigator__container">
                <h3 className="navigator__text">Галерея</h3>
                <Image src={'/images/Vector_white.png'} alt="Стрелка" width={13} height={8}/>
            </div>
            <div className="navigator__container">
                <h3 className="navigator__text">Услуги</h3>
                <Image src={'/images/Vector_white.png'} alt="Стрелка" width={13} height={8}/>
            </div>
            <div className="navigator__container">
                <h3 className="navigator__text">Контакты</h3>
                <Image src={'/images/Vector_white.png'} alt="Стрелка" width={13} height={8}/>
            </div>
        </div>
        </header>
    )
}
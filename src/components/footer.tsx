import Image from "next/image";

export default function Footer() {

    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__contact">
                    <Image src={'/images/Logo.png'} alt='Логотип' width={324} height={67}/>
                    <div className="footer__contact_wrraper">
                    <h3 className="footer__contact_text">Россия, г. Грозный, Назарбаева 79</h3>
                    <h3 className="footer__contact_text">+7 (938) 903-26-66</h3>
                    </div>
                    <div className="footer__contact_social">
                        <Image className="footer__contact_icon" src={'/images/VK-logo.png'} alt="Вконтакте логотип" width={45} height={45}/>
                        <Image className="footer__contact_icon" src={'/images/TG-logo.png'} alt="Телеграм логотип" width={45} height={45}/>
                        <Image className="footer__contact_icon" src={'/images/Ins-logo.png'} alt="Инстаграм логотип" width={45} height={45}/>
                    </div>
                    <h3 className="footer__contact_text_last">Присоединяйтесь к нам в социальных сетях</h3>
                </div>
                <div className="footer__wrraper">
                <div className="footer__info">
                    <h2 className="footer__info_title">О компании</h2>
                    <div className="footer__info_wrraper">
                        <h3 className="footer__info_text">О нас</h3>
                        <h3 className="footer__info_text">События</h3>
                        <h3 className="footer__info_text">Сотрудники</h3>
                        <h3 className="footer__info_text">Вакансии</h3>
                        <h3 className="footer__info_text">Сертификаты</h3>
                        <h3 className="footer__info_text">Отзывы</h3>
                        <h3 className="footer__info_text">Политика</h3>
                        <h3 className="footer__info_text">Реквезиты</h3>
                    </div>
                </div>
                <div className="footer__info">
                    <h2 className="footer__info_title">Покупателям</h2>
                    <div className="footer__info_wrraper">
                        <h3 className="footer__info_text">Как оформить заказ</h3>
                        <h3 className="footer__info_text">Способы оплаты</h3>
                        <h3 className="footer__info_text">Условия доставки</h3>
                        <h3 className="footer__info_text">Гарантии и возврат</h3>
                        <h3 className="footer__info_text">Общие условия продаж</h3>
                    </div>
                </div>
                <div className="footer__info">
                    <h2 className="footer__info_title">Контакты</h2>
                    <div className="footer__info_wrraper">
                        <h3 className="footer__info_text">Наши реквизиты</h3>
                        <h3 className="footer__info_text">Где купить</h3>
                        <h3 className="footer__info_text">Как купить</h3>
                    </div>
                </div>
                </div>
            </div>
        </footer>
    )
}
import Image from "next/image"

export default function Basket() {

    return (
        <div className="basket"> 
            <div className="basket__title">
                <h1 className="basket__title_text">Корзина</h1>
                <p className="basket__title_quantity">/ 3 шт.</p>
            </div>
            <div className="basket__content">
                <div className="basket__items_content">
                    <div className="basket__items_wrapper">
                        <h2 className="basket__items_title">Товары в корзине</h2>
                        <button className="basket__items_clear">
                            <h3 className="basket__items_clear_text">ОЧИСТИТЬ</h3>
                            <Image src={'/images/Clear_button.png'} alt="Очистить" width={6.5} height={6.5}/> 
                        </button>
                    </div>
                    <div className="basket__item">
                        <Image src={'/images/Basket_image.png'} alt="Карниз Кт-68" width={283} height={130}/>
                        <h3 className="basket__item_text">Гладкий отливной карниз Кт-68, 56Hx34мм</h3>
                        <div className="basket__item_wrapper">
                            <div className="basket__item_quantity">
                                <button className="basket__item_button">
                                    <Image src={'/images/Minus.png'} alt="Минус" width={20} height={20}/>
                                </button>
                                <h4 className="basket__item_quantity_text">2</h4>
                                <button className="basket__item_button">
                                    <Image src={'/images/Plus.png'} alt="Минус" width={20} height={20}/>
                                </button>
                            </div>
                            <h4 className="basket__item_quantity_sum">515 &#8381; /шт</h4>
                        </div>
                        <h3 className="basket__item_price">10330 &#8381;</h3>
                        <button className="basket__item_delete">
                            <Image src={'/images/Clear_button.png'} alt="Удалить" width={6} height={6}/>
                        </button>
                    </div>
                </div>
                <div className="basket__buy">
                    <div className="basket__buy_total">
                        <h2 className="basket__buy_title">Итого:</h2>
                        <h2 className="basket__buy_sum">3.892 &#8381;/шт</h2>
                    </div>
                    <button className="basket__buy_button">
                        <h3 className="basket__buy_text">Перейти к оформлению</h3>
                    </button>
                    <button className="basket__buy_button basket__buy_button_white">
                        <h3 className="basket__buy_text basket__buy_text_green">Купить в 1 клик</h3>
                    </button>
                </div>
            </div>
        </div>
    )
}
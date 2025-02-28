import Image from "next/image";

export default function ProductDetails(){
    return (
        <section className="detalis">
            <h1 className="detalis__title">Гладкий отливной карниз Кт-68, 56Hx34мм</h1>
            <div className="detalis__info">
                <div className="detalis__container">
                <Image className="detalis__image" src={'/images/image_detalis.png'} alt="Карниз" width={532} height={394}/>
                <div className="detalis__wrraper">
                    <button className="detalis__button_show">                        
                        <h3 className="detalis__button_show_text">Посмотреть в 3D</h3>
                    </button>
                    <button className="detalis__button_like">
                    <h3 className="detalis__button_like_text">В ИЗБРАННОЕ</h3>
                    </button>
                </div>
            </div>
            <div className="detalis__description">
                <h3 className="detalis__description_text detalis__description_margin">Характеристики</h3>
                <h3 className="detalis__description_text">Материал: Гипс Г-16</h3>
                <h3 className="detalis__description_text">Вес: 2кг</h3>
                <h3 className="detalis__description_text">Высота, мм: 56</h3>
                <h3 className="detalis__description_text">Ширина, мм: 18</h3>
                <h3 className="detalis__description_text">Длина, мм: 2000</h3>
                <Image className="detalis__description_image" src={'/images/Description.png'} alt="Характеристики" width={130} height={178}/>
            </div>
            <div className="detalis__price">
                <div className="detalis__price_buy">
                    <div className="detalis__price_buy_wrraper">
                    <div className="detalis__price_buy_title">515 &#8381;/шт</div>
                    <button className="detalis__price_buy_like">
                        <Image src={'/images/Like.png'} alt="Лайк" width={24} height={22}/>
                    </button>
                    </div>
                    <div className="detalis__price_buy_wrraper detalis__price_buy_margin">
                        <div className="detalis__price_buy_wrraper detalis__price_buy_width">
                            <button className="detalis__price_buy_like">
                            <Image src={'/images/Minus.png'} alt="Убрать" width={22} height={22}/>
                            </button>
                            <h3 className="detalis__price_buy_text">1</h3>
                            <button className="detalis__price_buy_like">
                            <Image src={'/images/Plus.png'} alt="Добавить" width={22} height={22}/>
                            </button>
                        </div>
                        <h2 className="detalis__price_buy_subtitle">Есть в наличии: 143</h2>
                    </div>
                    <button className="detalis__price_button">
                    <Image src={'/images/Basket_white.png'} alt="Корзина" width={26} height={26}/>
                    <h3 className="detalis__price_button_text">В корзину</h3>
                    </button>
                    <button className="detalis__price_button detalis__price_button_color">
                    <h3 className="detalis__price_button_text detalis__price_button_text_color">Купить в 1 клик</h3>
                    </button>
                </div>
                <div className="detalis__price_info">
                    <h2 className="detalis__price_info_text detalis__price_info_text_weight">Доставим ваш товар:</h2>
                    <h2 className="detalis__price_info_text">По Москве – 500 руб. (1-2 дня)</h2>
                    <h2 className="detalis__price_info_text">БЕСПЛАТНО – от 5000 руб.</h2>
                    <h2 className="detalis__price_info_text">По России (уточняйте у наших менеджеров)</h2>
                </div>
            </div>
            </div>
            <div className="detalis__navigator">
                <button className="detalis__navigator_button">
                    <h3 className="detalis__navigator_text">НАЛИЧИЕ</h3>
                </button>
                <button className="detalis__navigator_button">
                    <h3 className="detalis__navigator_text">ОТЗЫВЫ</h3>
                </button>
                <button className="detalis__navigator_button">
                    <h3 className="detalis__navigator_text">КАК КУПИТЬ</h3>
                </button>
                <button className="detalis__navigator_button">
                    <h3 className="detalis__navigator_text">ОПЛАТА</h3>
                </button>
                <button className="detalis__navigator_button detalis__navigator_button_active">
                    <h3 className="detalis__navigator_text detalis__navigator_text_active">ГАЛЕРЕЯ</h3>
                </button>
                <button className="detalis__navigator_button">
                    <h3 className="detalis__navigator_text">ДОСТАВКА</h3>
                </button>
                <button className="detalis__navigator_button detalis__navigator_button_width">
                    <h3 className="detalis__navigator_text">ОБМЕН И ВОЗВРАТ</h3>
                </button>
            </div>
            <div className="detalis__show">
                <div className="detalis__show_wrraper">
                <Image src={'/images/Detalis_image.png'} alt="Фото" width={1214} height={584}/>
                <button className="detalis__show_button_left">
                    <Image src={'/images/Vector_left_img.png'} alt="Влево" width={25} height={41}/>
                </button>
                <button className="detalis__show_button_right">
                <Image src={'/images/Vector_right_img.png'} alt="Влево" width={25} height={41}/>
                </button>
                </div>
                <div className="detalis__swipe">
                    <div className="detalis__swipe_circle"></div>
                    <div className="detalis__swipe_circle"></div>
                    <div className="detalis__swipe_circle"></div>
                    <div className="detalis__swipe_circle detalis__swipe_circle_active"></div>
                    <div className="detalis__swipe_circle"></div>
                    <div className="detalis__swipe_circle"></div>
                </div>
            </div>
        </section>
    )
}
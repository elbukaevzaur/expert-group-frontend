'use client'

import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import {BasketItem, Products} from "@/lib/models";
import {ADD_SAVE, REMOVE, REMOVE_ALL, REMOVE_COUNT} from "@/lib/reducers";
import Image from "next/image"
import Link from "next/link";

export default function Basket() {
    const { allItems } = useAppSelector((state) => state.basket);
    const dispatch = useAppDispatch();

    const removeFromBasket = (item: Products) => {
        dispatch(REMOVE(item.id));
    }

    const removeAllFromBasket = () => {
        dispatch(REMOVE_ALL());
    }

    const handleAddToBasket = (item: Products) => {
        dispatch(ADD_SAVE(item))
    }

    const handleRemoveFromBasket = (item: Products) => {
        dispatch(REMOVE_COUNT(item))
    }

    const getTotalPrice = (): string => {
        let totalSum: number = 0;
        if (allItems.length > 0)
            allItems.forEach((value) => {
                totalSum += Number((value.count * value.price).toFixed(2));
            })
        return totalSum.toFixed(2);
    }

    return (
        <div className="basket">
            <div className="basket__title">
                <h1 className="basket__title_text">Корзина</h1>
                <p className="basket__title_quantity">/ {allItems.length} шт.</p>
            </div>
            <div className="basket__content">
                <div className="basket__items_content">
                    <div className="basket__items_wrapper">
                        <div>
                        <h2 className="basket__items_title">{allItems.length > 0 ? 'Товары в корзине': 'Вы пока ничего не добавили в корзину'}</h2>
                        {
                            allItems.length === 0 &&
                            <div style={{paddingTop: '25px', paddingBottom: '25px'}}>
                                <Link href={'/catalog'}><h4 style={{color: '#1fa038'}}>Перейти в каталог товаров</h4></Link>
                            </div>
                        }
                        </div>
                        {
                            allItems.length > 0 &&
                            <button className="basket__items_clear" onClick={removeAllFromBasket}>
                                <h3 className="basket__items_clear_text">ОЧИСТИТЬ</h3>
                                <Image src={'/images/Clear_button.png'} alt="Очистить" width={6.5} height={6.5}/>
                            </button>
                        }
                    </div>
                    {
                        allItems.map((value, index) => {
                            return <div key={index} className="basket__item">
                                <Image src={'/images/Basket_image.png'} alt="Карниз Кт-68" width={283} height={130}/>
                                <Link href={`/catalog/${value.parentCategoryId}/${value.categoryId}/details/${value.id}`}>
                                    <h3 className="basket__item_text">{value.name}</h3>
                                </Link>
                                <div className="basket__item_wrapper">
                                    <div className="basket__item_quantity">
                                        <button onClick={() => handleRemoveFromBasket(value)} className="basket__item_button">
                                            <Image src={'/images/Minus.png'} alt="Minus" width={20} height={20} />
                                        </button>
                                        <h4 className="basket__item_quantity_text">{value.count}</h4>
                                        <button onClick={() => handleAddToBasket(value)} className="basket__item_button">
                                            <Image src={'/images/Plus.png'} alt="Plus" width={20} height={20} />
                                        </button>
                                    </div>
                                    <h4 className="basket__item_quantity_sum">{value.price} &#8381; /шт</h4>
                                </div>
                                <h3 className="basket__item_price">{(value.count * value.price).toFixed(2)} &#8381;</h3>
                                <button className="basket__item_delete" onClick={() => removeFromBasket(value)}>
                                    <Image src={'/images/Clear_button.png'} alt="Удалить" width={6} height={6} />
                                </button>
                            </div>
                        })
                    }
                </div>
                {
                    allItems.length > 0 &&
                    <div className="basket__buy">
                        <div className="basket__buy_total">
                            <h2 className="basket__buy_title">Итого:</h2>
                            <h2 className="basket__buy_sum">{getTotalPrice()} &#8381;/шт</h2>
                        </div>
                        <button className="basket__buy_button">
                            <h3 className="basket__buy_text">Перейти к оформлению</h3>
                        </button>
                        <button className="basket__buy_button basket__buy_button_white">
                            <h3 className="basket__buy_text basket__buy_text_green">Купить в 1 клик</h3>
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}
import Image from "next/image";
import React from "react";
import {OrderItems} from "@/lib/models";
import {useCartActions} from "@/lib/hooks/useCartActions";
import {CloseSmall, GreenMinus, GreenPlus, MinusSmall, PlusSmall, TrashSvg} from "@/lib/icon-svg";
import styles from "./basket-actions.module.css"

interface CartProps {
    orderItem: OrderItems | null;
    productId: number;
    productQuantity: number;
    allowOrderWithoutStock?: boolean;
}

export const AddToCartButton: React.FC<CartProps> = (props: CartProps) => {
    const {handleAddItem} = useCartActions();

    return <button className={styles.basket}
                   onClick={() => handleAddItem(props.orderItem, props.productId, props.productQuantity, props.allowOrderWithoutStock)}>
        {/* <Image src={'/images/Basket_white.png'} alt="Корзина" width={28} height={26}/> */}
        <h3 className={styles.basket_text}>В корзину</h3>
    </button>
}

export const CartItemQuantity: React.FC<CartProps> = (props: CartProps) => {
    const {handleAddItem, handleRemoveItem} = useCartActions();

    // return <div className={`${styles.basket} ${styles.basket_cursor}`}>
        return <div className={styles.wrapper}>
            <button className={styles.basket_button} onClick={() => handleRemoveItem(props.orderItem)}>{
                <MinusSmall width={20} height={20}/>}</button>
            <h3 className={`${styles.basket_text} ${styles.basket_text_margin}`}>{props.orderItem?.quantity}</h3>
            <button className={styles.basket_button}
                    onClick={() => handleAddItem(props.orderItem, props.productId, props.productQuantity, props.allowOrderWithoutStock)}>{
                <PlusSmall width={20} height={20}/>}</button>
        {/* </div> */}
    </div>
}

export const CartItemQuantityDetails: React.FC<CartProps> = (props: CartProps) => {
    const {handleAddItem, handleRemoveItem} = useCartActions();

    return <div className={`${styles.price_buy_wrraper} ${styles.price_buy_width}`}>
        <button onClick={() => handleRemoveItem(props.orderItem)} className={styles.price_buy_like}>
            <Image src={'/images/Minus.png'} alt="Убрать" width={22} height={22}/>
        </button>
        <h3 className={styles.price_buy_text}>{props.orderItem?.quantity}</h3>
        <button onClick={() => handleAddItem(props.orderItem, props.productId, props.productQuantity, props.allowOrderWithoutStock)}
                className={styles.price_buy_like}>
            <Image src={'/images/Plus.png'} alt="Добавить" width={22} height={22}/>
        </button>
    </div>
}

export const CartItemQuantityPreviewBasket: React.FC<CartProps> = (props: CartProps) => {
    const {handleAddItem, handleRemoveItem} = useCartActions();

    return <div className={styles.name}>
        <button onClick={() => handleRemoveItem(props.orderItem)} className={styles.quantity_button}><MinusSmall width={18} height={18} color='#fff'/>
        </button>
        <h3 className={styles.quantity}>{props.orderItem?.quantity}</h3>
        <button onClick={() => handleAddItem(props.orderItem, props.productId, props.productQuantity, props.allowOrderWithoutStock)}
                className={styles.quantity_button}><PlusSmall width={18} height={18} color='#fff'/></button>
    </div>
}

export const CartItemQuantityBasket: React.FC<CartProps> = (props: CartProps) => {
    const {handleAddItem, handleRemoveItem} = useCartActions();

    return <div className={styles.item_quantity}>
        <button onClick={() => handleRemoveItem(props.orderItem)} className={styles.item_button}>
            {<GreenMinus width={19.5} height={19.5}/>}
        </button>
        <h4 className={styles.item_quantity_text}>{props.orderItem?.quantity}</h4>
        <button onClick={() => handleAddItem(props.orderItem, props.productId, props.productQuantity, props.allowOrderWithoutStock)}
                className={styles.item_button}>
            {<GreenPlus/>}
        </button>
    </div>
}

export const RemoveAllPreviewBasket: React.FC = () => {
    const {handleRemoveAllItems} = useCartActions();

    return <button onClick={handleRemoveAllItems} className={styles.clear}>Очистить {<CloseSmall
            stroke={'#7B7B7B'}/>}</button>
}

export const RemoveItemPreviewBasket: React.FC<{productId: string}> = (props: {productId: string}) => {
    const {handleRemoveItemFromBasket} = useCartActions();

    return <button onClick={() => handleRemoveItemFromBasket(props.productId)} className={styles.delete}>
        Удалить товар<TrashSvg/>
    </button>
}

export const RemoveItemBasket: React.FC<{productId: string}> = (props: {productId: string}) => {
    const {handleRemoveItemFromBasket} = useCartActions();

    return <button className={styles.item_delete} onClick={() => handleRemoveItemFromBasket(props.productId)}>
        <Image src={'/images/Clear_button.png'} alt="Удалить" width={6} height={6}/>
    </button>
}

export const RemoveAllBasket: React.FC = () => {
    const {handleRemoveAllItems} = useCartActions();

    return <button className={styles.items_clear} onClick={handleRemoveAllItems}>
        <h3 className={styles.items_clear_text}>ОЧИСТИТЬ</h3>
        <Image src={'/images/Clear_button.png'} alt="Очистить" width={6.5} height={6.5}/>
    </button>
}
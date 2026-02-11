import Image from "next/image";
import React from "react";
import {OrderItems} from "@/lib/models";
import {useCartActions} from "@/lib/hooks/useCartActions";
import {CloseSmall, CloseSvg, GreenMinus, GreenPlus, MinusSmall, PlusSmall, TrashSvg} from "@/lib/icon-svg";
import styles from "./basket-actions.module.css"
import { motion, AnimatePresence } from "framer-motion";

interface CartProps {
    orderItem: OrderItems | null;
    productId: number | string;
    productQuantity: number;
    allowOrderWithoutStock?: boolean;
}

export const AddToCartButton: React.FC<CartProps> = (props: CartProps) => {
    const {handleAddItem} = useCartActions();

    return <motion.button 
                className={styles.basket}
                onClick={() => handleAddItem(props.orderItem, props.productId, props.productQuantity, props.allowOrderWithoutStock)}
                whileHover={{ scale: 1.02, backgroundColor: '#1a852c' }}
                whileTap={{ scale: 0.98 }}
            >
        <h3 className={styles.basket_text}>В корзину</h3>
    </motion.button>
}

export const CartItemQuantity: React.FC<CartProps> = (props: CartProps) => {
    const {handleAddItem, handleRemoveItem} = useCartActions();

    return <motion.div 
                className={styles.wrapper}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
            >
            <motion.button 
                className={styles.basket_button} 
                onClick={() => handleRemoveItem(props.orderItem)}
                whileTap={{ scale: 0.8 }}
            >
                <MinusSmall width={20} height={20}/>
            </motion.button>
            <AnimatePresence mode="wait">
                <motion.h3 
                    key={props.orderItem?.quantity}
                    className={`${styles.basket_text} ${styles.basket_text_margin}`}
                    initial={{ y: 2, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -2, opacity: 0 }}
                    transition={{ duration: 0.1 }}
                >
                    {props.orderItem?.quantity}
                </motion.h3>
            </AnimatePresence>
            <motion.button 
                className={styles.basket_button}
                onClick={() => handleAddItem(props.orderItem, props.productId, props.productQuantity, props.allowOrderWithoutStock)}
                whileTap={{ scale: 0.8 }}
            >
                <PlusSmall width={20} height={20}/>
            </motion.button>
    </motion.div>
}

export const CartItemQuantityDetails: React.FC<CartProps> = (props: CartProps) => {
    const {handleAddItem, handleRemoveItem} = useCartActions();

    return <div className={`${styles.price_buy_wrraper}`}>
        <motion.button 
            onClick={() => handleRemoveItem(props.orderItem)} 
            className={styles.price_buy_like}
            whileTap={{ scale: 0.8 }}
        >
            <MinusSmall width={18} height={18} color='rgba(33, 160, 56, 1)'/>
        </motion.button>
        <AnimatePresence mode="wait">
            <motion.h3 
                key={props.orderItem?.quantity}
                className={styles.price_buy_text}
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -5, opacity: 0 }}
                transition={{ duration: 0.1 }}
            >
                {props.orderItem?.quantity}
            </motion.h3>
        </AnimatePresence>
        <motion.button 
            onClick={() => handleAddItem(props.orderItem, props.productId, props.productQuantity, props.allowOrderWithoutStock)}
            className={styles.price_buy_like}
            whileTap={{ scale: 0.8 }}
        >
            <PlusSmall width={18} height={18} color='rgba(33, 160, 56, 1)'/>
        </motion.button>
    </div>
}

export const CartItemQuantityPreviewBasket: React.FC<CartProps> = (props: CartProps) => {
    const {handleAddItem, handleRemoveItem} = useCartActions();

    return <div className={styles.wrapper} style={{ width: '120px', height: '35px', paddingInline: '10px' }}>
        <motion.button 
            onClick={() => handleRemoveItem(props.orderItem)} 
            className={styles.basket_button}
            whileTap={{ scale: 0.8 }}
        >
            <MinusSmall width={14} height={14} color='#21A038'/>
        </motion.button>
        <AnimatePresence mode="wait">
            <motion.h3 
                key={props.orderItem?.quantity}
                className={styles.basket_text_margin} 
                style={{ fontSize: '16px' }}
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -5, opacity: 0 }}
                transition={{ duration: 0.1 }}
            >
                {props.orderItem?.quantity}
            </motion.h3>
        </AnimatePresence>
        <motion.button 
            onClick={() => handleAddItem(props.orderItem, props.productId, props.productQuantity, props.allowOrderWithoutStock)}
            className={styles.basket_button}
            whileTap={{ scale: 0.8 }}
        >
            <PlusSmall width={14} height={14} color='#21A038'/>
        </motion.button>
    </div>
}

export const CartItemQuantityBasket: React.FC<CartProps> = (props: CartProps) => {
    const {handleAddItem, handleRemoveItem} = useCartActions();

    return <div className={styles.wrapper} style={{ width: '140px' }}>
        <motion.button 
            onClick={() => handleRemoveItem(props.orderItem)} 
            className={styles.basket_button}
            whileTap={{ scale: 0.8 }}
        >
            <MinusSmall width={18} height={18} color='#21A038'/>
        </motion.button>
        <AnimatePresence mode="wait">
            <motion.h4 
                key={props.orderItem?.quantity}
                className={styles.basket_text_margin}
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -5, opacity: 0 }}
                transition={{ duration: 0.1 }}
            >
                {props.orderItem?.quantity}
            </motion.h4>
        </AnimatePresence>
        <motion.button 
            onClick={() => handleAddItem(props.orderItem, props.productId, props.productQuantity, props.allowOrderWithoutStock)}
            className={styles.basket_button}
            whileTap={{ scale: 0.8 }}
        >
            <PlusSmall width={18} height={18} color='#21A038'/>
        </motion.button>
    </div>
}

export const RemoveAllPreviewBasket: React.FC = () => {
    const {handleRemoveAllItems} = useCartActions();

    return <motion.button 
                onClick={handleRemoveAllItems} 
                className={styles.clear}
                whileHover={{ opacity: 0.7 }}
                whileTap={{ scale: 0.95 }}
            >
        Очистить {<CloseSmall stroke={'#7B7B7B'}/>}
    </motion.button>
}

export const RemoveItemPreviewBasket: React.FC<{productId: string}> = (props: {productId: string}) => {
    const {handleRemoveItemFromBasket} = useCartActions();

    return <motion.button 
                onClick={() => handleRemoveItemFromBasket(props.productId)} 
                className={styles.item_delete} 
                style={{ position: 'static' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
        <CloseSvg width={18} height={18} />
    </motion.button>
}

export const RemoveItemBasket: React.FC<{productId: string}> = (props: {productId: string}) => {
    const {handleRemoveItemFromBasket} = useCartActions();

    return <motion.button 
                className={styles.item_delete} 
                onClick={() => handleRemoveItemFromBasket(props.productId)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
        <CloseSvg/>
    </motion.button>
}

export const RemoveAllBasket: React.FC = () => {
    const {handleRemoveAllItems} = useCartActions();

    return <motion.button 
                className={styles.items_clear} 
                onClick={handleRemoveAllItems}
                whileHover={{ opacity: 0.8 }}
                whileTap={{ scale: 0.98 }}
            >
        <h3 className={styles.items_clear_text}>Очистить корзину</h3>
        <TrashSvg/>
    </motion.button>
}
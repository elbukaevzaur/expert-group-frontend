import Link from "next/link";
import Image from "next/image";
import {OrderItems, Products} from "@/lib/models";
import { EventHandler } from "react";
import {useAppDispatch} from "@/lib/hooks";
import {CHANGE_FAVORITES_REQUEST} from "@/lib/reducers";
import {LikeSvg, MinusSmall, PlusSmall} from "@/lib/icon-svg";
import styles from "./products-list-item-component.module.css"

interface ProductsProps {
    key: number,
    product: Products,
    basketItem: OrderItems | null,
    addToBasket: EventHandler<any>,
    removeFromBasket: EventHandler<any>,
    categoryId: string | string[] | undefined,
    isFavorite: boolean
}

export function ProductsListItemComponent(props: ProductsProps) {
    const { product, isFavorite } = props;
    const dispatch = useAppDispatch();

    const getCustomLink = () => {
        let path = `/catalog/${product.parentCategoryId}/${product.categoryId}`;
        // if (params.subCategoryId === undefined){
        //     if (params.categoryId !== product.categoryId.toString()){
        //         path += `/${product.categoryId}`
        //     }
        // }
        path += `/details/${product.id}`
        return path;
    }

    const handleChangeFavorite = () => {
        const request = {
            productId: product.id
        }
        dispatch(CHANGE_FAVORITES_REQUEST(request))
    }

    return (
        <div className={styles.item}>
            <Link href={`${getCustomLink()}`}>
                <Image className={styles.image} src={'/images/image.png'} alt="Карниз" width={295} height={149} />
            </Link>
            <div className={styles.info}>
                <h3 className={styles.name}>{product.name}</h3>
                <div className={styles.wrraper}>
                    <div className={styles.conteiner}>
                        <h3 className={styles.text}>{product.currentQuantity > 0 ? 'В наличии' : 'Нет в наличии'}</h3>
                        <h2 className={styles.price}>{product.price} &#8381;</h2>
                    </div>
                    <div className={styles.action}>
                        <button onClick={handleChangeFavorite} className={styles.like}>
                            {
                                <LikeSvg width={28} height={24} fill={isFavorite ? '#21A038' : 'none'}/>
                            }
                        </button>
                        {
                            props.basketItem == null ?
                                <button className={styles.basket} onClick={props.addToBasket}>
                                    <Image src={'/images/Basket_white.png'} alt="Корзина" width={28} height={26}/>
                                    <h3 className={styles.basket_text}>В корзину</h3>
                                </button>
                                :
                                <div className={`${styles.basket} ${styles.basket_cursor}`}>
                                    <div className={styles.wrapper}>
                                    <button className={styles.basket_button} onClick={props.removeFromBasket}>{<MinusSmall/>}</button>
                                    <h3 className={`${styles.basket_text} ${styles.basket_text_margin}`}>{props.basketItem.quantity}</h3>
                                    <button className={styles.basket_button} onClick={props.addToBasket}>{<PlusSmall/>}</button>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
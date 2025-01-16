import Link from "next/link";
import Image from "next/image";
import {OrderItems, OrderItemsRequest, Products} from "@/lib/models";
import {useAppDispatch} from "@/lib/hooks";
import {CHANGE_FAVORITES_REQUEST, ORDER_ITEMS_DECREMENT, ORDER_ITEMS_INCREMENT} from "@/lib/reducers";
import {LikeSvg, MinusSmall, PlusSmall} from "@/lib/icon-svg";
import styles from "./products-list-item-component.module.css"

interface ProductsProps {
    key: number,
    product: Products,
    basketItem: OrderItems | null,
    isFavorite: boolean
}

export function ProductsListItemComponent(props: ProductsProps) {
    const { product, isFavorite, basketItem } = props;
    const dispatch = useAppDispatch();

    const getCustomLink = () => {
        return `/catalog/${product.parentCategoryId}/${product.categoryId}/details/${product.id}`;
    }

    const handleChangeFavorite = () => {
        const request = {
            productId: product.id
        }
        dispatch(CHANGE_FAVORITES_REQUEST(request))
    }

    const addToBasket = () => {
        dispatch(ORDER_ITEMS_INCREMENT({orderItem: basketItem, productId: product.id}))
    }

    const handleRemoveFromBasket = () => {
        if (basketItem !== null){
            dispatch(ORDER_ITEMS_DECREMENT(basketItem))
        }
    }

    return (
        <div className={styles.item}>
            <Link href={`${getCustomLink()}`}>
                {
                    product.defaultImage == null ?
                        <Image className={styles.image} src={'/images/image.png'} alt="Карниз" width={295} height={149} />
                        :
                        <img className={styles.image} width={295} height={149}
                             src={`${process.env.NEXT_PUBLIC_API_URL}/images/get/product?name=${'small_' + product.defaultImage}`} />
                }
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
                                <button className={styles.basket} onClick={addToBasket}>
                                    <Image src={'/images/Basket_white.png'} alt="Корзина" width={28} height={26}/>
                                    <h3 className={styles.basket_text}>В корзину</h3>
                                </button>
                                :
                                <div className={`${styles.basket} ${styles.basket_cursor}`}>
                                    <div className={styles.wrapper}>
                                    <button className={styles.basket_button} onClick={handleRemoveFromBasket}>{<MinusSmall/>}</button>
                                    <h3 className={`${styles.basket_text} ${styles.basket_text_margin}`}>{props.basketItem.quantity}</h3>
                                    <button className={styles.basket_button} onClick={addToBasket}>{<PlusSmall/>}</button>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
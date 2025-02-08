import Link from "next/link";
import Image from "next/image";
import {OrderItems, Products} from "@/lib/models";
import {useAppDispatch} from "@/lib/hooks";
import {CHANGE_FAVORITES_REQUEST} from "@/lib/reducers";
import {LikeSvg} from "@/lib/icon-svg";
import styles from "./products-list-item-component.module.css"
import {AddToCartButton, CartItemQuantity} from "@/components/basket/basket-actions";

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
                    <div className={styles.content}>
                    <div className={styles.conteiner}>
                        <h3 className={styles.text}>{product.currentQuantity > 0 ? 'В наличии' : 'Нет в наличии'}</h3>
                        <h2 className={styles.price}>{product.price} &#8381;</h2>
                    </div>
                    <button onClick={handleChangeFavorite} className={styles.like}>
                            {
                                <LikeSvg width={28} height={24} fill={isFavorite ? '#21A038' : 'none'}/>
                            }
                        </button>
                        </div>
                    <div className={styles.action}>
                    
                        {
                            props.basketItem == null ?
                                <AddToCartButton productId={product.id} orderItem={basketItem} productQuantity={product.currentQuantity}/>
                                :
                                <CartItemQuantity orderItem={basketItem} productId={product.id} productQuantity={product.currentQuantity}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
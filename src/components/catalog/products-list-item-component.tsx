import Link from "next/link";
import Image from "next/image";
import {OrderItems, Products} from "@/lib/models";
import { EventHandler } from "react";
import {useAppDispatch} from "@/lib/hooks";
import {CHANGE_FAVORITES_REQUEST} from "@/lib/reducers";
import {LikeSvg} from "@/lib/icon-svg";

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
        <div className="item">
            <Link href={`${getCustomLink()}`}>
                <Image className="item__image" src={'/images/image.png'} alt="Карниз" width={295} height={149} />
            </Link>
            <div className="item__info">
                <h3 className="item__name">{product.name}</h3>
                <div className="item__wrraper">
                    <div className="item__conteiner">
                        <h3 className="item__text">{product.currentQuantity > 0 ? 'В наличии' : 'Нет в наличии'}</h3>
                        <h2 className="item__price">{product.price} &#8381;</h2>
                    </div>
                    <div className="item__action">
                        <button onClick={handleChangeFavorite} className="item__like">
                            {
                                <LikeSvg width={28} height={24} fill={isFavorite ? '#21A038' : 'none'}/>
                            }
                        </button>
                        {
                            props.basketItem == null ?
                                <button className="item__basket" onClick={props.addToBasket}>
                                    <Image src={'/images/Basket_white.png'} alt="Корзина" width={28} height={26}/>
                                    <h3 className="item__basket_text">В корзину</h3>
                                </button>
                                :
                                <div className="item__basket item__basket_cursor">
                                    <div className="item__wrapper">
                                    <button className="item__basket_button" onClick={props.removeFromBasket}><Image src={'/images/Minus.png'} alt="Minus" width={17} height={17} /></button>
                                    <h3 className="item__basket_text item__basket_text_margin">{props.basketItem.quantity}</h3>
                                    <button className="item__basket_button" onClick={props.addToBasket}><Image src={'/images/Plus.png'} alt="Plus" width={17} height={17} /></button>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
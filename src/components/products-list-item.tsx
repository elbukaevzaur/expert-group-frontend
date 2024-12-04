import Link from "next/link";
import Image from "next/image";

interface ProductsProps {
    key: number;
    product: {
        id: number,
        name: string;
        price: number;
        currentQuantity: number;
    }
}

export const ProductsListItem = (props: ProductsProps) => {

    const { product } = props;

    return (
        <div className="item">
            <Link href='/products/details'>
                <Image className="item__image" src={'/images/image.png'} alt="Карниз" width={295} height={149} />
            </Link>
            <div className="item__info">
                <h3 className="item__name">{product.name}</h3>
                <div className="item__wrraper">
                    <div className="item__conteiner">
                        <h3 className="item__text">{product.currentQuantity > 0? 'В наличии' : 'Нет в наличии'}</h3>
                        <h2 className="item__price">{product.price} &#8381;</h2>
                    </div>
                    <div className="item__action">
                        <button className="item__like">
                            <Image src={'/images/Like.png'} alt="Лайк" width={28} height={24} />
                        </button>
                        <button className="item__basket">
                            <Image src={'/images/Basket_white.png'} alt="Лайк" width={28} height={26} />
                            <h3 className="item__basket_text">В корзину</h3>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
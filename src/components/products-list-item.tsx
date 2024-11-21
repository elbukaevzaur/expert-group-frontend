import Link from "next/link";
import Image from "next/image";


export default function ProductsListItem() {

    return (
        <div className="item">
            <Link href='/products/details'>
            <Image className="item__image" src={'/images/image.png'} alt="Карниз" width={295} height={149}/>
            </Link>
            <div className="item__info">
                <h3 className="item__name">Гладкий отливной карниз Кт-68, 56Hx34мм</h3>
                <div className="item__wrraper">
                    <div className="item__conteiner">
                        <h3 className="item__text">В наличии</h3>
                        <h2 className="item__price">515 &#8381;</h2>
                    </div>
                    <div className="item__action">
                        <button className="products__back_button">
                            <Image src={'/images/Like.png'} alt="Лайк" width={28} height={24}/>
                        </button>
                        <button className="item__basket">
                            <Image src={'/images/Basket_white.png'} alt="Лайк" width={28} height={26}/>
                            <h3 className="item__basket_text">В корзину</h3>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
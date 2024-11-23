import ProductsFilter from "@/components/products-filter";
import ProductsListItem from "@/components/products-list-item";
import Link from "next/link";
import Image from "next/image";

export default function Products() {
    const products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return (
        <div className="products">
            <div className="products__info_wrapper">
                <h1 className="products__title">КАРНИЗЫ ПОТОЛОЧНЫЕ</h1>
                <div className="products__info">
                    <h3 className="products__info_text">910</h3>
                    </div>
            </div>            
            <ProductsFilter />
            <div className="items">
            {
                products.map((m, index) => {
                    return <ProductsListItem key={index}/>
                })
            }
            </div>
            <button className="items__more">
                <h2 className="items__more_text">Показать еще</h2>
            </button>
            <div className="items__buttons">
                <button className="items__button_left">
                    <Image src={'/images/Vector_left.png'} alt="Лево" width={9} height={17}/>
                </button>
                <button className="items__button_number items__button_number_first">
                    <h3 className="items__button_number_text">1</h3>
                </button>
                <button className="items__button_number items__button_number_active">
                    <h3 className="items__button_number_text items__button_number_text_active">2</h3>
                </button>
                <button className="items__button_number">
                    <h3 className="items__button_number_text">3</h3>
                </button>
                <button className="items__button_number">
                    <h3 className="items__button_number_text">4</h3>
                </button>
                <button className="items__button_number">
                    <h3 className="items__button_number_text">...</h3>
                </button>
                <button className="items__button_number items__button_number_last">
                    <h3 className="items__button_number_text">20</h3>
                </button>
                <button className="items__button_right">
                    <Image src={'/images/Vector_right.png'} alt="Лево" width={9} height={17}/>
                </button>
            </div>
        </div>
    )
}
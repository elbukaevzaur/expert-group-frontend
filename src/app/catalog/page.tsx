'use client'

import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";

export default function ProductsPage() {
    const { allCategories } = useAppSelector((state) => state.categories);


    return (
        <div className="products">
            <div className="subcatalog">
                {
                    allCategories.map((value, index) => {
                        return <div key={index} className="subcatalog__item">
                            <div className="subcatalog__info">
                                <h3 className="subcatalog__title">{value.name}</h3>
                                <h4 className="subcatalog__subtitle">{value.productCount} товара</h4>
                            </div>
                            <Image className="subcatalog__image" src={'/images/subcatalog__2.png'}
                                   alt="Карнизы потолочные"
                                   layout="fill" objectFit="contain"/>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
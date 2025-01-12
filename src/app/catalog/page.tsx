'use client'

import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function ProductsPage() {
    const { allCategories } = useAppSelector((state) => state.categories);
    const pathname = usePathname();

    return (
        <div className="products">
            <div className="subcatalog">
                {
                    allCategories.map((value, index) => {
                        return <Link href={`${pathname}/${value.id}`} key={index} className="subcatalog__item">
                            <div className="subcatalog__info">
                                <h3 className="subcatalog__title">{value.name}</h3>
                                <h4 className="subcatalog__subtitle">{value.productCount} товара</h4>
                            </div>
                            {
                                value.defaultImage == null ?
                                    <Image className="subcatalog__image" src={'/images/subcatalog__2.png'}
                                           alt="Карнизы потолочные"
                                           layout="fill" objectFit="contain"/>
                                    :
                                    <img className="table_img"
                                         src={`${process.env.NEXT_PUBLIC_API_URL}/images/get/product?name=${'thumbnail_' + value.defaultImage}`}/>
                            }
                        </Link>
                    })
                }
            </div>
        </div>
    )
}
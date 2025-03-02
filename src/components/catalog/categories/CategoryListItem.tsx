"use client"

import Image from "next/image";
import Link from "next/link";
import {Category} from "@/lib/models";
import {usePathname} from "next/navigation";

interface Params{
    category: Category
}

export default function CategoryListItem(params: Params) {
    const { category } = params;
    const pathname = usePathname();

    return (
        <Link href={`${pathname}/${category.slug}`} className="subcatalog__item">
            <div className="subcatalog__info">
                <h3 className="subcatalog__title">{category.name}</h3>
                <h4 className="subcatalog__subtitle">{category.productCount} товара</h4>
            </div>
            {
                category.defaultImage == null ?
                    <Image 
                        className="subcatalog__image" 
                        src={'/images/Subcatalog__2.png'}
                        alt={category.name}
                        layout="fill" 
                        objectFit="contain"
                    />
                    :
                    <img 
                        className="subcatalog__image"
                        src={`${process.env.NEXT_PUBLIC_API_URL}/images/get/product?name=${'small_' + category.defaultImage}`}
                        alt={category.name}
                    />
            }
        </Link>
    )
}
"use client"

import Image from "next/image";
import Link from "next/link";
import {Category} from "@/lib/models";
import {usePathname} from "next/navigation";
import {getProductCountText} from "@/lib/consts";

interface Params{
    category: Category
    customPathname?: string
}

export default function CategoryListItem(params: Params) {
    const { category, customPathname } = params;
    const pathname = usePathname();

    return (
        <Link href={`${customPathname? customPathname : pathname}/${category.slug}`} className="subcatalog__item">
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
                    <Image 
                        className="subcatalog__image"
                        src={`${process.env.NEXT_PUBLIC_API_URL}/images/get/product?name=${'small_' + category.defaultImage}`}
                        alt={category.name}
                        // width={296}
                        // height={150}
                        fill
                    />
                }
            {/* <div className="subcatalog__info"> */}
                <h3 className="subcatalog__title">{category.name}</h3>
                <h4 className="subcatalog__subtitle">{getProductCountText(category.productCount)}</h4>
            {/* </div> */}
        </Link>
    )
}
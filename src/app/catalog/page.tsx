"use client"

import { useAppSelector } from "@/lib/hooks";
import CategoryListItem from "@/components/catalog/categories/CategoryListItem";

export default function ProductsPage() {
    const { allCategories } = useAppSelector((state) => state.categories);

    return (
        <div className="products">
            <div className="subcatalog">
                {
                    allCategories.map((value, index) => {
                        return <CategoryListItem key={index} category={value}/>
                    })
                }
            </div>
        </div>
    )
}
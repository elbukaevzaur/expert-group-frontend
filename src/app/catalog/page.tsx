"use client"

import CategoryListItem from "@/components/catalog/categories/CategoryListItem";
import {useEffect, useState} from "react";
import {getAll} from "@/lib/http/categoriesRequest";
import {Category} from "@/lib/models";

export default function ProductsPage() {

    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        getAll(undefined).then((resp) => {
            setCategories(resp.data)
        })
    }, []);

    return (
        <div className="products">
            <div className="subcatalog">
                {
                    categories.map((value, index) => {
                        return <CategoryListItem key={index} category={value}/>
                    })
                }
            </div>
        </div>
    )
}
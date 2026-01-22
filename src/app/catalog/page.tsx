"use client"

import CategoryListItem from "@/components/catalog/categories/CategoryListItem";
import {useEffect, useState} from "react";
import {getAll} from "@/lib/http/categoriesRequest";
import {Category} from "@/lib/models";
import styles from './catalog.module.css'

export default function ProductsPage() {

    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        getAll(undefined).then((resp) => {
            setCategories(resp.data)
        })
    }, []);

    return (
        <div className={styles.catalog}>
            <div className={styles.list}>
                {
                    categories.map((value, index) => {
                        return <CategoryListItem key={index} category={value}/>
                    })
                }
            </div>
        </div>
    )
}
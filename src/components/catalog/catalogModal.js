"use client"

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
    CATEGORIES_FETCH_REQUESTED,
    ADD_FILTER,
    FILTERS_FETCH_REQUESTED
} from "@/lib/reducers";
import { useRouter } from 'next/navigation'
import { useEffect } from "react";
import styles from "@/components/catalog/catalogModal.module.css"

export const CatalogModal = () => {
    const { allCategories } = useAppSelector((state) => state.categories);
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(CATEGORIES_FETCH_REQUESTED());
    }, [])

    const changeCategory = (categoryId) => {
        router.push(`/catalog/${categoryId}`)
        dispatch(ADD_FILTER({ field: 'categoryId', value: [categoryId] }));
        loadFiltersData(categoryId);
    }

    const loadFiltersData = (categoryId) => {
        dispatch(FILTERS_FETCH_REQUESTED(categoryId));
    }

    return <div style={{ flexDirection: 'column' }}>
        {
            allCategories.map((value, index) => {
                return <div className={styles.dropdown_catalog_wrapper} key={index}>
                    <button className={styles.dropdown_catalog} onClick={() => changeCategory(value.id)} key={index}>{value.name}</button>
                    <div className={styles.dropdown_catalog_quantity}>
                        <h4 className={styles.dropdown_catalog_quantity_text}>{value.productCount}</h4>
                    </div>
                    </div>
            })
        }
    </div>
}
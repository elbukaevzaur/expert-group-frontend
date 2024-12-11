import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
    CATEGORIES_FETCH_REQUESTED,
    ADD_FILTER,
    FILTERS_FETCH_REQUESTED
} from "@/lib/reducers";
import { useRouter } from 'next/navigation'
import { useEffect } from "react";

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
                return <div className="dropdown-catalog_wrapper" key={index}>
                    <button className="dropdown-catalog" onClick={() => changeCategory(value.id)} key={index}>{value.name}</button>
                    <div className="dropdown-catalog_quantity">
                        <h4 className="dropdown-catalog_quantity_text">{value.productCount}</h4>
                    </div>
                    </div>
            })
        }
    </div>
}
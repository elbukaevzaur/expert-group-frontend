import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { CATEGORIES_FETCH_REQUESTED, ADD_FILTER, PRODUCTS_FETCH_REQUESTED } from "@/lib/reducers";
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from "react";

export const CatalogModal = () => {
    const { allCategories } = useAppSelector((state) => state.categories);
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(CATEGORIES_FETCH_REQUESTED());
    }, [])

    const changeCategory = (categoryId) => {
        if (pathname !== '/products')
            router.push('/products')
        dispatch(ADD_FILTER({ field: 'categoryId', value: [categoryId] }));
    }

    return <div style={{ flexDirection: 'column' }}>
        {
            allCategories.map((value, index) => {
                return <div key={index}><button className="dropdown-catalog" onClick={() => changeCategory(value.id)} key={index}>{value.name} / {value.productCount}</button></div>
            })
        }
    </div>
}
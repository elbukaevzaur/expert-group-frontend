'use client'

import {useParams} from "next/navigation";
import ProductsListComponent from "@/components/catalog/products-list-component";

export default function CategoriesPage() {
    const params = useParams();

    return (
        <ProductsListComponent categoryId={params.subCategoryId} />
    )
}
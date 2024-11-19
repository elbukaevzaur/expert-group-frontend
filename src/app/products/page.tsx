import ProductsFilter from "@/components/products-filter";
import ProductsListItem from "@/components/products-list-item";
import Link from "next/link";

export default function Products() {
    const products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return (
        <div>
            <h1>Products Hello world</h1>
            <ProductsFilter />
            {
                products.map((m, index) => {
                    return <ProductsListItem key={index}/>
                })
            }
        </div>
    )
}
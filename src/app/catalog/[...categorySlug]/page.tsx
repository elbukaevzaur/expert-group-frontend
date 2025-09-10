import ProductsListComponent from "@/components/catalog/products-list-component";
import ProductDetailsComponent from "@/components/catalog/product-details-component";

type tParams = Promise<{ categorySlug: string[] }>;

export default async function Page(props: { params: tParams }) {
    const { categorySlug } = await props.params;
    return (
            categorySlug[categorySlug.length - 1].startsWith("product") ?
                <ProductDetailsComponent slug={categorySlug[categorySlug.length - 1].replace("product-", "")}/>
                    :
                <ProductsListComponent slug={categorySlug[categorySlug.length - 1]} />
    )
}
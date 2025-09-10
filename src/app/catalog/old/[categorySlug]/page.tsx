import ProductsListComponent from "@/components/catalog/products-list-component";

type tParams = Promise<{ categorySlug: string }>;

export default async function Page(props: { params: tParams }) {
    const { categorySlug } = await props.params;

    return (
        <ProductsListComponent slug={categorySlug} />
    )
}
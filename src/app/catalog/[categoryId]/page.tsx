import ProductsListComponent from "@/components/catalog/products-list-component";

type tParams = Promise<{ categoryId: string }>;

export default async function CategoriesPage(props: { params: tParams }) {
    const { categoryId } = await props.params;
    return (
        <ProductsListComponent categoryId={categoryId} />
    )
}
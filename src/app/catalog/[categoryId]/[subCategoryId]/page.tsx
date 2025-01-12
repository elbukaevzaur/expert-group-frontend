import ProductsListComponent from "@/components/catalog/products-list-component";

type tParams = Promise<{ subCategoryId: string }>;

export default async function CategoriesPage(props: { params: tParams }) {
    const { subCategoryId } = await props.params;

    return (
        <ProductsListComponent categoryId={subCategoryId} />
    )
}
import ProductsListComponent from "@/components/catalog/products-list-component";

type tParams = Promise<{ subCategorySlug: string }>;

export default async function CategoriesPage(props: { params: tParams }) {
    const { subCategorySlug } = await props.params;

    return (
        <ProductsListComponent slug={subCategorySlug} />
    )
}
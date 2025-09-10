import ProductDetailsComponent from "@/components/catalog/product-details-component";

type tParams = Promise<{ productDetailsSlug: string }>;

export default async function ProductDetailsPage(props: { params: tParams }) {
    const {productDetailsSlug} = await props.params;

    return <div>
        <ProductDetailsComponent slug={productDetailsSlug}/>
    </div>

}
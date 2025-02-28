import ProductDetailsComponent from "@/components/catalog/product-details-component";

type tParams = Promise<{ slug: string }>;

export default async function ProductDetailsPage(props: { params: tParams }) {
    const {slug} = await props.params;

    return <div>
        <ProductDetailsComponent slug={slug}/>
    </div>

}
import ProductDetailsComponent from "@/components/catalog/product-details-component";

type tParams = Promise<{ id: string }>;

export default async function ProductDetailsPage(props: { params: tParams }) {
    const {id} = await props.params;

    return <div>
        <ProductDetailsComponent id={id}/>
    </div>

}
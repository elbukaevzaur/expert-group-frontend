import OrderDetailsComponent from "@/components/order/order-details-component";

type tParams = Promise<{ orderId: number }>;

export default async function OrderDetails(props: { params: tParams }) {
  const { orderId } = await props.params;

  return (
    <OrderDetailsComponent orderId={orderId}/>
  );
}

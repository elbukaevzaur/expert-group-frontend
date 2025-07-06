import ConfirmEmailComponentPage from "@/app/confirm-email/[token]/confirm-email-component";

type tParams = Promise<{ token: string }>;

export default async function ConfirmEmailPage(props: { params: tParams }) {
    const { token } = await props.params;

    return <ConfirmEmailComponentPage token={token} />
}
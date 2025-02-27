import VacancyDetailsComponent from "@/components/vacancies/vacancyDetailsComponent";

type tParams = Promise<{ slug: string }>;

export default async function Job(props: { params: tParams }) {
    const { slug } = await props.params;

    return <VacancyDetailsComponent slug={slug} />
}
import ProjectsList from "@/components/projects/projectsListComponent";

type tParams = Promise<{ projectsCategoriesId: string }>;

export default async function ProjectsForParameterPage(props: { params: tParams }) {
    const { projectsCategoriesId } = await props.params;
    return <ProjectsList projectsCategoriesId={projectsCategoriesId}/>
}
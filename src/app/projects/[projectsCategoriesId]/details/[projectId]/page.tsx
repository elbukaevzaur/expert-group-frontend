import ProjectDetailsComponent from "@/components/project-details-component";

type tParams = Promise<{ projectId: string }>;

export default async function ProjectDetails(props: { params: tParams }) {
    const { projectId } = await props.params;
    return (
        <ProjectDetailsComponent projectId={projectId} />
    )
}
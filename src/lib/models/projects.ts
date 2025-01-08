import {ProjectsCategories} from "@/lib/models/projectsCategories";

export interface ProjectsListResponse {
    id: number,
    name: string,
    defaultImage: string,
    projectCategoryId: number,
    category: ProjectsCategories
}
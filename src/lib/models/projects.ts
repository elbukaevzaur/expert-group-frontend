import {ProjectsCategories} from "@/lib/models/projectsCategories";
import {ProductImages} from "@/lib/models/products";

export interface ProjectsListResponse {
    id: number,
    name: string,
    defaultImage: string,
    projectCategoryId: number,
    category: ProjectsCategories,
    address: string
    imagePath: string
}

export interface ProjectsDetailsResponse {
    id: number,
    name: string,
    description: string,
    defaultImage: string,
    images: ProductImages[],
    projectCategoryId: number,
    category: ProjectsCategories,
    address: string
}
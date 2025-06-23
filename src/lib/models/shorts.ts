import {ProductImages} from "@/lib/models/products";

export interface Shorts {
    id: number
    name: string
    description: string
    fileName: string
    projectId: number
    popular: boolean
    popularityScore: number
    project: ShortsProject
    images: ProductImages[]
    previewImageName: string
}

export interface ShortsProject {
    id: number
    name: string
    projectCategoryId: number
}
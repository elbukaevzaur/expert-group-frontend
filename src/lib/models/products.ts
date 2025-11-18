export interface Products {
    id: number,
    name: string,
    slug: string,
    price: number,
    currentQuantity: number,
    categoryId: number,
    parentCategoryId: number,
    defaultImage: string | null,
    allowOrderWithoutStock?: boolean
}

interface Materials {
    id: number,
    name: string
}
export interface ProductDetailsResponse {
    id: number,
    name: string,
    description: string,
    height: number,
    width: number,
    length: number,
    lengthTo: number,
    thickness: number,
    outerDiameter: number,
    categoryId: number,
    currentQuantity: number;
    price: number,
    unitType: string
    material: Materials,
    defaultImage: string,
    draftImage: string,
    images: ProductImages[],
    modelLink: string,
    allowOrderWithoutStock?: boolean
}

export interface ProductImages{
    id: number,
    imagePath: string,
    productId: number,
    createdAt: string,
}

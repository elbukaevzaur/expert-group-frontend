export interface Products {
    id: number,
    name: string,
    price: number,
    currentQuantity: number,
    categoryId: number
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
    thickness: number,
    outerDiameter: number,
    categoryId: number,
    currentQuantity: number;
    price: number,
    material: Materials
}
export enum SliderType {
    CATEGORY = 'CATEGORY',
    PRODUCT = 'PRODUCT',
    PROJECT = 'PROJECT'
}

export interface SliderItem {
    id: number;
    title: string;
    imageUrl: string;
    type: SliderType;
    referenceId: string;
    sortOrder: number;
    isActive: boolean;
}

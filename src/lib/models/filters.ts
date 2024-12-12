export interface FiltersResponse{
    fieldName: string,
    value: number[] | {id: number, name: string}[],
    filter: string
}
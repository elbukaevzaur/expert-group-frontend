export interface FiltersResponse{
    fieldName: string,
    value: {id: number, name: string}[],
    range: {min: number, max: number}
    operator: string
}
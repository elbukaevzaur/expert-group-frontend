export interface FiltersResponse{
    fieldName: string,
    value: {id: number, name: string, countResults: number}[],
    range: {min: number, max: number}
    operator: string
}
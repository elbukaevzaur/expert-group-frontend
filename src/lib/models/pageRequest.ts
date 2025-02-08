export interface FilterProperty {
    field: string;
    value: string[];
    operator: string
}

export interface OrderedPageRequest {
    columnName: string;
    orderDirection: string;
}

export interface Pageable {
    perPage?: number;
    totalPages?: number,
    page: number,
}

export interface PageRequest extends Pageable {
    filters: FilterProperty[];
    orderedColumns: OrderedPageRequest[];
}

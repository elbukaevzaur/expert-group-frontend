export interface FilterProperty {
    field: string;
    value: string[];
}

export interface OrderedPageRequest {
    columnName: string;
    orderDirection: string;
}

export interface Pageable {
    page?: number;
    perPage?: number;
}

export interface PageRequest extends Pageable {

    filters: FilterProperty[];
    orderedColumns?: OrderedPageRequest[];
}

import {OrderedPageRequest} from "@/lib/models/pageRequest";

export interface PageResponse<T> {
    totalPages: number,
    page: number,
    perPage: number,
    content: T[],
    orderedColumns: OrderedPageRequest[];
}

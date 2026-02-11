import {OrderedPageRequest} from "@/lib/models/pageRequest";

export interface PageResponse<T> {
    totalResult?: number,
    totalPages: number,
    page: number,
    perPage: number,
    content: T[],
    orderedColumns: OrderedPageRequest[];
}

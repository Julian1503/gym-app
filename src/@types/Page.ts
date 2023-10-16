export interface Page<T> {
    content: T[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    first: boolean;
    size: number;
    number: number;
    numberOfElements: number;
    empty: boolean;
}

interface Pageable {
    sort: Sort;
    offset: number;
    pageSize: number;
    pageNumber: number;
    paged: boolean;
    unpaged: boolean;
}

interface Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}
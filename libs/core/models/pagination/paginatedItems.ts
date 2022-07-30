import { Pagination } from './pagination';

/** Paginated items wrapper. */
export interface PaginatedItems<T> {

  /** Items on page. */
  readonly items: readonly T[];

  /** Pagination data. */
  readonly pagination: Pagination;
}

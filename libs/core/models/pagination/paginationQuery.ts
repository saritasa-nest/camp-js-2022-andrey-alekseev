import { Pagination } from '../../models/pagination/pagination';
import { SortOptions } from '../../models/sortOptions';

/** Pagination query data. */
export interface PaginationQuery<TItemSortFields, TItemFilters>{

  /** Pagination data. */
  readonly pagination: Pagination;

  /** Sort options. */
  readonly sortOptions: SortOptions<TItemSortFields> | null;

  /** Filter options. */
  readonly filterOptions: TItemFilters | null;
}

/** Pagination query without pagination. */
export type PaginationExtraQuery<TItemSortFields, TItemFilters> = Omit<
  PaginationQuery<TItemSortFields, TItemFilters>,
  'pagination'
>;

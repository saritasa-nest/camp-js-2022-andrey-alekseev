/** Options required to paginate list. */
export interface LimitOffsetPaginationOptions {

  /** 1-based page number. */
  readonly limit: number;

  /** Amount of items on the page. */
  readonly offset: number;
}

/** Limit offset pagination wrapper. */
export interface LimitOffsetPagination<T>{

  /** Items on page. */
  readonly items: readonly T[];

  /** Count of all items. */
  readonly count: number;
}

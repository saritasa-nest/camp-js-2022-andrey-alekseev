/** Options required to paginate list. */
export interface LimitOffsetPaginationOptions {

  /** 1-based page number. */
  readonly limit: number;

  /** Amount of items on the page. */
  readonly offset: number;
}

/** Limit offset pagination DTO. */
export interface LimitOffsetPaginationDto<T> {

  /** Count of all items. */
  readonly count: number;

  /** Link to next page. */
  readonly next: string;

  /** Link to previous page. */
  readonly previous: string;

  /** Items on page. */
  readonly results: readonly T[];
}

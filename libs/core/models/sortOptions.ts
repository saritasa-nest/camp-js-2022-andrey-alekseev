/** Sort direction. */
export enum SortDirection {
  Ascending = 'asc',
  Descending = 'desc',
}

/** Sort options for a list of items. */
export interface SortOptions<T> {

  /** Type. */
  readonly direction: SortDirection;

  /** Field by which items should be sorted. */
  readonly field: T;
}

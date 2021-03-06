/** Sort direction. */
export enum SortDirection {
  Ascending = 'Ascending',
  Descending = 'Descending',
}

/** Sort options for a list of items. */
export interface SortOptions<T> {

  /** Type. */
  readonly direction: SortDirection;

  /** Field by which items should be sorted. */
  readonly field: T;
}

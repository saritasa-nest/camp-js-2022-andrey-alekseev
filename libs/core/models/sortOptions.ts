import { enumToValues } from 'enum-to-array';

/** Sort direction. */
export enum SortDirection {
  Ascending = 'asc',
  Descending = 'desc',
}

/**
 * Check if string is sort direction.
 * @param sortDirection String to check.
 */
export function isSortDirection(sortDirection: string): sortDirection is SortDirection {
  return enumToValues(SortDirection).includes(sortDirection as SortDirection);
}

/** Sort options for a list of items. */
export interface SortOptions<T> {

  /** Type. */
  readonly direction: SortDirection;

  /** Field by which items should be sorted. */
  readonly field: T;
}

import { Sort } from '@angular/material/sort';
import { SortDirection, SortOptions } from '@js-camp/core/models/sortOptions';

/**
 * Convert Material sort to sort options.
 * @param sort Material sort.
 */
export function matSortToSortOptions<TSortFields extends string>(sort: Sort): SortOptions<TSortFields> | null {
  if (sort.direction === '') {
    return null;
  }

  return {
    field: <TSortFields>sort.active,
    direction: <SortDirection>sort.direction,
  };
}

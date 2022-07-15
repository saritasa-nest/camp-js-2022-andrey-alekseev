import { SortOptions, SortDirection } from '../models/sortOptions';

import { LimitOffsetQueryDto } from '../dtos/limitOffsetQuery.dto';

import {
  LimitOffsetPaginationOptions,
} from '../models/limitOffsetPagination';

/** Limit offset query mapper. */
export namespace LimitOffsetQueryMapper {

  /**
   * Map options to dto.
   * @param limitOffsetPaginationOptions Pagination options.
   * @param sortOptions Sort options.
   * @param fieldMap Object for mapping sort fields to the ones that are acceptable for the API.
   * @param searchString The name of the anime entered by the user.
   */
  export function toDto<T extends string>(
    limitOffsetPaginationOptions: LimitOffsetPaginationOptions,
    sortOptions: SortOptions<T> | null,
    fieldMap: Record<T, string>,
    searchString: string | null,
  ): LimitOffsetQueryDto {
    let ordering = '';
    let search = searchString;
    if (sortOptions !== null) {
      const sortField = fieldMap[sortOptions.field];
      ordering = sortOptions.direction === SortDirection.Ascending ? sortField : `-${sortField}`;
    }
    return {
      limit: limitOffsetPaginationOptions.limit,
      offset: limitOffsetPaginationOptions.offset,
      ordering,
      search
    };
  }
}

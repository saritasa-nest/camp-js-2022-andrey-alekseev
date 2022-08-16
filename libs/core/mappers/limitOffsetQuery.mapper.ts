import { Pagination } from '../models/pagination/pagination';
import { SortOptions, SortDirection } from '../models/sortOptions';
import { LimitOffsetQueryDto } from '../dtos/limitOffsetQuery.dto';

import { LimitOffsetPaginationMapper } from './limitOffsetPagination.mapper';

/** Limit offset query mapper. */
export namespace LimitOffsetQueryMapper {

  /**
   * Map options to dto.
   * @param pagination Pagination options.
   * @param sortOptions Sort options.
   * @param fieldMap Object for mapping sort fields to the ones that are acceptable for the API.
   */
  export function toDto<T extends string>(
    pagination: Pagination,
    sortOptions: SortOptions<T> | null,
    fieldMap: Record<T, string> | null,
  ): LimitOffsetQueryDto {
    let ordering = '';
    if (sortOptions !== null) {
      if (fieldMap === null) {
        throw new Error('Fields map must be provided with sort options.');
      }
      const sortField = fieldMap[sortOptions.field];
      ordering = sortOptions.direction === SortDirection.Ascending ? sortField : `-${sortField}`;
    }
    return {
      ...LimitOffsetPaginationMapper.mapPaginationToLimitOffsetOptions(pagination),
      ordering,
    };
  }
}

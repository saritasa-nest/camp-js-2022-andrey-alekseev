import { PaginationData } from '@js-camp/core/pagination';
import { LimitOffsetPaginationOptions } from '@js-camp/core/models/limitOffsetPagination';

/**
 * Convert pagination data to limit offset options.
 * @param paginationData Pagination data.
 */
export function paginationDataToLimitOffsetOptions(paginationData: PaginationData): LimitOffsetPaginationOptions {
  return {
    limit: paginationData.pageSize,
    offset: paginationData.offset,
  };
}

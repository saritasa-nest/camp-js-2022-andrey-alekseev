import { LimitOffsetPaginationOptions } from '../models/pagination/limitOffsetPagination';
import { Pagination } from '../models/pagination/pagination';
import { PaginatedItems } from '../models/pagination/paginatedItems';
import { LimitOffsetPaginationDto } from '../dtos/limitOffsetPagination.dto';

/** Pagination mapper. */
export namespace LimitOffsetPaginationMapper {

  /**
   * Maps pagination from dto.
   * @param pageDto Dto page.
   * @param mapFunction Map function for items.
   * @param pagination Pagination data.
   */
  export function mapPaginationFromDto<TDto, TDomain>(
    pageDto: LimitOffsetPaginationDto<TDto>,
    mapFunction: (dto: TDto) => TDomain,
    pagination: Pagination,
  ): PaginatedItems<TDomain> {
    return {
      items: pageDto.results.map(mapFunction),
      pagination: new Pagination(
        pagination.page,
        pagination.pageSize,
        pageDto.count,
      ),
    };
  }

  /**
   * Map pagination data to limit offset options.
   * @param pagination Pagination data.
   */
  export function mapPaginationToLimitOffsetOptions(pagination: Pagination): LimitOffsetPaginationOptions {
    return {
      limit: pagination.pageSize,
      offset: pagination.pageSize * pagination.page,
    };
  }

}

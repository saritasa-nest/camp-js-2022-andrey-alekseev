import { LimitOffsetPaginationDto } from '../dtos/limitOffsetPagination.dto';
import { LimitOffsetPagination } from '../models/limitOffsetPagination';
import { PaginationData } from '../pagination';

/** Pagination mapper. */
export namespace PaginationMapper {

  /**
   * Maps pagination from dto.
   * @param pageDto Dto page.
   * @param mapFunction Map function for items.
   * @param paginationData Pagination data.
   */
  export function mapPaginationFromDto<TDto, TDomain>(
    pageDto: LimitOffsetPaginationDto<TDto>,
    mapFunction: (dto: TDto) => TDomain,
    paginationData: PaginationData,
  ): LimitOffsetPagination<TDomain> {
    return {
      items: pageDto.results.map(mapFunction),
      pagination: new PaginationData(
        paginationData.page,
        paginationData.pageSize,
        pageDto.count,
      ),
    };
  }
}

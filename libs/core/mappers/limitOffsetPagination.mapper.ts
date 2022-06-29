import { LimitOffsetPaginationDto } from '../dtos/limitOffsetPagination.dto';
import { LimitOffsetPagination } from '../models/limitOffsetPagination';

/** Pagination mapper. */
export namespace PaginationMapper {

  /**
   * Maps pagination from dto.
   * @param pageDto Dto page.
   * @param mapFunction Map function for items.
   */
  export function mapPaginationFromDto<TDto, TDomain>(
    pageDto: LimitOffsetPaginationDto<TDto>,
    mapFunction: (dto: TDto) => TDomain,
  ): LimitOffsetPagination<TDomain> {
    return {
      items: pageDto.results.map(mapFunction),
      count: pageDto.count,
    };
  }
}

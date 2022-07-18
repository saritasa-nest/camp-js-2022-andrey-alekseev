import {
  LimitOffsetPagination,
  LimitOffsetPaginationOptions,
} from '@js-camp/core/models/limitOffsetPagination';
import { AnimeBaseDto } from '@js-camp/core/dtos/animeBase.dto';
import {
  AnimeBase,
  AnimeFilterField,
  AnimeSortField,
} from '@js-camp/core/models/anime/animeBase';
import { AnimeBaseMapper } from '@js-camp/core/mappers/animeBase.mapper';
import {
  PaginationMapper,
} from '@js-camp/core/mappers/limitOffsetPagination.mapper';
import {
  LimitOffsetPaginationDto,
} from '@js-camp/core/dtos/limitOffsetPagination.dto';
import { SortOptions } from '@js-camp/core/models/sortOptions';
import {
  LimitOffsetQueryMapper,
} from '@js-camp/core/mappers/limitOffsetQuery.mapper';
import { animeSortFieldMap } from '@js-camp/core/mappers/animeSortFieldMap';

import { FilterOption } from '@js-camp/core/models/filterOption';
import {
  FilterOptionMap,
} from '@js-camp/core/mappers/filterOptionMap';

import { http } from '../../../api';

const url = 'anime/';

export namespace AnimeService {

  /**
   * Get list of anime.
   * @param paginationOptions Pagination options.
   * @param sortOptions Sorting options.
   * @param filterOptions Filter options.
   */
  export async function getList(
    paginationOptions: LimitOffsetPaginationOptions,
    sortOptions: SortOptions<AnimeSortField> | null,
    filterOptions: readonly FilterOption<AnimeFilterField>[],
  ): Promise<LimitOffsetPagination<AnimeBase>> {
    const limitOffsetQueryParams = LimitOffsetQueryMapper.toDto<AnimeSortField>(
      paginationOptions,
      sortOptions,
      animeSortFieldMap,
    );
    const filterParams = FilterOptionMap.toDto(
      filterOptions,
    );
    const { data } = await http.get<LimitOffsetPaginationDto<AnimeBaseDto>>(`${url}anime/`, {
      params: {
        ...limitOffsetQueryParams,
        ...filterParams,
      },
    });
    return PaginationMapper.mapPaginationFromDto(
      data,
      AnimeBaseMapper.fromDto,
    );
  }
}

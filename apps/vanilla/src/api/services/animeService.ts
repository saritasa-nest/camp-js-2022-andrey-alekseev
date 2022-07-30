import {
  LimitOffsetPagination,
  LimitOffsetPaginationOptions,
} from '@js-camp/core/models/limitOffsetPagination';
import { AnimeBaseDto } from '@js-camp/core/dtos/animeBase.dto';
import {
  AnimeBase,
  AnimeFilterOptions,
  AnimeSortField,
} from '@js-camp/core/models/anime/animeBase';
import { AnimeBaseMapper } from '@js-camp/core/mappers/animeBase.mapper';
import {
  LimitOffsetPaginationMapper,
} from '@js-camp/core/mappers/limitOffsetPagination.mapper';
import {
  LimitOffsetPaginationDto,
} from '@js-camp/core/dtos/limitOffsetPagination.dto';
import { SortOptions } from '@js-camp/core/models/sortOptions';
import {
  LimitOffsetQueryMapper,
} from '@js-camp/core/mappers/limitOffsetQuery.mapper';
import { animeSortFieldMap } from '@js-camp/core/mappers/animeSortFieldMap';
import { Anime } from '@js-camp/core/models/anime/anime';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';

import { FilterOption } from '@js-camp/core/models/filterOption';
import {
  FilterOptionMapper,
} from '@js-camp/core/mappers/filterOption.mapper';

import { http } from '..';

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
    filterOptions: readonly FilterOption<AnimeFilterOptions>[],
  ): Promise<LimitOffsetPagination<AnimeBase>> {
    const limitOffsetQueryParams = LimitOffsetQueryMapper.toDto<AnimeSortField>(
      paginationOptions,
      sortOptions,
      animeSortFieldMap,
    );
    const filterParams = FilterOptionMapper.toDto(
      filterOptions,
    );
    const { data } = await http.get<LimitOffsetPaginationDto<AnimeBaseDto>>(`${url}anime/`, {
      params: {
        ...limitOffsetQueryParams,
        ...filterParams,
      },
    });
    return LimitOffsetPaginationMapper.mapPaginationFromDto(
      data,
      AnimeBaseMapper.fromDto,
    );
  }

  /**
   * Get anime details.
   * @param id Anime id.
   */
  export async function getDetails(id: number): Promise<Anime> {
    const { data } = await http.get<AnimeDto>(`${url}anime/${id}/`);
    return AnimeMapper.fromDto(data);
  }
}

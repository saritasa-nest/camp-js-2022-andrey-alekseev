import {
  LimitOffsetPagination,
  LimitOffsetPaginationOptions,
} from '@js-camp/core/models/limitOffsetPagination';

import { AnimeBaseDto } from '@js-camp/core/dtos/animeBase.dto';

import { AnimeBase, AnimeSortField } from '@js-camp/core/models/anime/animeBase';

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

import { http } from '..';

const url = 'anime/';

export namespace AnimeService {

  /**
   * Get list of anime.
   * @param paginationOptions Pagination options.
   * @param sortOptions Sorting options.
   */
  export async function getList(
    paginationOptions: LimitOffsetPaginationOptions,
    sortOptions: SortOptions<AnimeSortField> | null,
  ): Promise<LimitOffsetPagination<AnimeBase>> {
    const { data } = await http.get<LimitOffsetPaginationDto<AnimeBaseDto>>(`${url}anime/`, {
      params: LimitOffsetQueryMapper.toDto<AnimeSortField>(
        paginationOptions,
        sortOptions,
        animeSortFieldMap,
      ),
    });
    return PaginationMapper.mapPaginationFromDto(
      data,
      AnimeBaseMapper.fromDto,
    );
  }
}

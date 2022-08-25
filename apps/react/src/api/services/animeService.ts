import { AnimeBaseDto } from '@js-camp/core/dtos/animeBase.dto';
import {
  AnimeBase,
  AnimeFilters,
} from '@js-camp/core/models/anime/animeBase';
import { AnimeBaseMapper } from '@js-camp/core/mappers/animeBase.mapper';
import {
  LimitOffsetPaginationMapper,
} from '@js-camp/core/mappers/limitOffsetPagination.mapper';
import {
  LimitOffsetPaginationDto,
} from '@js-camp/core/dtos/limitOffsetPagination.dto';
import { PaginatedItems } from '@js-camp/core/models/pagination/paginatedItems';
import { PaginationQuery } from '@js-camp/core/models/pagination/paginationQuery';
import { FilterOptionMapper } from '@js-camp/core/mappers/filterOption.mapper';
import { FilterType } from '@js-camp/core/models/filterOption';
import { LimitOffsetQueryMapper } from '@js-camp/core/mappers/limitOffsetQuery.mapper';
import { animeSortFieldMap } from '@js-camp/core/mappers/animeSortFieldMap';
import { AnimeSortField } from '@js-camp/core/models/anime/animeSortField';
import { Anime } from '@js-camp/core/models/anime/anime';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';

import { ApiUrls } from '../../utils/apiUrls';
import { http } from '..';

export namespace AnimeService {

  /**
   * Get list of anime.
   * @param pagination Pagination data.
   * @param sortOptions Sort options.
   * @param filterOptions Filter options.
   */
  export async function getList(
    {
      pagination,
      sortOptions,
      filterOptions,
    }: PaginationQuery<AnimeSortField, AnimeFilters>,
  ): Promise<PaginatedItems<AnimeBase>> {
    let filterParams = {};
    if (filterOptions !== null) {
      filterParams = FilterOptionMapper.toDto([
        {
          field: 'type',
          filterType: FilterType.In,
          value: filterOptions.types,
        },
        {
          field: 'search',
          filterType: FilterType.Exact,
          value: filterOptions.searchString,
        },
      ]);
    }
    const { data } = await http.get<LimitOffsetPaginationDto<AnimeBaseDto>>(
      ApiUrls.animeUrls.base,
      {
        params: {
          ...LimitOffsetQueryMapper.toDto(
            pagination,
            sortOptions,
            animeSortFieldMap,
          ),
          ...filterParams,
        },
      },
    );
    return LimitOffsetPaginationMapper.mapPaginationFromDto(
      data,
      AnimeBaseMapper.fromDto,
      pagination,
    );
  }

  /**
   * Get anime details.
   * @param id Anime id.
   */
  export async function getDetails(id: number): Promise<Anime> {
    const { data } = await http.get<AnimeDto>(ApiUrls.animeUrls.details(id));
    return AnimeMapper.fromDto(data);
  }
}

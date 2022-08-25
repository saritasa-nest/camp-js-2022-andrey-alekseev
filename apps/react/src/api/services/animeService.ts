import { AnimeBaseDto } from '@js-camp/core/dtos/animeBase.dto';
import {
  AnimeBase, AnimeFilters, AnimeSortField,
} from '@js-camp/core/models/anime/animeBase';
import { AnimeBaseMapper } from '@js-camp/core/mappers/animeBase.mapper';
import {
  LimitOffsetPaginationMapper,
} from '@js-camp/core/mappers/limitOffsetPagination.mapper';
import {
  LimitOffsetPaginationDto,
} from '@js-camp/core/dtos/limitOffsetPagination.dto';
import { PaginationQuery } from '@js-camp/core/models/pagination/paginationQuery';

import { http } from '..';
import { ApiUrls } from '../../utils/apiUrls';

export namespace AnimeService {

  /** Get list of anime.*/
  export async function getList({
    pagination,
  }: PaginationQuery<AnimeSortField, AnimeFilters>): Promise<readonly AnimeBase[]> {
    const { data } = await http.get<LimitOffsetPaginationDto<AnimeBaseDto>>(
      ApiUrls.animeUrls.base,
      {
        params: {
          ...LimitOffsetPaginationMapper.mapPaginationToLimitOffsetOptions(pagination),
        },
      },
    );
    return LimitOffsetPaginationMapper.mapPaginationFromDto(
      data,
      AnimeBaseMapper.fromDto,
      pagination,
    ).items;
  }
}

import { Injectable } from '@angular/core';
import { AnimeBase, AnimeFilterOptions, AnimeSortField } from '@js-camp/core/models/anime/animeBase';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import {
  LimitOffsetPagination,
} from '@js-camp/core/models/limitOffsetPagination';
import {
  LimitOffsetPaginationDto,
} from '@js-camp/core/dtos/limitOffsetPagination.dto';
import {
  PaginationMapper,
} from '@js-camp/core/mappers/limitOffsetPagination.mapper';
import { AnimeBaseMapper } from '@js-camp/core/mappers/animeBase.mapper';
import { PaginationData } from '@js-camp/core/pagination';
import { SortOptions } from '@js-camp/core/models/sortOptions';
import { LimitOffsetQueryMapper } from '@js-camp/core/mappers/limitOffsetQuery.mapper';
import { animeSortFieldMap } from '@js-camp/core/mappers/animeSortFieldMap';
import { FilterOption } from '@js-camp/core/models/filterOption';
import { FilterOptionMap } from '@js-camp/core/mappers/filterOptionMap';

import { AppUrlConfigService } from './app-url-config.service';
import { paginationDataToLimitOffsetOptions } from '../utils/pagination';

/** Anime service. */
@Injectable({
  providedIn: 'root',
})
export class AnimeService {

  public constructor(
    private readonly http: HttpClient,
    private readonly appUrls: AppUrlConfigService,
  ) {}

  /**
   * Get list of anime.
   * @param paginationData Pagination data.
   * @param sortOptions Sort options.
   * @param filterOptions Filter options.
   */
  public getAnimeList(
    paginationData: PaginationData,
    sortOptions: SortOptions<AnimeSortField> | null,
    filterOptions: readonly FilterOption<AnimeFilterOptions>[] | null,
  ): Observable<LimitOffsetPagination<AnimeBase>> {
    let filterParams = {};
    if (filterOptions !== null) {
      filterParams = FilterOptionMap.toDto(filterOptions);
    }
    return this.http.get<LimitOffsetPaginationDto<AnimeDto>>(
      this.appUrls.animeUrls.list,
      {
        params: {
          ...LimitOffsetQueryMapper.toDto(
            paginationDataToLimitOffsetOptions(paginationData),
            sortOptions,
            animeSortFieldMap,
          ),
          ...filterParams,
        },
      },
    ).pipe(
      map(
        paginatedAnimeDto => PaginationMapper.mapPaginationFromDto(
          paginatedAnimeDto,
          AnimeBaseMapper.fromDto,
          paginationData,
        ),
      ),
    );
  }
}

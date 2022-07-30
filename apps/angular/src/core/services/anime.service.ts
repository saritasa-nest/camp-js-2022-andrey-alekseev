import { Injectable } from '@angular/core';
import { AnimeBase, AnimeFilters, AnimeSortField } from '@js-camp/core/models/anime/animeBase';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LimitOffsetPaginationDto } from '@js-camp/core/dtos/limitOffsetPagination.dto';
import { LimitOffsetPaginationMapper } from '@js-camp/core/mappers/limitOffsetPagination.mapper';
import { AnimeBaseMapper } from '@js-camp/core/mappers/animeBase.mapper';
import { LimitOffsetQueryMapper } from '@js-camp/core/mappers/limitOffsetQuery.mapper';
import { animeSortFieldMap } from '@js-camp/core/mappers/animeSortFieldMap';
import { FilterType } from '@js-camp/core/models/filterOption';
import { FilterOptionMapper } from '@js-camp/core/mappers/filterOption.mapper';
import { PaginatedItems } from '@js-camp/core/models/pagination/paginatedItems';
import { PaginationQuery } from '@js-camp/core/models/pagination/paginationQuery';
import { AnimeBaseDto } from '@js-camp/core/dtos/animeBase.dto';

import { AppUrlConfigService } from './app-url-config.service';

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
   * @param pagination Pagination data.
   * @param sortOptions Sort options.
   * @param filterOptions Filter options.
   */
  public getAnimeList({
    pagination,
    sortOptions,
    filterOptions,
  }: PaginationQuery<AnimeSortField, AnimeFilters>): Observable<PaginatedItems<AnimeBase>> {
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
    return this.http.get<LimitOffsetPaginationDto<AnimeBaseDto>>(
      this.appUrls.animeUrls.list,
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
    ).pipe(
      map(
        paginatedAnimeDto => LimitOffsetPaginationMapper.mapPaginationFromDto(
          paginatedAnimeDto,
          AnimeBaseMapper.fromDto,
          pagination,
        ),
      ),
    );
  }
}

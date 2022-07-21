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

import { paginationDataToLimitOffsetOptions } from '../utils/pagination';

import { AppConfigService } from './app-config.service';

const BASE_URL_PREFIX = 'anime/';

/** Anime service. */
@Injectable({
  providedIn: 'root',
})
export class AnimeService {

  private readonly animeListUrl: URL;

  public constructor(
    private http: HttpClient,
    private appConfig: AppConfigService,
  ) {
    const rootAnimeUrl = appConfig.apiUrl + BASE_URL_PREFIX;
    this.animeListUrl = new URL(`anime/`, rootAnimeUrl);
  }

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
      'https://api.camp-js.saritasa.rocks/api/v1/anime/anime/',
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

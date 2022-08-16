import { Injectable } from '@angular/core';
import { AnimeBase, AnimeFilters, AnimeSortField } from '@js-camp/core/models/anime/animeBase';
import { map, Observable, shareReplay } from 'rxjs';
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
import { Anime } from '@js-camp/core/models/anime/anime';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { AnimeCreateFormData, AnimeEditFormData } from '@js-camp/core/models/anime/animeFormData';

import { Studio, StudioFilters } from '@js-camp/core/models/studio';
import { StudioDto } from '@js-camp/core/dtos/studio.dto';

import { StudioMapper } from '@js-camp/core/mappers/studio.mapper';

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

  /**
   * Get anime by id.
   * @param id Anime id.
   */
  public getAnime(id: number): Observable<Anime> {
    return this.http.get<AnimeDto>(
      this.appUrls.animeUrls.details(id),
    ).pipe(
      map(animeDto => AnimeMapper.fromDto(animeDto)),
      shareReplay({ bufferSize: 1, refCount: true }),
    );
  }

  /**
   * Create anime.
   * @param animeCreateFormData Anime create form data.
   */
  public createAnime(animeCreateFormData: AnimeCreateFormData): Observable<Anime> {
    return this.http.post<AnimeDto>(
      this.appUrls.animeUrls.list,
      AnimeMapper.toCreateFormDto(animeCreateFormData),
    ).pipe(
      map(animeDto => AnimeMapper.fromDto(animeDto)),
    );
  }

  /**
   * Edit anime.
   * @param animeEditFormData Updated anime.
   */
  public editAnime(animeEditFormData: AnimeEditFormData): Observable<Anime> {
    return this.http.put<AnimeDto>(
      this.appUrls.animeUrls.details(animeEditFormData.id),
      AnimeMapper.toEditFormDto(animeEditFormData),
    ).pipe(
      map(animeDto => AnimeMapper.fromDto(animeDto)),
    );
  }

  /**
   * Delete anime by id.
   * @param id Anime id.
   */
  public deleteAnime(id: number): Observable<void> {
    return this.http.delete<void>(
      this.appUrls.animeUrls.details(id),
    );
  }

  /** Get studios. */
  public getStudios({
    pagination,
    sortOptions,
    filterOptions,
  }: PaginationQuery<null, StudioFilters>): Observable<PaginatedItems<Studio>> {
    let filterParams = {};
    if (filterOptions !== null) {
      filterParams = FilterOptionMapper.toDto([
        {
          field: 'search',
          filterType: FilterType.Exact,
          value: filterOptions.searchString,
        },
      ]);
    }
    return this.http.get<LimitOffsetPaginationDto<StudioDto>>(
      this.appUrls.animeUrls.studios,
      {
        params: {
          ...LimitOffsetQueryMapper.toDto(
            pagination,
            null,
            null,
          ),
          ...filterParams,
        },
      },
    ).pipe(
      map(studioPaginationDto => LimitOffsetPaginationMapper.mapPaginationFromDto(
        studioPaginationDto,
        StudioMapper.fromDto,
        pagination,
      )),
    );
  }
}

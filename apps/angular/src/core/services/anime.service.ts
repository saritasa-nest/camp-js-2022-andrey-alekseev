import { Injectable } from '@angular/core';
import { AnimeBase } from '@js-camp/core/models/anime/animeBase';
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

import { AppConfigService } from './app-config.service';

const BASE_URL_PREFIX = 'anime/';

/** Anime service. */
@Injectable({
  providedIn: 'root',
})
export class AnimeService {

  private readonly animeListUrl: URL;

  public constructor(
    private readonly http: HttpClient,
    appConfig: AppConfigService,
  ) {
    const rootAnimeUrl = appConfig.apiUrl + BASE_URL_PREFIX;
    this.animeListUrl = new URL(`anime/`, rootAnimeUrl);
  }

  /** Get list of anime. */
  public getAnimeList(): Observable<LimitOffsetPagination<AnimeBase>> {
    return this.http.get<LimitOffsetPaginationDto<AnimeDto>>(this.animeListUrl.toString()).pipe(
      map(
        paginatedAnimeDto => PaginationMapper.mapPaginationFromDto(
          paginatedAnimeDto,
          AnimeBaseMapper.fromDto,
        ),
      ),
    );
  }
}

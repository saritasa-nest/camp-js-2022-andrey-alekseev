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

  /** Get list of anime. */
  public getAnimeList(): Observable<LimitOffsetPagination<AnimeBase>> {
    return this.http.get<LimitOffsetPaginationDto<AnimeDto>>(
      this.appUrls.animeUrls.list,
    ).pipe(
      map(
        paginatedAnimeDto => PaginationMapper.mapPaginationFromDto(
          paginatedAnimeDto,
          AnimeBaseMapper.fromDto,
        ),
      ),
    );
  }
}

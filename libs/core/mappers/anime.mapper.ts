import { AnimeCreateFormData, AnimeEditFormData } from '../models/anime/animeFormData';
import { AnimeRating } from '../models/anime/animeRating';
import { AnimeSeason } from '../models/anime/animeSeason';
import { AnimeSource } from '../models/anime/animeSource';
import { AnimeDto, AnimeCreateFormDto, AnimeEditFormDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime/anime';

import { AnimeBaseMapper } from './animeBase.mapper';
import { GenreMapper } from './genre.mapper';
import { StudioMapper } from './studio.mapper';

export namespace AnimeMapper {

  /**
   * Map dto to model.
   * @param dto Anime dto.
   */
  export function fromDto(dto: AnimeDto): Anime {
    return new Anime({
      ...AnimeBaseMapper.fromDto(dto),
      rating: AnimeRating.toAnimeRating(dto.rating),
      season: AnimeSeason.toAnimeSeason(dto.season),
      source: AnimeSource.toAnimeSource(dto.source),
      isAiring: dto.airing,
      airedEnd: dto.aired.end !== null ? new Date(dto.aired.end) : null,
      synopsis: dto.synopsis,
      youTubeTrailerId: dto.trailer_youtube_id,
      genres: dto.genres_data.map(GenreMapper.fromDto),
      studios: dto.studios_data.map(StudioMapper.fromDto),
    });
  }

  /**
   * Map create form data to dto.
   * @param anime Anime.
   */
  export function toCreateFormDto(anime: AnimeCreateFormData): AnimeCreateFormDto {
    return {
      title_eng: anime.titleEng,
      title_jpn: anime.titleJapan,
      image: anime.image,
      airing: anime.isAiring,
      aired: {
        start: anime.airedStart !== null ? anime.airedStart.toISOString() : null,
        end: anime.airedEnd !== null ? anime.airedEnd.toISOString() : null,
      },
      synopsis: anime.synopsis,
      type: anime.type,
      status: anime.status,
      season: anime.season,
      rating: anime.rating,
      source: anime.source,
      trailer_youtube_id: anime.youTubeTrailerId,
      studios: anime.studios.map(studio => studio.id),
      genres: anime.genres.map(genre => genre.id),
    };
  }

  /**
   * Map edit form data to dto.
   * @param animeEditFormData Anime edit form data.
   */
  export function toEditFormDto(animeEditFormData: AnimeEditFormData): AnimeEditFormDto {
    return {
      id: animeEditFormData.id,
      ...toCreateFormDto(animeEditFormData),
    };
  }
}

import { AnimeDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime/anime';
import { AnimeStatus } from '../models/anime/animeStatus';
import { AnimeType } from '../models/anime/animeType';

import { GenreMapper } from './genre.mapper';
import { StudioMapper } from './studio.mapper';

export namespace AnimeMapper {

  /**
   * Maps dto to model.
   * @param dto Anime dto.
   */
  export function fromDto(dto: AnimeDto): Anime {
    return new Anime({
      id: dto.id,
      titleEng: dto.title_eng,
      titleJapan: dto.title_jpn,
      image: dto.image,
      isAiring: dto.airing,
      airedStart: dto.aired.start !== null ? new Date(dto.aired.start) : null,
      airedEnd: dto.aired.end !== null ? new Date(dto.aired.end) : null,
      type: AnimeType.toAnimeType(dto.type),
      status: AnimeStatus.toAnimeStatus(dto.status),
      synopsis: dto.synopsis,
      youTubeTrailerId: dto.trailer_youtube_id,
      genres: dto.genres_data.map(GenreMapper.fromDto),
      studios: dto.studios_data.map(StudioMapper.fromDto),
    });
  }
}

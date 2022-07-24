import { AnimeDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime/anime';

import { AnimeBaseMapper } from './animeBase.mapper';
import { GenreMapper } from './genre.mapper';
import { StudioMapper } from './studio.mapper';

export namespace AnimeMapper {

  /**
   * Maps dto to model.
   * @param dto Anime dto.
   */
  export function fromDto(dto: AnimeDto): Anime {
    return new Anime({
      ...AnimeBaseMapper.fromDto(dto),
      isAiring: dto.airing,
      airedEnd: dto.aired.end !== null ? new Date(dto.aired.end) : null,
      synopsis: dto.synopsis,
      youTubeTrailerId: dto.trailer_youtube_id,
      genres: dto.genres_data.map(GenreMapper.fromDto),
      studios: dto.studios_data.map(StudioMapper.fromDto),
    });
  }
}

import { AnimeStatus } from '../models/anime/animeStatus';

import { AnimeType } from '../models/anime/animeType';

import { AnimeBaseDto } from '../dtos/animeBase.dto';
import { AnimeBase } from '../models/anime/animeBase';

export namespace AnimeBaseMapper {

  /**
   * Maps dto to model.
   * @param dto Anime base dto.
   */
  export function fromDto(dto: AnimeBaseDto): AnimeBase {
    return new AnimeBase({
      id: dto.id,
      titleEng: dto.title_eng,
      titleJapan: dto.title_jpn,
      image: dto.image,
      airedStart: dto.aired.start !== null ? new Date(dto.aired.start) : null,
      type: AnimeType.toAnimeType(dto.type),
      status: AnimeStatus.toAnimeStatus(dto.status),
    });
  }
}

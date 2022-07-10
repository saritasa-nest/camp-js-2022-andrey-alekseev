import { AnimeBaseDto } from './animeBase.dto';
import { StudioDto } from './studio.dto';
import { GenreDto } from './genre.dto';

/** Anime dto. */
export interface AnimeDto extends AnimeBaseDto {

  /** Synopsis. */
  readonly synopsis: string;

  /** Is airing. */
  readonly airing: boolean;

  /** YouTube trailer id. */
  readonly trailer_youtube_id: string;

  /** Studios data. */
  readonly studios_data: readonly StudioDto[];

  /** Genres data. */
  readonly genres_data: readonly GenreDto[];
}

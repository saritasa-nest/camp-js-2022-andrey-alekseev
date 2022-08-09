import { AnimeBaseDto } from './animeBase.dto';
import { StudioDto } from './studio.dto';
import { GenreDto } from './genre.dto';

/** Anime dto. */
export interface AnimeDto extends AnimeBaseDto {

  /** Synopsis. */
  readonly synopsis: string;

  /** Is airing. */
  readonly airing: boolean;

  /** Rating. */
  readonly rating: string;

  /** Season. */
  readonly season: string;

  /** Source. */
  readonly source: string;

  /** YouTube trailer id. */
  readonly trailer_youtube_id: string | null;

  /** Studios data. */
  readonly studios_data: readonly StudioDto[];

  /** Genres data. */
  readonly genres_data: readonly GenreDto[];
}

export interface AnimeEditFormDto extends Omit<AnimeDto, 'created' | 'modified' | 'studios_data' | 'genres_data'> {

  /** Studios ids list. */
  readonly studios: readonly number[];

  /** Genres ids list. */
  readonly genres: readonly number[];
}

export type AnimeCreateFormDto = Omit<AnimeEditFormDto, 'id'>;

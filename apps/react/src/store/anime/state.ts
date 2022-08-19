import { AnimeBase } from '@js-camp/core/models/anime/animeBase';

/** Anime state. */
export interface AnimeState {

  /** Is anime loading. */
  readonly isLoading: boolean;

  /** Anime list. */
  readonly animeList?: readonly AnimeBase[];
}

export const initialState: AnimeState = {
  isLoading: false,
};

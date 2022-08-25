import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { Anime } from '@js-camp/core/models/anime/anime';

export const animeAdapter = createEntityAdapter<Anime>({
  selectId: anime => anime.id,
});

/** Anime state. */
export interface AnimeState extends EntityState<Anime> {

  /** Is anime loading. */
  readonly isLoading: boolean;

}

export const initialState: AnimeState = animeAdapter.getInitialState({
  isLoading: false,
});

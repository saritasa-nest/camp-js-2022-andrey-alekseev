import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { AnimeExtra } from '@js-camp/core/models/anime/anime';

export const animeAdapter = createEntityAdapter<AnimeExtra>({
  selectId: anime => anime.id,
});

/** Anime extra state. */
export interface AnimeExtraState extends EntityState<AnimeExtra> {

  /** Is anime loading. */
  readonly isLoading: boolean;

}

export const initialState: AnimeExtraState = animeAdapter.getInitialState({
  isLoading: false,
});

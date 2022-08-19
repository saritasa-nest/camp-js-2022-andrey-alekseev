import { AnimeBase } from '@js-camp/core/models/anime/animeBase';
import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';

export const animeBaseAdapter = createEntityAdapter<AnimeBase>({
  selectId: anime => anime.id,
});

/** Anime state. */
export interface AnimeState extends EntityState<AnimeBase> {

  /** Is anime loading. */
  readonly isLoading: boolean;
}

export const initialState: AnimeState = animeBaseAdapter.getInitialState({
  isLoading: false,
});

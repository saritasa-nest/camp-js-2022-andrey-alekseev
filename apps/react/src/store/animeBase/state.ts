import { AnimeBase } from '@js-camp/core/models/anime/animeBase';
import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';

export const animeBaseAdapter = createEntityAdapter<AnimeBase>({
  selectId: anime => anime.id,
});

/** Anime base state. */
export interface AnimeBaseState extends EntityState<AnimeBase> {

  /** Is anime loading. */
  readonly isLoading: boolean;

  /** Total count. */
  readonly totalCount: number;
}

export const initialState: AnimeBaseState = animeBaseAdapter.getInitialState({
  isLoading: false,
  totalCount: 0,
});

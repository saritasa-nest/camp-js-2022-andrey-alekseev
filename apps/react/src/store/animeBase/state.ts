import { AnimeBase } from '@js-camp/core/models/anime/animeBase';
import { createEntityAdapter, EntityId, EntityState } from '@reduxjs/toolkit';

export const animeBaseAdapter = createEntityAdapter<AnimeBase>({
  selectId: anime => anime.id,
});

/** Anime base state. */
export interface AnimeBaseState extends EntityState<AnimeBase> {

  /** Ids of items that should be presented in list. */
  readonly listIds: EntityId[];

  /** Is anime loading. */
  readonly isLoading: boolean;

  /** Total count. */
  readonly totalCount: number;
}

export const initialState: AnimeBaseState = animeBaseAdapter.getInitialState({
  listIds: [],
  isLoading: false,
  totalCount: 0,
});

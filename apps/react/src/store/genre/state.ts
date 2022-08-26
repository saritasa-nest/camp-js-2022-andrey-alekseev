import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { Genre } from '@js-camp/core/models/genre/genre';

export const genreAdapter = createEntityAdapter<Genre>({
  selectId: genre => genre.id,
});

/** Anime Genre state. */
export interface GenreState extends EntityState<Genre> {

  /** Is genres loading. */
  readonly isLoading: boolean;
}

export const initialState: GenreState = genreAdapter.getInitialState({
  listIds: [],
  isLoading: false,
});

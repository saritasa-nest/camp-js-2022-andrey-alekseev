import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@js-camp/react/store';

/** Select anime list from store. */
export const selectAnimeList = createSelector(
  (state: RootState) => state.anime.animeList,
  animeList => animeList,
);

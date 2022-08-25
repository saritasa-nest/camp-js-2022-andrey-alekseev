import { RootState } from '@js-camp/react/store';
import { animeAdapter } from '@js-camp/react/store/anime/state';
import { createSelector } from '@reduxjs/toolkit';

export const {
  selectAll: selectAllAnime,
  selectById: selectAnimeById,
  selectIds: selectAnimeIds,
} = animeAdapter.getSelectors<RootState>(state => state.anime);

export const selectIsAnimeLoading = createSelector(
  (state: RootState) => state.anime.isLoading,
  isLoading => isLoading,
);

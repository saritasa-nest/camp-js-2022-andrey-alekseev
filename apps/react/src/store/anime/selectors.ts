import { RootState } from '@js-camp/react/store';
import { animeBaseAdapter } from '@js-camp/react/store/anime/state';
import { createSelector } from '@reduxjs/toolkit';

export const {
  selectAll: selectAllAnimeBase,
  selectById: selectAnimeBaseById,
  selectIds: selectAnimeBaseIds,
} = animeBaseAdapter.getSelectors<RootState>(state => state.anime);

export const selectIsAnimeBaseLoading = createSelector(
  (state: RootState) => state.anime.isLoading,
  isLoading => isLoading,
);

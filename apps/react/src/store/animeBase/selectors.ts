import { RootState } from '@js-camp/react/store';
import { animeBaseAdapter } from '@js-camp/react/store/animeBase/state';
import { createSelector, EntityId } from '@reduxjs/toolkit';
import { AnimeBase } from '@js-camp/core/models/anime/animeBase';

export const {
  selectAll: selectAllAnimeBase,
  selectById: selectAnimeBaseById,
  selectIds: selectAnimeBaseIds,
} = animeBaseAdapter.getSelectors<RootState>(state => state.animeBase);

export const selectIsAnimeBaseLoading = createSelector(
  (state: RootState) => state.animeBase.isLoading,
  isLoading => isLoading,
);

export const selectAnimeBaseTotalCount = createSelector(
  (state: RootState) => state.animeBase.totalCount,
  totalCount => totalCount,
);

export const selectAnimeList = createSelector(
  selectAllAnimeBase,
  (state: RootState) => state.animeBase.listIds,
  (allAnimeBase: AnimeBase[], listIds: EntityId[]) => allAnimeBase.filter(animeBase => listIds.includes(animeBase.id)),
);

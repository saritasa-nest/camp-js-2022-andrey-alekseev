import { RootState } from '@js-camp/react/store';
import { animeBaseAdapter } from '@js-camp/react/store/anime/state';

export const {
  selectAll: selectAllAnimeBase,
  selectById: selectAnimeBaseById,
  selectIds: selectAnimeBaseIds,
} = animeBaseAdapter.getSelectors<RootState>(state => state.anime);

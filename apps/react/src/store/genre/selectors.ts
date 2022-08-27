import { RootState } from '../store';

import { genreAdapter } from './state';

export const {
  selectAll: selectAllGenres,
} = genreAdapter.getSelectors<RootState>(state => state.genres);

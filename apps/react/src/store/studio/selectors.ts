import { RootState } from '../store';

import { studioAdapter } from './state';

export const {
  selectAll: selectAllStudios,
} = studioAdapter.getSelectors<RootState>(state => state.studio);

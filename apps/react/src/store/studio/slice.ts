import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Anime } from '@js-camp/core/models/anime/anime';

import { studioAdapter, StudioState, initialState } from './state';

export const studioSlice = createSlice({
  name: 'studios',
  initialState,
  reducers: {
    animeWithStudiosFetched(state, action: PayloadAction<Anime>) {
      studioAdapter.upsertMany(state as StudioState, action.payload.studios);
    },
  },
});

export const { animeWithStudiosFetched } = studioSlice.actions;

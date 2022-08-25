import { createSlice } from '@reduxjs/toolkit';

import { getAnimeById } from './dispatchers';
import { animeAdapter, AnimeState, initialState } from './state';

export const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(getAnimeById.pending, state => {
      state.isLoading = true;
    })
    .addCase(getAnimeById.fulfilled, (state, action) => {
      animeAdapter.addOne(state as AnimeState, action.payload);
      state.isLoading = false;
    })
    .addCase(getAnimeById.rejected, state => {
      state.isLoading = false;
    }),
});

import { createSlice } from '@reduxjs/toolkit';
import { getAnimeList } from '@js-camp/react/store/anime/dispatchers';

import { initialState } from './state';

export const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(getAnimeList.pending, state => {
      state.isLoading = true;
    })
    .addCase(getAnimeList.fulfilled, (state, action) => {
      state.animeList = [...action.payload];
      state.isLoading = false;
    })
    .addCase(getAnimeList.rejected, state => {
      state.isLoading = false;
    }),
});

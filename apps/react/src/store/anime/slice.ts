import { createSlice } from '@reduxjs/toolkit';

import { AnimeExtra } from '@js-camp/core/models/anime/anime';

import { getAnimeById } from './dispatchers';
import { animeAdapter, AnimeExtraState, initialState } from './state';

export const animeSlice = createSlice({
  name: 'animeExtra',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(getAnimeById.pending, state => {
      state.isLoading = true;
    })
    .addCase(getAnimeById.fulfilled, (state, action) => {
      const anime = action.payload;
      const genresIds = anime.genres.map(genre => genre.id);
      const studiosIds = anime.studios.map(studio => studio.id);
      animeAdapter.addOne(state as AnimeExtraState, new AnimeExtra({
        ...action.payload,
        genresIds,
        studiosIds,
      }));
      state.isLoading = false;
    })
    .addCase(getAnimeById.rejected, state => {
      state.isLoading = false;
    }),
});

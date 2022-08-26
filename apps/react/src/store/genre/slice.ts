import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Anime } from '@js-camp/core/models/anime/anime';

import { fetchGenres } from './dispatchers';
import { genreAdapter, GenreState, initialState } from './state';

export const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    animeWithGenresFetched(state, action: PayloadAction<Anime>) {
      genreAdapter.upsertMany(state as GenreState, action.payload.genres);
    },
  },
  extraReducers: builder => builder
    .addCase(fetchGenres.pending, state => {
      state.isLoading = true;
    })
    .addCase(fetchGenres.fulfilled, (state, action) => {
      genreAdapter.addMany(state as GenreState, action.payload);
      state.isLoading = false;
    })
    .addCase(fetchGenres.rejected, state => {
      state.isLoading = false;
    }),
});

export const { animeWithGenresFetched } = genresSlice.actions;

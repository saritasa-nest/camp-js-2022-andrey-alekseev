import { createSlice } from '@reduxjs/toolkit';
import { getAnimeList } from '@js-camp/react/store/anime/dispatchers';

import { animeBaseAdapter, AnimeState, initialState } from './state';

export const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    clearAnimeList(state) {
      animeBaseAdapter.removeAll(state as AnimeState);
    },
    setLoading(state) {
      state.isLoading = true;
    },
  },
  extraReducers: builder => builder
    .addCase(getAnimeList.pending, state => {
      state.isLoading = true;
    })
    .addCase(getAnimeList.fulfilled, (state, action) => {
      animeBaseAdapter.addMany(state as AnimeState, action.payload.items);
      state.totalCount = action.payload.pagination.totalCount;
      state.isLoading = false;
    })
    .addCase(getAnimeList.rejected, state => {
      state.isLoading = false;
    }),
});

export const { clearAnimeList, setLoading } = animeSlice.actions;

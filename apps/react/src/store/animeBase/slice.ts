import { createSlice } from '@reduxjs/toolkit';
import { getAnimeList } from '@js-camp/react/store/animeBase/dispatchers';

import { animeBaseAdapter, AnimeBaseState, initialState } from './state';

export const animeBaseSlice = createSlice({
  name: 'animeBase',
  initialState,
  reducers: {
    clearAnimeList(state) {
      animeBaseAdapter.removeAll(state as AnimeBaseState);
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
      animeBaseAdapter.addMany(state as AnimeBaseState, action.payload.items);
      state.totalCount = action.payload.pagination.totalCount;
      state.isLoading = false;
    })
    .addCase(getAnimeList.rejected, state => {
      state.isLoading = false;
    }),
});

export const { clearAnimeList, setLoading } = animeBaseSlice.actions;

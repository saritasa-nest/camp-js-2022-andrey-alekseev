import { createSlice, EntityId, PayloadAction } from '@reduxjs/toolkit';
import { getAnimeList } from '@js-camp/react/store/animeBase/dispatchers';

import { Anime } from '@js-camp/core/models/anime/anime';

import { AnimeBase } from '@js-camp/core/models/anime/animeBase';

import { animeBaseAdapter, AnimeBaseState, initialState } from './state';

export const animeBaseSlice = createSlice({
  name: 'animeBase',
  initialState,
  reducers: {
    /**
     * Clear all anime from list except provided.
     * @param state State.
     * @param action Payload action.
     */
    clearAnimeList(state, action: PayloadAction<EntityId[]>) {
      const animeExtraIds = action.payload;
      animeBaseAdapter.removeMany(state as AnimeBaseState, state.listIds.filter(id => !animeExtraIds.includes(id)));
      state.listIds = [];
      state.isLoading = true;
    },
    fullAnimeReceived(state, action: PayloadAction<Anime>) {
      animeBaseAdapter.upsertOne(state as AnimeBaseState, new AnimeBase(action.payload));
    },
  },
  extraReducers: builder => builder
    .addCase(getAnimeList.pending, state => {
      state.isLoading = true;
    })
    .addCase(getAnimeList.fulfilled, (state, action) => {
      animeBaseAdapter.upsertMany(state as AnimeBaseState, action.payload.items);
      state.listIds.push(...action.payload.items.map(animeBase => animeBase.id));
      state.totalCount = action.payload.pagination.totalCount;
      state.isLoading = false;
    })
    .addCase(getAnimeList.rejected, state => {
      state.isLoading = false;
    }),
});

export const { clearAnimeList, fullAnimeReceived } = animeBaseSlice.actions;

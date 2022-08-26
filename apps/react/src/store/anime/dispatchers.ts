import { createAsyncThunk } from '@reduxjs/toolkit';

import { animeWithStudiosFetched } from '../studio/slice';
import { animeWithGenresFetched } from '../genre/slice';
import { fullAnimeReceived } from '../animeBase/slice';

import { AnimeService } from '../../api/services/animeService';

export const getAnimeById = createAsyncThunk(
  'animeExtra/getAnimeById',
  async(id: number, { dispatch }) => {
    const anime = await AnimeService.getDetails(id);
    dispatch(fullAnimeReceived(anime));
    dispatch(animeWithGenresFetched(anime));
    dispatch(animeWithStudiosFetched(anime));
    return anime;
  },
);

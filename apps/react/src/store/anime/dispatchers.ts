import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/animeService';

export const getAnimeById = createAsyncThunk(
  'anime/getAnimeById',
  (id: number) => AnimeService.getDetails(id),
);

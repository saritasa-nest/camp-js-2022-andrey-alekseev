import { createAsyncThunk } from '@reduxjs/toolkit';
import { PaginationQuery } from '@js-camp/core/models/pagination/paginationQuery';
import { AnimeFilters } from '@js-camp/core/models/anime/animeBase';
import { AnimeSortField } from '@js-camp/core/models/anime/animeSortField';

import { AnimeService } from '../../api/services/animeService';

export const getAnimeList = createAsyncThunk(
  'animeBase/animeList',
  (paginationQuery: PaginationQuery<AnimeSortField, AnimeFilters>) => AnimeService.getList(paginationQuery),
);

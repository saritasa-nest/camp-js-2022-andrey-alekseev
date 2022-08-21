import { createAsyncThunk } from '@reduxjs/toolkit';

import { PaginationQuery } from '@js-camp/core/models/pagination/paginationQuery';
import { AnimeFilters } from '@js-camp/core/models/anime/animeBase';

import { AnimeSortField } from '@js-camp/core/models/anime/animeSortField';

import { AnimeService } from '../../api/services/animeService';

export const getAnimeList = createAsyncThunk(
  'anime/animeList',
  (paginationQuery: PaginationQuery<AnimeSortField, AnimeFilters>) => AnimeService.getList(paginationQuery),
);

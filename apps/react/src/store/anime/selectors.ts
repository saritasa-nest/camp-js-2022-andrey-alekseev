import { RootState } from '@js-camp/react/store';
import { animeAdapter } from '@js-camp/react/store/anime/state';
import { createSelector } from '@reduxjs/toolkit';
import { selectAnimeBaseById } from '@js-camp/react/store/animeBase/selectors';
import { Anime, AnimeExtra } from '@js-camp/core/models/anime/anime';
import { AnimeBase } from '@js-camp/core/models/anime/animeBase';
import { selectAllGenres } from '@js-camp/react/store/genre/selectors';
import { Genre } from '@js-camp/core/models/genre/genre';
import { selectAllStudios } from '@js-camp/react/store/studio/selectors';
import { Studio } from '@js-camp/core/models/studio';

export const {
  selectById: selectAnimeExtraById,
  selectIds: selectAnimeExtraIds,
} = animeAdapter.getSelectors<RootState>(state => state.anime);

export const selectIsAnimeLoading = createSelector(
  (state: RootState) => state.anime.isLoading,
  isLoading => isLoading,
);

export const selectAnimeById = createSelector(
  [
    selectAnimeBaseById,
    selectAnimeExtraById,
    selectAllGenres,
    selectAllStudios,
  ],
  (
    animeBase: AnimeBase | undefined,
    animeExtra: AnimeExtra | undefined,
    genres: Genre[],
    studios: Studio[],
  ): Anime | undefined => {
    if (animeBase === undefined || animeExtra === undefined) {
      return undefined;
    }
    return {
      ...animeBase,
      ...animeExtra,
      genres: genres.filter(genre => animeExtra.genresIds.includes(genre.id)),
      studios: studios.filter(studio => animeExtra.studiosIds.includes(studio.id)),
    };
  },
);

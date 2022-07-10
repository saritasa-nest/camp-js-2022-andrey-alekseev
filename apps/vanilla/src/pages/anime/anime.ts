import { AnimeStatus } from '@js-camp/core/models/anime/animeStatus';
import { AnimeType } from '@js-camp/core/models/anime/animeType';
import { Anime } from '@js-camp/core/models/anime/anime';

import { AnimeService } from '../../api/services/animeService';
import { redirect } from '../../../utils/navigation';
import {
  ANIME_ID_QUERY_PARAMETER,
  AppUrl,
  EMPTY_SYMBOL,
  HIDDEN_CLASS,
} from '../../../utils/constants';
import { ApiError } from '../../api/errors';
import { openModal } from '../../../utils/modal';
import { getElementOrRaiseError } from '../../../utils/query';

const YOUTUBE_EMBED_LINK = 'https://www.youtube.com/embed/';

document.addEventListener('DOMContentLoaded', async() => {
  const animeId = getAnimeId();
  if (animeId === undefined) {
    redirect(AppUrl.Base);
    return;
  }

  const anime = await getAnime(animeId);
  if (anime === null) {
    return;
  }

  renderAnime(anime);
  const animeImage = getElementOrRaiseError<HTMLImageElement>('.anime__image');
  const animeImageModal = getElementOrRaiseError('.modal-window');
  animeImage.addEventListener('click', () => {
    openModal(animeImageModal);
  });
});

/**
 * Get anime id from query parameters.
 * Return undefined if there are no parameter or if id less than zero.
 */
function getAnimeId(): number | undefined {
  const queryParams = new URLSearchParams(window.location.search);
  const animeIdString = queryParams.get(ANIME_ID_QUERY_PARAMETER);
  if (animeIdString === null) {
    return;
  }
  const animeId = parseInt(animeIdString, 10);
  if (Number.isNaN(animeId) || animeId < 0) {
    return;
  }
  return animeId;
}

/**
 * Get anime by id.
 * @param animeId Anime id.
 */
async function getAnime(animeId: number): Promise<Anime | null> {
  try {
    return await AnimeService.getDetails(animeId);
  } catch (error: unknown) {
    const animeContainer = getElementOrRaiseError('.anime');
    animeContainer.innerHTML = '';
    const errorText = document.createElement('p');
    errorText.classList.add('anime__error-text');
    if (error instanceof ApiError && error.status === 404) {
      errorText.textContent = 'Sorry, anime not found. Maybe broken url';
    } else {
      errorText.textContent = 'Something went wrong.';
    }
    animeContainer.append(errorText);
    return null;
  }
}

/**
 * Render anime details.
 * @param anime Anime object.
 */
function renderAnime(anime: Anime): void {
  const animeTitleP = getElementOrRaiseError('.anime__title');
  const animeImage = getElementOrRaiseError<HTMLImageElement>('.anime__image');
  const animeModalImage = getElementOrRaiseError<HTMLImageElement>('.modal-window__image');
  const animeStatusTextP = getElementOrRaiseError('.anime__status-text');
  const animeAiredP = getElementOrRaiseError('.anime__aired');
  const animeGenresList = getElementOrRaiseError('.anime__genres-list');
  const animeStudiosList = getElementOrRaiseError('.anime__studios-list');
  const animeIsAiringP = getElementOrRaiseError('.anime__is-aring');
  const animeTypeP = getElementOrRaiseError('.anime__type');
  const animeSynopsisP = getElementOrRaiseError('.anime__synopsis');
  const animeYouTubeFrameWrapper = getElementOrRaiseError('.anime__trailer-wrapper');
  const animeYouTubeFrame = getElementOrRaiseError<HTMLIFrameElement>('.anime__trailer');

  animeTitleP.textContent = `${anime.titleEng || EMPTY_SYMBOL} / ${anime.titleJapan || EMPTY_SYMBOL}`;
  animeImage.src = anime.image;
  animeModalImage.src = anime.image;
  animeStatusTextP.textContent = AnimeStatus.toReadable(anime.status);
  animeIsAiringP.textContent = anime.isAiring ? 'Airing' : 'Not Airing';
  animeTypeP.textContent = `Type: ${AnimeType.toReadable(anime.type)}`;
  animeSynopsisP.textContent = anime.synopsis;

  if (anime.youTubeTrailerId !== null) {
    animeYouTubeFrameWrapper.classList.remove(HIDDEN_CLASS);
    animeYouTubeFrame.src = `${YOUTUBE_EMBED_LINK}${anime.youTubeTrailerId}`;
  }

  if (anime.airedStart !== null || anime.airedEnd !== null) {
    animeAiredP.classList.remove(HIDDEN_CLASS);
    animeAiredP.textContent = `
      ${anime.airedStart?.toLocaleDateString() ?? ''} -
      ${anime.airedEnd?.toLocaleDateString() ?? ''}
   `;
  }

  if (anime.genres.length > 0) {
    animeGenresList.classList.remove(HIDDEN_CLASS);
    anime.genres.forEach(genre => {
      const genreLi = document.createElement('li');
      genreLi.textContent = genre.name;
      animeGenresList.append(genreLi);
    });
  }

  if (anime.studios.length > 0) {
    animeStudiosList.classList.remove(HIDDEN_CLASS);
    anime.studios.forEach(studio => {
      const studioLi = document.createElement('li');
      studioLi.textContent = studio.name;
      animeStudiosList.append(studioLi);
    });
  }
}

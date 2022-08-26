import { FC, memo, useLayoutEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Anime } from '@js-camp/core/models/anime/anime';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import {
  selectAnimeById,
  selectIsAnimeLoading,
} from '@js-camp/react/store/anime/selectors';
import { useParams } from 'react-router-dom';
import { AppError } from '@js-camp/core/models/appError';
import { getAnimeById } from '@js-camp/react/store/anime/dispatchers';

import { ChipList } from '../../../../components/ChipList';

import style from './AnimeDetails.module.css';
import { AnimeImageModal } from './AnimeImageModal';
import { AnimeDetailsSkeleton } from './AnimeDetailsSkeleton';

const YOUTUBE_EMBED_URL = 'https://www.youtube.com/embed/';

const AnimeDetailsComponent: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  if (id === undefined) {
    throw new AppError('Id not provided');
  }

  const anime = useAppSelector<Anime | undefined>(state => selectAnimeById(state, parseInt(id, 10)));
  const isLoading = useAppSelector(selectIsAnimeLoading);
  const [isModalOpened, setIsModalOpened] = useState(false);

  useLayoutEffect(() => {
    if (anime === undefined) {
      dispatch(getAnimeById(parseInt(id, 10)));
    }
  }, [id]);

  /** Open modal on image click. */
  const onImageClick = () => {
    setIsModalOpened(true);
  };

  /** Close modal. */
  const onModalClose = () => {
    setIsModalOpened(false);
  };

  if (isLoading) {
    return <AnimeDetailsSkeleton/>;
  }

  if (anime === undefined) {
    return <Typography>Something went wrong, maybe broken url.</Typography>;
  }

  return (
    <div className={style['anime']}>
      <div>
        <img
          className={style['anime__image']}
          role='button'
          tabIndex={0}
          alt={anime.titleEng}
          src={anime.image}
          onClick={onImageClick}
        />
      </div>
      <div className={style['anime__content']}>
        <div className={style['anime__header']}>
          <h1 className={style['anime__title']}>
            {anime.titleEng} / {anime.titleJapan}
          </h1>
          <div className={style['anime__status']}>
            <Typography className={style['anime__status__text']}>{anime.status}</Typography>
          </div>
          <ChipList items={anime.genres} />
        </div>
        <Typography>
          {anime.airedStart?.toLocaleDateString()} - {anime.airedEnd?.toLocaleDateString()}
        </Typography>
        <ChipList items={anime.studios} />
        <section className={style['anime__section-line']}>
          <h2 className={style['anime__section-header']}>Airing status:</h2>
          <Typography className={style['anime__section-text']}>
            {anime.isAiring ? 'Airing' : 'Not airing'}
          </Typography>
        </section>
        <section className={style['anime__section-line']}>
          <h2 className={style['anime__section-header']}>Type:</h2>
          <Typography className={style['anime__section-text']}>
            {anime.type}
          </Typography>
        </section>
        <section>
          <h2 className={style['anime__section-header']}>Synopsis</h2>
          <Typography>{anime.synopsis}</Typography>
        </section>
        {anime.youTubeTrailerId !== null && (
          <iframe
            className={style['anime__trailer']}
            src={`${YOUTUBE_EMBED_URL}${anime.youTubeTrailerId}`}
            allowFullScreen
          />
        )}
        <AnimeImageModal
          anime={anime}
          open={isModalOpened}
          onClose={onModalClose}
        />
      </div>
    </div>
  );
};

export const AnimeDetails = memo(AnimeDetailsComponent);

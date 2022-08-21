import { FC, memo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { selectAllAnimeBase, selectIsAnimeBaseLoading } from '@js-camp/react/store/anime/selectors';
import { getAnimeList } from '@js-camp/react/store/anime/dispatchers';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import { AnimeList } from '../../components/AnimeList';

import style from './AnimePage.module.css';

const AnimesPageComponent: FC = () => {
  const dispatch = useAppDispatch();
  const animeList = useAppSelector(selectAllAnimeBase);
  const isLoading = useAppSelector(selectIsAnimeBaseLoading);

  useEffect(() => {
    dispatch(getAnimeList());
  }, [dispatch]);

  return (
    <div className={style['anime-page-wrapper']}>
      <Box className={style['anime-list']}>
        <AnimeList animeList={animeList} isLoading={isLoading}/>
      </Box>
      <Box className={style['anime-details']}>
        <Outlet/>
      </Box>
    </div>
  );
};

export const AnimesPage = memo(AnimesPageComponent);

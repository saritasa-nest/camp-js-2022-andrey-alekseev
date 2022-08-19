import { FC, memo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { selectAllAnimeBase } from '@js-camp/react/store/anime/selectors';
import { getAnimeList } from '@js-camp/react/store/anime/dispatchers';
import { Outlet } from 'react-router-dom';

import { AnimeList } from '../../components/AnimeList';

import style from './AnimePage.module.css';

const AnimesPageComponent: FC = () => {
  const dispatch = useAppDispatch();
  const animeList = useAppSelector(selectAllAnimeBase);
  useEffect(() => {
    dispatch(getAnimeList());
  }, [dispatch]);

  return (
    <div className={style['anime-page-wrapper']}>
      <AnimeList
        className={style['anime-list']}
        animeList={animeList}
      ></AnimeList>
      <Outlet/>
    </div>
  );
};

export const AnimesPage = memo(AnimesPageComponent);

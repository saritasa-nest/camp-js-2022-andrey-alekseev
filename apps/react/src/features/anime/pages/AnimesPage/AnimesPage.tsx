import { FC, memo } from 'react';

import { AnimeList } from '../../components/AnimeList';
import { AnimeDetails } from '../../components/AnimeDetails';

import style from './AnimePage.module.css';

const AnimesPageComponent: FC = () => (
  <div className={style['anime-page-wrapper']}>
    <AnimeList className={style['anime-list']}></AnimeList>
    <AnimeDetails></AnimeDetails>
  </div>
);

export const AnimesPage = memo(AnimesPageComponent);

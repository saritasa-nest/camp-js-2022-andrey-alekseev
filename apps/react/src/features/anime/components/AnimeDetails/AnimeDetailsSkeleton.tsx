import { FC, memo } from 'react';
import { Skeleton } from '@mui/material';

import { ChipList } from '../../../../components/ChipList';

import style from './AnimeDetails.module.css';

const AnimeDetailsSkeletonComponent: FC = () => (
  <div className={style['anime']}>
    <div>
      <Skeleton variant="rectangular" className={style['anime__image']} />
    </div>
    <div className={style['anime__content']}>
      <div className={style['anime__header']}>
        <Skeleton
          component="h1"
          className={style['anime__title']}
          width="40%"
        ></Skeleton>
        <div className={style['anime__status']}>
          <Skeleton className={style['anime__status-text']} variant='rectangular'/>
        </div>
        <ChipList isLoading={true} />
      </div>
      <Skeleton width="10%"></Skeleton>
      <ChipList isLoading={true} />
      <Skeleton variant="rectangular" width="20%"></Skeleton>
      <Skeleton variant="rectangular" width="20%"></Skeleton>
      <Skeleton height="200px" variant="rectangular"></Skeleton>
      <Skeleton
        className={style['anime__trailer']}
        variant="rectangular"
      ></Skeleton>
    </div>
  </div>
);

export const AnimeDetailsSkeleton = memo(AnimeDetailsSkeletonComponent);

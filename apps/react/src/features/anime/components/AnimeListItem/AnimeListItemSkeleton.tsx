import { FC, memo } from 'react';

import { Card, CardContent, Skeleton, Typography } from '@mui/material';

import style from './AnimeListItem.module.css';

const AnimeListItemSkeletonComponent: FC = () => (
  <Card className={style['anime-card']}>
    <CardContent className={style['anime-card__content']}>
      <Skeleton variant="rectangular" className={style['anime-card__image']}/>
      <div>
        <Typography gutterBottom>
          <Skeleton/>
        </Typography>
        <Typography component='div' color="text.secondary" gutterBottom>
          <Skeleton width='40%'/>
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          <Skeleton width='40%'/>
        </Typography>
      </div>
    </CardContent>
  </Card>
);

export const AnimeListItemSkeleton = memo(AnimeListItemSkeletonComponent);

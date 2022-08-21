import { Card, CardContent, CardMedia, Skeleton, Typography } from '@mui/material';
import { AnimeStatus } from '@js-camp/core/models/anime/animeStatus';
import { AnimeType } from '@js-camp/core/models/anime/animeType';
import { AnimeBase } from '@js-camp/core/models/anime/animeBase';
import { FC, memo } from 'react';

import style from './AnimeListItem.module.css';

interface Props {

  /** Anime. */
  readonly anime?: AnimeBase;
}

const AnimeListItemComponent: FC<Props> = ({ anime }) => (
  <Card className={style['anime-card']}>
    <CardContent className={style['anime-card__content']}>
      {anime !== undefined ?
        <CardMedia
          component="img"
          className={style['anime-card__image']}
          image={anime.image}
          alt={anime.titleEng}
        /> : <Skeleton variant="rectangular" className={style['anime-card__image']}/>
      }

      <div>
        <Typography gutterBottom>
          {anime !== undefined ? `${anime.titleEng} / ${anime.titleJapan}` : <Skeleton/>}
        </Typography>
        <Typography component='div' color="text.secondary" gutterBottom>
          {anime !== undefined ? `Status: ${AnimeStatus.toReadable(anime.status)}` : <Skeleton width='40%'/>}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          {anime !== undefined ? `Type: ${AnimeType.toReadable(anime.type)}` : <Skeleton width='40%'/>}
        </Typography>
      </div>
    </CardContent>
  </Card>
);

export const AnimeListItem = memo(AnimeListItemComponent);

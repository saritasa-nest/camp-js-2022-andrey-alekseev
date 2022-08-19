import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { AnimeStatus } from '@js-camp/core/models/anime/animeStatus';
import { AnimeType } from '@js-camp/core/models/anime/animeType';
import { AnimeBase } from '@js-camp/core/models/anime/animeBase';
import { FC, memo } from 'react';

import style from './AnimeListItem.module.css';

interface Props {

  /** Anime. */
  readonly anime: AnimeBase;
}

const AnimeListItemComponent: FC<Props> = ({ anime }: Props) => (
  <Card className={style['anime-card']}>
    <CardContent className={style['anime-card__content']}>
      <CardMedia
        component="img"
        className={style['anime-card__image']}
        image={anime.image}
        alt={anime.titleEng}
      />
      <div>
        <Typography gutterBottom>
          {anime.titleEng} / {anime.titleJapan}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Status: {AnimeStatus.toReadable(anime.status)}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Type: {AnimeType.toReadable(anime.type)}
        </Typography>
      </div>
    </CardContent>
  </Card>
);

export const AnimeListItem = memo(AnimeListItemComponent);

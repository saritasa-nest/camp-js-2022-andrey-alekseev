import { FC, memo } from 'react';
import { Typography } from '@mui/material';

const AnimeDetailsComponent: FC = () => (
  <div>
    <Typography>Anime</Typography>
    <Typography>Anime name</Typography>
  </div>
);

export const AnimeDetails = memo(AnimeDetailsComponent);

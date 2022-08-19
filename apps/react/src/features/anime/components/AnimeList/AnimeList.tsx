import { FC, memo } from 'react';
import {
  Box,
  List,
  ListItemButton,
} from '@mui/material';
import { AnimeBase } from '@js-camp/core/models/anime/animeBase';

import { AnimeListItem } from '../AnimeListItem';

interface Props {

  /** Class name. */
  readonly className?: string;

  /** Class name. */
  readonly animeList?: readonly AnimeBase[] | undefined;
}

const AnimeListComponent: FC<Props> = ({ className, animeList }) => {

  const animeItems = animeList?.map(anime => (
    <ListItemButton key={anime.id}>
      <AnimeListItem anime={anime}/>
    </ListItemButton>
  ));
  return (
    <Box className={className}>
      <List>
        {animeItems}
      </List>
    </Box>
  );
};

export const AnimeList = memo(AnimeListComponent);

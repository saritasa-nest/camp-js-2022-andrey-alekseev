import { FC, memo } from 'react';
import {
  Box,
  List,
  ListItemButton,
  Typography,
} from '@mui/material';
import { AnimeBase } from '@js-camp/core/models/anime/animeBase';
import { DEFAULT_PAGE_SIZE } from '@js-camp/core/models/pagination/pagination';

import { AnimeListItem, AnimeListItemSkeleton } from '../AnimeListItem';

interface Props {

  /** Class name. */
  readonly animeList: readonly AnimeBase[];

  /** Is list loading. */
  readonly isLoading: boolean;
}

const AnimeListComponent: FC<Props> = ({ animeList, isLoading }) => {
  const animeItems = (
  animeList.length === 0 && isLoading ?
  Array.from<undefined>(new Array(DEFAULT_PAGE_SIZE)) : animeList)?.map((anime, index) => (
    <ListItemButton key={anime?.id ?? index}>
      {anime !== undefined ?
        <AnimeListItem anime={anime}/> :
        <AnimeListItemSkeleton/>
      }
    </ListItemButton>
  ));
  return (
    <Box>
      <List>
        {animeItems.length !== 0 ?
          animeItems :
          <Typography>There are no anime for these filters</Typography>
        }
      </List>
    </Box>
  );
};

export const AnimeList = memo(AnimeListComponent);

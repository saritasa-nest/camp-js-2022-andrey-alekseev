import { FC, memo } from 'react';
import { Box, List, ListItemButton, Typography, useTheme } from '@mui/material';
import { AnimeBase } from '@js-camp/core/models/anime/animeBase';
import { DEFAULT_PAGE_SIZE } from '@js-camp/core/models/pagination/pagination';

import { NavLink } from 'react-router-dom';

import { AnimeListItem } from '../AnimeListItem';
import { routePaths } from '../../../../utils/routePaths';

interface Props {

  /** Class name. */
  readonly animeList: readonly AnimeBase[];

  /** Is list loading. */
  readonly isLoading: boolean;
}

const AnimeListComponent: FC<Props> = ({ animeList, isLoading }) => {
  const theme = useTheme();

  const animeItems = (
    animeList.length === 0 && isLoading ?
      Array.from<undefined>(new Array(DEFAULT_PAGE_SIZE)) :
      animeList
  )?.map((anime, index) => (
    <ListItemButton
      component={NavLink}
      sx={{
        '&.active': {
          background: theme.palette.action.selected,
        },
      }}
      to={anime !== undefined ? routePaths.animeDetails(anime?.id) : '#'}
      key={anime?.id ?? index}
    >
      <AnimeListItem anime={anime} />
    </ListItemButton>
  ));
  return (
    <Box>
      <List>
        {animeItems.length !== 0 ? (
          animeItems
        ) : (
          <Typography>There are no anime for these filters</Typography>
        )}
      </List>
    </Box>
  );
};

export const AnimeList = memo(AnimeListComponent);

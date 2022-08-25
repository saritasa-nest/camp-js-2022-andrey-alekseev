import { FC, memo } from 'react';
import {
  List,
  ListItemButton,
} from '@mui/material';
import { AnimeBase } from '@js-camp/core/models/anime/animeBase';

import { AnimeListItem } from '../AnimeListItem';

interface Props {

  /** Class name. */
  readonly animeList: readonly AnimeBase[];

  /** Is list loading. */
  readonly isLoading: boolean;
}

const AnimeListComponent: FC<Props> = ({ animeList, isLoading }) => {
  let animeItems = animeList.map(anime => (
    <ListItemButton key={anime.id}>
      <AnimeListItem anime={anime}/>
    </ListItemButton>
  ));

  if (isLoading) {
    animeItems = [...Array(10)].map((_, index) => (
      <ListItemButton key={index}>
        <AnimeListItem/>
      </ListItemButton>
    ));
  }

  return (
    <List>
      {animeItems}
    </List>
  );
};

export const AnimeList = memo(AnimeListComponent);

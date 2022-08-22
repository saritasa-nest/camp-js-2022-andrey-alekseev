import { FC, memo } from 'react';
import {
  List,
  ListItemButton,
} from '@mui/material';
import { AnimeBase } from '@js-camp/core/models/anime/animeBase';

import { AnimeListItem, AnimeListItemSkeleton } from '../AnimeListItem';

interface Props {

  /** Class name. */
  readonly animeList: readonly AnimeBase[];

  /** Is list loading. */
  readonly isLoading: boolean;
}

const AnimeListComponent: FC<Props> = ({ animeList, isLoading }) => {
  const animeItems = (isLoading ? Array.from<undefined>(new Array(10)) : animeList)?.map((anime, index) => (
    <ListItemButton key={anime?.id ?? index}>
      {anime !== undefined ?
        <AnimeListItem anime={anime}/> :
        <AnimeListItemSkeleton/>
      }
    </ListItemButton>
  ));
  return (
    <List>
      {animeItems}
    </List>
  );
};

export const AnimeList = memo(AnimeListComponent);

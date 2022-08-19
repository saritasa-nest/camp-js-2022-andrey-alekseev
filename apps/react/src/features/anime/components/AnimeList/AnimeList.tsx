import { FC, memo, useEffect } from 'react';
import {
  Box,
  List,
  ListItemButton,
  Toolbar,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { selectAnimeList } from '@js-camp/react/store/anime/selectors';
import { getAnimeList } from '@js-camp/react/store/anime/dispatchers';

import { AnimeListItem } from '../AnimeListItem';

interface Props {

  /** Class name. */
  readonly className?: string;
}

const AnimeListComponent: FC<Props> = ({ className }) => {
  const dispatch = useAppDispatch();
  const animeList = useAppSelector(selectAnimeList);

  useEffect(() => {
    dispatch(getAnimeList());
  }, [dispatch]);

  const animeItems = animeList?.map(anime => (
    <ListItemButton key={anime.id}>
      <AnimeListItem anime={anime}/>
    </ListItemButton>
  ));
  return (
    <Box className={className}>
      <Toolbar />
      <List>
        {animeItems}
      </List>
    </Box>
  );
};

export const AnimeList = memo(AnimeListComponent);

import { FC, memo } from 'react';
import { Chip, Skeleton, Stack } from '@mui/material';

import style from './ChipList.module.css';

interface NamedItem {

  /** Item id. */
  readonly id: number;

  /** Item name. */
  readonly name: string;
}

interface Props {

  /** Named items list. */
  readonly items?: readonly NamedItem[];

  /** Is loading. */
  readonly isLoading?: boolean;
}

const ChipListComponent: FC<Props> = ({ items = [], isLoading = false }) => {
  const chipSkeletons = [...Array(3)].map((_, index) => (<Skeleton
    key={index}
    className={style['chip']}
    variant="rectangular"
    component={Chip}
    width="75px"
  ></Skeleton>));

  const chips = items.map(item => (
    <Chip className={style['chip']} color="primary" key={item.id} label={item.name}></Chip>
  ));

  return (
    <Stack direction="row" spacing={1}>
      {isLoading ? chipSkeletons : chips}
    </Stack>
  );
};

export const ChipList = memo(ChipListComponent);
import { Modal } from '@mui/material';
import { FC, memo } from 'react';
import { Anime } from '@js-camp/core/models/anime/anime';

import style from './AnimeImageModal.module.css';

interface Props {

  /** Anime. */
  readonly anime: Anime;

  /** Should open modal. */
  readonly open: boolean;

  /** On close callback. */
  readonly onClose: () => void;
}

export const AnimeImageModalComponent: FC<Props> = (
  {
    open,
    onClose,
    anime,
  },
) => (
  <Modal
    className={style['image-modal']}
    keepMounted
    open={open}
    onClose={onClose}
  >
    <img className={style['image-modal__image']} alt={anime.titleEng} src={anime.image} />
  </Modal>
);

export const AnimeImageModal = memo(AnimeImageModalComponent);

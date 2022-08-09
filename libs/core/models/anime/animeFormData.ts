import { AnimeCreationType } from './animeType';
import { Anime } from './anime';

/** Anime create form data. */
export interface AnimeEditFormData extends Omit<Anime, 'type'> {

  /** Override to set only creation types. */
  readonly type: AnimeCreationType;
}

export type AnimeCreateFormData = Omit<AnimeEditFormData, 'id'>;

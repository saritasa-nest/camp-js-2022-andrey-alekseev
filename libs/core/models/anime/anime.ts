import { Genre } from '../genre/genre';
import { Immerable, OmitImmerable } from '../immerable';
import { Studio } from '../studio';

import { AnimeBase } from './animeBase';

/**
 * Anime extra model.
 * This class contains all field that not presented
 * in AnimeBase except id.
 * */
export class AnimeExtra extends Immerable {
  /** Id. */
  public readonly id: number;

  /** Synopsis. */
  public readonly synopsis: string;

  /** Aired end. */
  public readonly airedEnd: Date | null;

  /** Is airing. */
  public readonly isAiring: boolean;

  /** YouTube trailer id. */
  public readonly youTubeTrailerId: string | null;

  /** List of studios ids. */
  public readonly studiosIds: readonly number[];

  /** List of genres ids. */
  public readonly genresIds: readonly number[];

  public constructor(data: AnimeExtraInitArgs) {
    super();
    this.id = data.id;
    this.synopsis = data.synopsis;
    this.airedEnd = data.airedEnd;
    this.isAiring = data.isAiring;
    this.youTubeTrailerId = data.youTubeTrailerId;
    this.studiosIds = data.studiosIds;
    this.genresIds = data.genresIds;
  }
}

type AnimeExtraInitArgs = OmitImmerable<AnimeExtra>;

/** Anime model. */
export interface Anime extends Omit<OmitImmerable<AnimeBase & AnimeExtra>, 'studiosIds' | 'genresIds'> {

  /** List of studios. */
  readonly studios: readonly Studio[];

  /** List of genres. */
  readonly genres: readonly Genre[];
}

import { Genre } from '../genre/genre';
import { OmitImmerable } from '../immerable';
import { Studio } from '../studio';

import { AnimeBase } from './animeBase';

/** Anime model. */
export class Anime extends AnimeBase {

  /** Synopsis. */
  public readonly synopsis: string;

  /** Aired end. */
  public readonly airedEnd: Date | null;

  /** Is airing. */
  public readonly isAiring: boolean;

  /** YouTube trailer id. */
  public readonly youTubeTrailerId: string;

  /** List of studios. */
  public readonly studios: readonly Studio[];

  /** List of genres. */
  public readonly genres: readonly Genre[];

  public constructor(data: AnimeInitArgs) {
    super(data);
    this.synopsis = data.synopsis;
    this.airedEnd = data.airedEnd;
    this.isAiring = data.isAiring;
    this.youTubeTrailerId = data.youTubeTrailerId;
    this.studios = data.studios;
    this.genres = data.genres;
  }
}

type AnimeInitArgs = OmitImmerable<Anime>;

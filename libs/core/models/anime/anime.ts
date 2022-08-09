import { Genre } from '../genre/genre';
import { OmitImmerable } from '../immerable';
import { Studio } from '../studio';

import { AnimeSeason } from './animeSeason';
import { AnimeRating } from './animeRating';
import { AnimeBase } from './animeBase';
import { AnimeSource } from './animeSource';

/** Anime model. */
export class Anime extends AnimeBase {

  /** Synopsis. */
  public readonly synopsis: string;

  /** Aired end. */
  public readonly airedEnd: Date | null;

  /** Is airing. */
  public readonly isAiring: boolean;

  /** Rating. */
  public readonly rating: AnimeRating;

  /** Season. */
  public readonly season: AnimeSeason;

  /** Source. */
  public readonly source: AnimeSource;

  /** YouTube trailer id. */
  public readonly youTubeTrailerId: string | null;

  /** List of studios. */
  public readonly studios: readonly Studio[];

  /** List of genres. */
  public readonly genres: readonly Genre[];

  public constructor(data: AnimeInitArgs) {
    super(data);
    this.synopsis = data.synopsis;
    this.airedEnd = data.airedEnd;
    this.isAiring = data.isAiring;
    this.rating = data.rating;
    this.season = data.season;
    this.source = data.source;
    this.youTubeTrailerId = data.youTubeTrailerId;
    this.studios = data.studios;
    this.genres = data.genres;
  }
}

type AnimeInitArgs = OmitImmerable<Anime>;

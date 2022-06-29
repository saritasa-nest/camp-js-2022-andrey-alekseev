import { Immerable, OmitImmerable } from '../immerable';

import { AnimeStatus } from './animeStatus';

import { AnimeType } from './animeType';

/** Fields available for sorting anime. */
export enum AnimeSortField {
  Title = 'titleEng',
  AiredStart = 'airedStart',
  Status = 'status',
}

/** Base model for anime. */
export class AnimeBase extends Immerable {

  /** Id. */
  public readonly id: number;

  /** English title. */
  public readonly titleEng: string;

  /** Japan title. */
  public readonly titleJapan: string;

  /** Image. */
  public readonly image: string;

  /** Aired start. */
  public readonly airedStart: Date | null;

  /** Type. */
  public readonly type: AnimeType;

  /** Status. */
  public readonly status: AnimeStatus;

  public constructor(data: AnimeInitArgs) {
    super();
    this.id = data.id;
    this.titleEng = data.titleEng;
    this.titleJapan = data.titleJapan;
    this.image = data.image;
    this.airedStart = data.airedStart;
    this.type = data.type;
    this.status = data.status;
  }
}

type AnimeInitArgs = OmitImmerable<AnimeBase>;

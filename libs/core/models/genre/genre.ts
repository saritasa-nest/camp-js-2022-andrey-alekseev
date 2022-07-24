import { Immerable, OmitImmerable } from '../immerable';

import { GenreType } from './genreType';

/** Genre. */
export class Genre extends Immerable {

  /** Id. */
  public readonly id: number;

  /** Name. */
  public readonly name: string;

  /** Type. */
  public readonly type: GenreType;

  public constructor(data: GenreInitArgs) {
    super();
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
  }
}

type GenreInitArgs = OmitImmerable<Genre>;

import { Immerable, OmitImmerable } from './immerable';

/** Studio filters. */
export interface StudioFilters {

  /** Search string. */
  readonly searchString: string;

}

/** Studio model. */
export class Studio extends Immerable {

  /** Id. */
  public readonly id: number;

  /** Name. */
  public readonly name: string;

  public constructor(data: StudioInitArgs) {
    super();
    this.id = data.id;
    this.name = data.name;
  }
}

type StudioInitArgs = OmitImmerable<Studio>;

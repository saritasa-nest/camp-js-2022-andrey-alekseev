import { Pipe, PipeTransform } from '@angular/core';
import { AnimeType } from '@js-camp/core/models/anime/animeType';

/** Pipe for transforming anime type to readable. */
@Pipe({
  name: 'animeType',
})
export class AnimeTypePipe implements PipeTransform {
  /**
   * Format anime type to readable format.
   * @param type Anime type.
   */
  public transform(type: AnimeType): string {
    return AnimeType.toReadable(type);
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { AnimeSource } from '@js-camp/core/models/anime/animeSource';

/** Pipe for transforming anime source to readable. */
@Pipe({
  name: 'animeSource',
})
export class AnimeSourcePipe implements PipeTransform {
  /**
   * Format anime source to readable format.
   * @param source Anime source.
   */
  public transform(source: AnimeSource): string {
    return AnimeSource.toReadable(source);
  }
}

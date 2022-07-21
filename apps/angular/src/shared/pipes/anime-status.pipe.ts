import { Pipe, PipeTransform } from '@angular/core';
import { AnimeStatus } from '@js-camp/core/models/anime/animeStatus';

/** Pipe for transforming anime status to readable. */
@Pipe({
  name: 'animeStatus',
})
export class AnimeStatusPipe implements PipeTransform {
  /**
   * Format anime status to readable format.
   * @param status Anime status.
   */
  public transform(status: AnimeStatus): string {
    return AnimeStatus.toReadable(status);
  }
}

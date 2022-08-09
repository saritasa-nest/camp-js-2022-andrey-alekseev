import { Pipe, PipeTransform } from '@angular/core';
import { AnimeSeason } from '@js-camp/core/models/anime/animeSeason';

/** Pipe for transforming anime season to readable. */
@Pipe({
  name: 'animeSeason',
})
export class AnimeSeasonPipe implements PipeTransform {
  /**
   * Format anime season to readable format.
   * @param season Anime season.
   */
  public transform(season: AnimeSeason): string {
    return AnimeSeason.toReadable(season);
  }
}

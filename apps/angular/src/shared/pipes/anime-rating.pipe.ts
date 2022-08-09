import { Pipe, PipeTransform } from '@angular/core';
import { AnimeRating } from '@js-camp/core/models/anime/animeRating';

/** Pipe for transforming anime rating to readable. */
@Pipe({
  name: 'animeRating',
})
export class AnimeRatingPipe implements PipeTransform {
  /**
   * Format anime rating to readable format.
   * @param rating Anime rating.
   */
  public transform(rating: AnimeRating): string {
    return AnimeRating.toReadable(rating);
  }
}

import { enumToKeys } from 'enum-to-array';

/** Represents anime rating. */
export enum AnimeSource {
  FourKomaManga = 'FOUR_KOMA_MANGA',
  Book = 'BOOK',
  CardGame = 'CARD_GAME',
  Game = 'GAME',
  LightNovel = 'LIGHT_NOVEL',
  Manga = 'MANGA',
  MixedMedia = 'MIXED_MEDIA',
  Music = 'MUSIC',
  Novel = 'NOVEL',
  PictureBook = 'PICTURE_BOOK',
  Radio = 'RADIO',
  VisualNovel = 'VISUAL_NOVEL',
  WebManga = 'WEB_MANGA',
  WebNovel = 'WEB_NOVEL',
  Original = 'ORIGINAL',
  Other = 'OTHER',
  Unknown = 'UNKNOWN',
}

export namespace AnimeSource {

  const TO_READABLE_MAP: Readonly<Record<AnimeSource, string>> = {
    [AnimeSource.FourKomaManga]: 'Four koma manga',
    [AnimeSource.Book]: 'Book',
    [AnimeSource.CardGame]: 'Card game',
    [AnimeSource.Game]: 'Game',
    [AnimeSource.LightNovel]: 'Light novel',
    [AnimeSource.Manga]: 'Manga',
    [AnimeSource.MixedMedia]: 'Mixed media',
    [AnimeSource.Music]: 'Music',
    [AnimeSource.Novel]: 'Novel',
    [AnimeSource.PictureBook]: 'Picture book',
    [AnimeSource.Radio]: 'Radio',
    [AnimeSource.VisualNovel]: 'Visual novel',
    [AnimeSource.WebManga]: 'Web manga',
    [AnimeSource.WebNovel]: 'Web novel',
    [AnimeSource.Original]: 'Original',
    [AnimeSource.Other]: 'Other',
    [AnimeSource.Unknown]: 'Unknown',
  };

  export const sourcesList = enumToKeys(TO_READABLE_MAP);

  /**
   * Converts a certain anime source into readable equivalent.
   * @param value Rating.
   */
  export function toReadable(value: AnimeSource): string {
    return TO_READABLE_MAP[value];
  }

  /**
   * Converts string into anime source.
   * @param value Value.
   */
  export function toAnimeSource(value: string): AnimeSource {
    if (!isAnimeSource(value)) {
      throw new Error('Not expected anime source');
    }
    return value;
  }

  /**
   * Type guard for anime source.
   * @param value Value.
   */
  export function isAnimeSource(value: string): value is AnimeSource {
    return sourcesList.includes(value as AnimeSource);
  }
}

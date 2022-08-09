import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Anime } from '@js-camp/core/models/anime/anime';

/** Dialog data for anime image. */
export interface AnimeImageDialogData {

  /** Anime. */
  readonly anime: Anime;
}

/** Anime image dialog. */
@Component({
  selector: 'anime-image-dialog',
  templateUrl: 'anime-image.component.html',
})
export class AnimeImageDialogComponent {
  public constructor(@Inject(MAT_DIALOG_DATA) public data: AnimeImageDialogData) {}
}

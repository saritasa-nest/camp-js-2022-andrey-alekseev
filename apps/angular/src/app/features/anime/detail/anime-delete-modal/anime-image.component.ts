import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Anime } from '@js-camp/core/models/anime/anime';

import { Router } from '@angular/router';

import { AnimeService } from '../../../../../core/services/anime.service';
import { routePaths } from '../../../../../core/utils/route-paths';

/** Dialog data for anime deletion. */
export interface AnimeDeleteDialogData {

  /** Anime. */
  readonly anime: Anime;
}

/** Anime delete dialog. */
@Component({
  selector: 'anime-image-dialog',
  templateUrl: 'anime-delete-dialog.component.html',
})
export class AnimeDeleteDialogComponent {
  public constructor(
    @Inject(MAT_DIALOG_DATA) public data: AnimeDeleteDialogData,
    public dialogRef: MatDialogRef<AnimeDeleteDialogComponent>,
    private readonly animeService: AnimeService,
    private readonly router: Router,
  ) {}

  /**
   * Confirm anime deletion.
   * @param anime Anime.
   */
  public confirmDeletion(anime: Anime): void {
    this.animeService.deleteAnime(anime.id).subscribe(
      () => {
        this.dialogRef.close();
        this.router.navigate([routePaths.home]);
      },
    );
  }
}

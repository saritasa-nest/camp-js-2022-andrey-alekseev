import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Anime } from '@js-camp/core/models/anime/anime';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';

import { AnimeService } from '../../../../core/services/anime.service';
import { AppError } from '../../../../core/models/app-errors';

import { AnimeImageDialogComponent } from './anime-image-modal/anime-image.component';

/** Anime details component. */
@Component({
  selector: 'anime-detail',
  templateUrl: './anime-detail.component.html',
  styleUrls: ['./anime-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDetailComponent implements OnInit {

  /** Anime. */
  public anime$?: Observable<Anime>;

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly sanitizer: DomSanitizer,
    private readonly dialog: MatDialog,
    private readonly animeService: AnimeService,
  ) {}

  /** @inheritDoc */
  public ngOnInit(): void {
    // load youtube api
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam === null) {
      throw new AppError('Id is not provided');
    }
    const animeId = parseInt(idParam, 10);
    if (Number.isNaN(animeId) && animeId < 0) {
      throw new AppError('Not valid id');
    }
    this.anime$ = this.animeService.getAnime(animeId);
  }

  /**
   * Open anime image modal.
   * @param anime Anime.
   */
  public openImageModal(anime: Anime): void {
    this.dialog.open(AnimeImageDialogComponent, {
      data: {
        anime,
      },
    });
  }
}

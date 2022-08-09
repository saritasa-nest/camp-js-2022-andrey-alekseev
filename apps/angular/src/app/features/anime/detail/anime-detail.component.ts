import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { Anime } from '@js-camp/core/models/anime/anime';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';

import { AnimeService } from '../../../../core/services/anime.service';
import { AppError } from '../../../../core/models/app-errors';
import { routePaths } from '../../../../core/utils/route-paths';
import { trackById } from '../../../../core/utils/trackById';

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
  public readonly anime$: Observable<Anime>;

  /** Error. */
  public readonly error$: Observable<boolean>;

  /** Loading subject. */
  public readonly isLoading$ = new BehaviorSubject<boolean>(true);

  /** Track by id function. */
  public readonly trackById = trackById;

  public constructor(
    private readonly router: Router,
    private readonly sanitizer: DomSanitizer,
    private readonly dialog: MatDialog,
    animeService: AnimeService,
    route: ActivatedRoute,
  ) {
    const idParam = route.snapshot.paramMap.get('id');
    if (idParam === null) {
      throw new AppError('Id is not provided');
    }
    const animeId = parseInt(idParam, 10);
    if (Number.isNaN(animeId) || animeId < 0) {
      this.router.navigate([routePaths.home]);
    }
    this.anime$ = animeService.getAnime(animeId).pipe(
      tap(() => this.isLoading$.next(false)),
      catchError((error: unknown) => {
        this.isLoading$.next(false);
        throw error;
      }),
    );
    this.error$ = this.anime$.pipe(
      map(() => false),
      catchError(() => of(true)),
    );
  }

  /** @inheritDoc */
  public ngOnInit(): void {
    // load youtube api
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  /**
   * Open anime image modal.
   * @param anime Anime.
   */
  public onImageClick(anime: Anime): void {
    this.dialog.open(AnimeImageDialogComponent, {
      data: {
        anime,
      },
    });
  }

}

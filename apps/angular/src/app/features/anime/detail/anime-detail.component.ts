import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { Anime } from '@js-camp/core/models/anime/anime';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';

import { AnimeService } from '../../../../core/services/anime.service';
import { routePaths } from '../../../../core/utils/route-paths';
import { trackById } from '../../../../core/utils/trackById';
import { getIdParamFromQuery } from '../../../../core/utils/queryParams';

import { AnimeImageDialogComponent } from './anime-image-modal/anime-image.component';
import { AnimeDeleteDialogComponent } from './anime-delete-modal/anime-delete-dialog.component';

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
    const animeId = getIdParamFromQuery(route.snapshot.paramMap);
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

  /**
   * Open anime delete modal.
   * @param anime Anime.
   */
  public deleteAnime(anime: Anime): void {
    this.dialog.open(AnimeDeleteDialogComponent, {
      data: {
        anime,
      },
    });
  }

  /**
   * Open edit page on button click.
   * @param anime Anime.
   */
  public onEditClick(anime: Anime): void {
    this.router.navigate([routePaths.animeEdit(anime.id)]);
  }
}

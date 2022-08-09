import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AnimeBase } from '@js-camp/core/models/anime/animeBase';
import { first, map, Observable, shareReplay } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';

import { AnimeService } from '../../../../core/services/anime.service';
import { UserService } from '../../../../core/services/user.service';
import { routePaths } from '../../../../core/utils/route-paths';

/** Anime list component. */
@UntilDestroy()
@Component({
  selector: 'anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent implements OnInit {
  /** List of anime. */
  public readonly animeList$: Observable<readonly AnimeBase[]>;

  /** Is user authenticated. */
  public readonly isUserAuthenticated$ = this.userService.isAuthenticated$;

  /** Is table loading. */
  public isLoading = true;

  /** Columns to display in table. */
  public readonly displayedColumns = [
    'image',
    'titleEng',
    'titleJpn',
    'airedStart',
    'type',
    'status',
  ] as const;

  public constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    animeService: AnimeService,
  ) {
    this.animeList$ = animeService.getAnimeList().pipe(
      map(animePaginatedList => animePaginatedList.items),
      shareReplay({ refCount: true, bufferSize: 1 }),
    );
  }

  /**
   * Track by anime by id.
   * @param _index Item index.
   * @param anime Anime model.
   */
  public trackAnimeById(_index: number, anime: AnimeBase): number {
    return anime.id;
  }

  /** @inheritDoc */
  public ngOnInit(): void {
    this.animeList$.pipe(
      untilDestroyed(this),
    ).subscribe(
      () => {
        this.isLoading = false;
      },
    );
  }

  /**
   * Open anime details.
   * @param animeBase Anime base model.
   */
  public openDetails(animeBase: AnimeBase): void {
    this.isUserAuthenticated$.pipe(
      untilDestroyed(this),
      first(),
    ).subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigate([`${routePaths.anime}/${animeBase.id}`]);
      }
    });
  }
}

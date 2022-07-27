import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

import { AnimeBase } from '@js-camp/core/models/anime/animeBase';

import { map, Observable, shareReplay, Subscription } from 'rxjs';

import { AnimeService } from '../../../../core/services/anime.service';

/** Anime list component. */
@Component({
  selector: 'anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent implements OnInit, OnDestroy {
  /** List of anime. */
  public readonly animeList$: Observable<readonly AnimeBase[]>;

  /** Anime table subscriptions. */
  private readonly animeTableSubscriptions = new Subscription();

  /** Is table loading. */
  public isLoading = true;

  /** Columns to display in table. */
  public displayedColumns = [
    'image',
    'titleEng',
    'titleJpn',
    'airedStart',
    'type',
    'status',
  ];

  public constructor(
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
    this.animeTableSubscriptions.add(this.animeList$.subscribe(
      () => {
        this.isLoading = false;
      },
    ));
  }

  /** @inheritDoc */
  public ngOnDestroy(): void {
    this.animeTableSubscriptions.unsubscribe();
  }
}

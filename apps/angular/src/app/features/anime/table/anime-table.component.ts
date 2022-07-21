import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AnimeBase } from '@js-camp/core/models/anime/animeBase';
import { map, Observable, shareReplay } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { AnimeService } from '../../../../core/services/anime.service';

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
}

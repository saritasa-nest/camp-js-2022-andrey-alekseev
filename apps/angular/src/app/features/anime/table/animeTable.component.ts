import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { AnimeBase } from '@js-camp/core/models/anime/animeBase';

import { map, Observable, shareReplay } from 'rxjs';

import { AnimeService } from '../../../../core/services/anime.service';

/** Anime list component. */
@Component({
  selector: 'anime-table',
  templateUrl: './animeTable.component.html',
  styleUrls: ['./animeTable.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent implements OnInit {
  /** List of anime. */
  public animeList$: Observable<readonly AnimeBase[]>;

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
    private animeService: AnimeService,
  ) {
    this.animeList$ = this.animeService.getAnimeList().pipe(
      map(animePaginatedList => animePaginatedList.items),
      shareReplay({ refCount: true, bufferSize: 1 }),
    );
  }

  /** Disable loading on fetch end. */
  public ngOnInit(): void {
    this.animeList$.subscribe(
      () => {
        this.isLoading = false;
      },
    );
  }
}

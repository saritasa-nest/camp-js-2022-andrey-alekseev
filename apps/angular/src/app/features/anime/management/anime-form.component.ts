import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Anime } from '@js-camp/core/models/anime/anime';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';

import { AnimeService } from '../../../../core/services/anime.service';

/** Anime form component. */
@Component({
  selector: 'anime-form',
  templateUrl: './anime-form.component.html',
  styleUrls: ['./anime-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeFormComponent {
  /** Anime. */
  @Input()
  public anime?: Anime;

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly sanitizer: DomSanitizer,
    private readonly dialog: MatDialog,
    private readonly animeService: AnimeService,
  ) {}

}

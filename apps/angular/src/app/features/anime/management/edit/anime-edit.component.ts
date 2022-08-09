import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Anime } from '@js-camp/core/models/anime/anime';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AnimeCreateFormData, AnimeEditFormData } from '@js-camp/core/models/anime/animeFormData';

import { AnimeService } from '../../../../../core/services/anime.service';
import { getIdParamFromQuery } from '../../../../../core/utils/queryParams';
import { routePaths } from '../../../../../core/utils/route-paths';

/** Anime edit component. */
@Component({
  selector: 'anime-edit',
  templateUrl: './anime-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeEditComponent {

  private readonly animeId: number;

  /** Anime. */
  public readonly anime$: Observable<Anime>;

  public constructor(
    private readonly animeService: AnimeService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    this.animeId = getIdParamFromQuery(this.route.snapshot.paramMap);
    this.anime$ = this.animeService.getAnime(this.animeId);
  }

  /**
   * Handle form submit.
   * @param animeFormData Anime form data.
   */
  public onFormSubmit(animeFormData: AnimeCreateFormData): void {
    this.animeService.editAnime({
      id: this.animeId,
      ...animeFormData,
    }).subscribe(
      anime => this.router.navigate([`${routePaths.anime}/${anime.id}`]),
    );
  }
}

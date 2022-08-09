import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AnimeCreateFormData } from '@js-camp/core/models/anime/animeFormData';
import { Router } from '@angular/router';

import { AnimeService } from '../../../../../core/services/anime.service';
import { routePaths } from '../../../../../core/utils/route-paths';

/** Anime create component. */
@Component({
  selector: 'anime-create',
  templateUrl: './anime-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeCreateComponent {

  public constructor(
    private readonly animeService: AnimeService,
    private readonly router: Router,
  ) { }

  /**
   * Handle form submit.
   * @param animeFormData Anime form data.
   */
  public onFormSubmit(animeFormData: AnimeCreateFormData): void {
    this.animeService.createAnime(animeFormData).subscribe(
      anime => this.router.navigate([`${routePaths.anime}/${anime.id}`]),
    );
  }
}

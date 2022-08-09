import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Anime } from '@js-camp/core/models/anime/anime';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AnimeCreationType, AnimeType } from '@js-camp/core/models/anime/animeType';
import { AnimeStatus } from '@js-camp/core/models/anime/animeStatus';
import { AnimeSeason } from '@js-camp/core/models/anime/animeSeason';
import { AnimeRating } from '@js-camp/core/models/anime/animeRating';
import { AnimeSource } from '@js-camp/core/models/anime/animeSource';
import { AnimeCreateFormData } from '@js-camp/core/models/anime/animeFormData';

import { AnimeService } from '../../../../../core/services/anime.service';

/** Anime form component. */
@Component({
  selector: 'anime-form',
  templateUrl: './anime-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeFormComponent implements OnInit {
  /** Anime. */
  @Input()
  public anime?: Anime;

  /** Anime. */
  @Output()
  public formSubmit = new EventEmitter<AnimeCreateFormData>();

  /** Anime type. */
  public readonly animeType = AnimeType;

  /** Anime status. */
  public readonly animeStatus = AnimeStatus;

  /** Anime season. */
  public readonly animeSeason = AnimeSeason;

  /** Anime rating. */
  public readonly animeRating = AnimeRating;

  /** Anime rating. */
  public readonly animeSource = AnimeSource;

  /** Anime studios. */
  public readonly studios$ = this.animeService.getStudios();

  /** Anime form. */
  public readonly animeForm = new FormGroup({
    titleEng: new FormControl<string>('', { nonNullable: true, validators: [Validators.maxLength(255)] }),
    titleJapan: new FormControl<string>('', { nonNullable: true, validators: [Validators.maxLength(255)] }),
    image: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    airedStart: new FormControl<Date | null>(null),
    airedEnd: new FormControl<Date | null>(null),
    type: new FormControl<AnimeCreationType | null>(null, { nonNullable: true, validators: [Validators.required] }),
    status: new FormControl<AnimeStatus | null>(null, { nonNullable: true, validators: [Validators.required] }),
    season: new FormControl<AnimeSeason | null>(null, { nonNullable: true, validators: [Validators.required] }),
    rating: new FormControl<AnimeRating | null>(null, { nonNullable: true, validators: [Validators.required] }),
    source: new FormControl<AnimeSource | null>(null, { nonNullable: true, validators: [Validators.required] }),
    isAiring: new FormControl<boolean>(false, { nonNullable: true }),
    synopsis: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    youTubeTrailerId: new FormControl<string | null>(null, { nonNullable: true }),
  });

  public constructor(
    private readonly animeService: AnimeService,
  ) {
  }

  /** @inheritDoc */
  public ngOnInit(): void {
    if (this.anime === undefined) {
      return;
    }

    const { id, ...animeFormData } = this.anime;

    const type: AnimeType | null = animeFormData.type === AnimeType.Unknown ? null : animeFormData.type;
    this.animeForm.setValue({
      ...animeFormData,
      type,
    });
  }

  /** Create anime on submit. */
  public onSubmit(): void {
    const formControls = this.animeForm.controls;

    const type = formControls.type.value;
    const status = formControls.status.value;
    const season = formControls.season.value;
    const rating = formControls.rating.value;
    const source = formControls.source.value;
    if (
      type === null ||
      status === null ||
      season === null ||
      rating === null ||
      source === null
    ) {
      return;
    }
    this.formSubmit.emit({
      titleEng: formControls.titleEng.value,
      titleJapan: formControls.titleJapan.value,
      airedStart: formControls.airedStart.value,
      airedEnd: formControls.airedEnd.value,
      type,
      status,
      season,
      rating,
      source,
      synopsis: formControls.synopsis.value,
      isAiring: formControls.isAiring.value,
      youTubeTrailerId: formControls.youTubeTrailerId.value,
      studios: [],
      genres: [],
      image: formControls.image.value,
    });
  }

  /**
   * Handle image upload.
   * @param imageUrl Image url.
   */
  public onImageUpload(imageUrl: string): void {
    this.animeForm.controls.image.setValue(imageUrl);
  }
}

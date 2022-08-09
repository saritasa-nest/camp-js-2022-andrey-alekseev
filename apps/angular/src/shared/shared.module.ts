import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

import { AnimeTypePipe } from './pipes/anime-type.pipe';
import { AnimeStatusPipe } from './pipes/anime-status.pipe';
import { PageLoaderComponent } from './components/loader/page-loader.component';
import { FormattedDatePipe } from './pipes/formattedDate.pipe';
import { AnimeSeasonPipe } from './pipes/anime-season.pipe';
import { AnimeRatingPipe } from './pipes/anime-rating.pipe';
import { AnimeSourcePipe } from './pipes/anime-source.pipe';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';

const EXPORTED_DECLARATIONS = [
  AnimeTypePipe,
  AnimeStatusPipe,
  FormattedDatePipe,
  AnimeSeasonPipe,
  AnimeRatingPipe,
  AnimeSourcePipe,
  PageLoaderComponent,
  ImageUploadComponent,
];

/** Shared module. */
@NgModule({
  declarations: [...EXPORTED_DECLARATIONS],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  exports: [...EXPORTED_DECLARATIONS],
})
export class SharedModule { }

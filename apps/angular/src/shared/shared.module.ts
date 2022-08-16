import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

import { AnimeTypePipe } from './pipes/anime-type.pipe';
import { AnimeStatusPipe } from './pipes/anime-status.pipe';
import { PageLoaderComponent } from './components/loader/page-loader.component';
import { FormattedDatePipe } from './pipes/formattedDate.pipe';
import { AnimeSeasonPipe } from './pipes/anime-season.pipe';
import { AnimeRatingPipe } from './pipes/anime-rating.pipe';
import { AnimeSourcePipe } from './pipes/anime-source.pipe';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import {
  MultiselectAutocompleteComponent,
} from './components/multiselect-autocomplete/multiselect-autocomplete.component';
import { OptionsScrollDirective } from './directives/options-scroll';

const EXPORTED_DECLARATIONS = [
  AnimeTypePipe,
  AnimeStatusPipe,
  FormattedDatePipe,
  AnimeSeasonPipe,
  AnimeRatingPipe,
  AnimeSourcePipe,
  PageLoaderComponent,
  ImageUploadComponent,
  MultiselectAutocompleteComponent,
  OptionsScrollDirective,
];

/** Shared module. */
@NgModule({
  declarations: [...EXPORTED_DECLARATIONS],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatIconModule,
    MatChipsModule,
  ],
  exports: [...EXPORTED_DECLARATIONS],
})
export class SharedModule { }

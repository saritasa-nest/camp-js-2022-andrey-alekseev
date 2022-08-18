import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AnimeTypePipe } from './pipes/anime-type.pipe';
import { AnimeStatusPipe } from './pipes/anime-status.pipe';
import { PageLoaderComponent } from './components/loader/page-loader.component';
import { FormattedDatePipe } from './pipes/formattedDate.pipe';

const EXPORTED_DECLARATIONS = [
  AnimeTypePipe,
  AnimeStatusPipe,
  FormattedDatePipe,
  PageLoaderComponent,
];

/** Shared module. */
@NgModule({
  declarations: [...EXPORTED_DECLARATIONS],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
  ],
  providers: [DatePipe],
  exports: [...EXPORTED_DECLARATIONS],
})
export class SharedModule { }

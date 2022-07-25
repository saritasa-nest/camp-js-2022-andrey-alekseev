import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AnimeTypePipe } from './pipes/anime-type.pipe';
import { AnimeStatusPipe } from './pipes/anime-status.pipe';
import { PageLoaderComponent } from './components/loader/page-loader.component';

const EXPORTED_DECLARATIONS = [
  AnimeTypePipe,
  AnimeStatusPipe,
  PageLoaderComponent,
];

/** Shared module. */
@NgModule({
  declarations: [...EXPORTED_DECLARATIONS],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
  ],
  exports: [...EXPORTED_DECLARATIONS],
})
export class SharedModule { }

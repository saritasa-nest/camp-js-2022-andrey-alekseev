import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AnimeTypePipe } from './pipes/anime-type.pipe';
import { AnimeStatusPipe } from './pipes/anime-status.pipe';
import { LoaderComponent } from './components/loader/loader.component';

const EXPORTED_DECLARATIONS = [
  AnimeTypePipe,
  AnimeStatusPipe,
  LoaderComponent,
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

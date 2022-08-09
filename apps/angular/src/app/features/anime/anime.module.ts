import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { SharedModule } from '../../../shared/shared.module';

import { AnimeRoutingModule } from './anime-routing.module';
import { AnimeTableComponent } from './table/anime-table.component';
import { AnimeDetailComponent } from './detail/anime-detail.component';
import { AnimeImageDialogComponent } from './detail/anime-image-modal/anime-image.component';
import { AnimeDeleteDialogComponent } from './detail/anime-delete-modal/anime-image.component';

/** Anime module. */
@NgModule({
  declarations: [
    AnimeTableComponent,
    AnimeDetailComponent,
    AnimeImageDialogComponent,
    AnimeDeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AnimeRoutingModule,
    MatTableModule,
    MatProgressBarModule,
    MatChipsModule,
    YouTubePlayerModule,
    MatDialogModule,
    MatButtonModule,
  ],
})
export class AnimeModule {}

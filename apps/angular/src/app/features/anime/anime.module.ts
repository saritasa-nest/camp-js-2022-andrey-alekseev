import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';

import { SharedModule } from '../../../shared/shared.module';

import { AnimeRoutingModule } from './anime-routing.module';
import { AnimeTableComponent } from './table/anime-table.component';

/** Anime module. */
@NgModule({
  declarations: [AnimeTableComponent],
  imports: [
    CommonModule,
    SharedModule,
    AnimeRoutingModule,
    MatTableModule,
  ],
})
export class AnimeModule {}

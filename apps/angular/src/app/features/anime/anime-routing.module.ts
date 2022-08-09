import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../../core/guards/auth.guard';

import { AnimeTableComponent } from './table/anime-table.component';
import { AnimeDetailComponent } from './detail/anime-detail.component';
import { AnimeEditComponent } from './management/edit/anime-edit.component';
import { AnimeCreateComponent } from './management/create/anime-create.component';

const routes: Routes = [
  {
    path: '',
    component: AnimeTableComponent,
    title: 'Anime table',
  },
  {
    path: 'anime/create',
    component: AnimeCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'anime/:id',
    component: AnimeDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'anime/:id/edit',
    component: AnimeEditComponent,
    canActivate: [AuthGuard],
  },
];

/** Anime routing module. */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimeRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { SharedModule } from '../../../shared/shared.module';

import { AnimeRoutingModule } from './anime-routing.module';
import { AnimeTableComponent } from './table/anime-table.component';
import { AnimeDetailComponent } from './detail/anime-detail.component';
import { AnimeImageDialogComponent } from './detail/anime-image-modal/anime-image.component';
import { AnimeDeleteDialogComponent } from './detail/anime-delete-modal/anime-delete-dialog.component';
import { AnimeFormComponent } from './management/form/anime-form.component';
import { AnimeCreateComponent } from './management/create/anime-create.component';
import { AnimeEditComponent } from './management/edit/anime-edit.component';

/** Anime module. */
@NgModule({
  declarations: [
    AnimeTableComponent,
    AnimeDetailComponent,
    AnimeImageDialogComponent,
    AnimeDeleteDialogComponent,
    AnimeFormComponent,
    AnimeCreateComponent,
    AnimeEditComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AnimeRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSortModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatChipsModule,
    YouTubePlayerModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatAutocompleteModule,
  ],
})
export class AnimeModule {}

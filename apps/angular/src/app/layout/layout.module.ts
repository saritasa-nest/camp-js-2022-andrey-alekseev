import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { SharedModule } from '../../shared/shared.module';

import { LayoutComponent } from './layout.component';

/** Layouts module. */
@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
  ],
  exports: [LayoutComponent],
})
export class LayoutsModule { }

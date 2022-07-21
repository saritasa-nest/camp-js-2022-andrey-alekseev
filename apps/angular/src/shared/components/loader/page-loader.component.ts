import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

/** Loading spinner. */
@Component({
  selector: 'anime-page-loader',
  templateUrl: './page-loader.component.html',
  styleUrls: ['./page-loader.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLoaderComponent {
  /** Loader circle diameter. */
  @Input()
  public diameter = 100;
}

import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

/** Loading spinner. */
@Component({
  selector: 'anime-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  /** Loader circle diameter. */
  @Input()
  public diameter = 100;
}

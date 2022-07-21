import { ChangeDetectionStrategy, Component } from '@angular/core';

import { routePaths } from '../../core/utils/routePaths';

/**
 * Layout component.
 */
@Component({
  selector: 'anime-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {

  /** Route paths. */
  public readonly routePaths = routePaths;

  public constructor(
  ) {
  }

}

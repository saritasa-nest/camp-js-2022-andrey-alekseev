import { Pipe, PipeTransform } from '@angular/core';

/** Pipe for transforming date to single format. */
@Pipe({
  name: 'formattedDate',
})
export class FormattedDatePipe implements PipeTransform {
  /**
   * Format date.
   * @param date Date.
   */
  public transform(date: Date | null): string {
    if (date === null) {
      return '';
    }
    return date.toISOString().split('T')[0];
  }
}

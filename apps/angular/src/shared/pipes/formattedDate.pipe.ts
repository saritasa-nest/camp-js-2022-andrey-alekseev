import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

/** Pipe for transforming date to single format. */
@Pipe({
  name: 'formattedDate',
})
export class FormattedDatePipe implements PipeTransform {

  public constructor(
    private readonly datePipe: DatePipe,
  ) {
  }

  /**
   * Format date.
   * @param date Date.
   */
  public transform(date: Date | null): string | null {
    if (date === null) {
      return '';
    }
    return this.datePipe.transform(date, 'yyyy-mm-dd');
  }
}

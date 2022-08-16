import { Directive, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { takeUntil, tap } from 'rxjs/operators';
import { debounceTime, fromEvent, Subject } from 'rxjs';

/** Autocomplete scroll event. */
export interface AutoCompleteScrollEvent {

  /** Autocomplete component. */
  readonly autoComplete: MatAutocomplete;

  /** Scroll event. */
  readonly scrollEvent: Event;
}

/** Directive that adds scroll event to mat-autocomplete. */
@Directive({
  selector: 'mat-autocomplete[optionsScroll]',
})
export class OptionsScrollDirective implements OnDestroy {

  /** Threshold percent. */
  @Input()
  public thresholdPercent = 0.8;

  /** Event emmiter for scroll event. */
  @Output()
  public optionsScroll = new EventEmitter<AutoCompleteScrollEvent>();

  private onDestroySubject$ = new Subject<undefined>();

  public constructor(public autoComplete: MatAutocomplete) {
    this.autoComplete.opened.pipe(
      tap(() => {
        /** Note: When autocomplete raises opened, panel is not yet created (by Overlay)
         Note: The panel will be available on next tick
         Note: The panel wil NOT open if there are no options to display.
         */
        setTimeout(() => {
          /** Note: remove listener just for safety, in case the close event is skipped. */
          fromEvent<Event>(this.autoComplete.panel.nativeElement, 'scroll').pipe(
            debounceTime(200),
            tap(event => this.onScroll(event)),
            takeUntil(this.onDestroySubject$),
          )
            .subscribe();
        });
      }),
      takeUntil(this.onDestroySubject$),
    ).subscribe();
  }

  private onScroll(event: Event): void {
    if (this.thresholdPercent === undefined || !event?.target) {
      this.optionsScroll.next({ autoComplete: this.autoComplete, scrollEvent: event });
    } else {
      const target = event.target as HTMLElement;
      const threshold = this.thresholdPercent * 100 * target.scrollHeight / 100;
      const current = target.scrollTop + target.clientHeight;
      if (current > threshold) {
        this.optionsScroll.next({ autoComplete: this.autoComplete, scrollEvent: event });
      }
    }
  }

  /** @inheritDoc */
  public ngOnDestroy(): void {
    this.onDestroySubject$.next(undefined);
    this.onDestroySubject$.complete();
  }
}

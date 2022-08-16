import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, map, Observable, retryWhen, scan, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

/** Select item. */
export interface SelectItem {

  /** Select item value. */
  readonly value: string;

  /** Is item selected. */
  isSelected: boolean;
}

/** Multi select autocomplete component. */
@UntilDestroy()
@Component({
  selector: 'multiselect-autocomplete',
  templateUrl: './multiselect-autocomplete.component.html',
})
export class MultiselectAutocompleteComponent implements OnInit {

  /** Chosen values. */
  @Output()
  public readonly chosenItems = new EventEmitter<{ key: string; data: Array<string>; }>();

  /** Filter changed. */
  @Output()
  public readonly filterChanged = new EventEmitter<string>();

  /** Scroll. */
  @Output()
  public readonly scrollEvent = new EventEmitter<undefined>();

  /** Select placeholder. */
  @Input()
  public readonly placeholder = 'Select Data';

  /** Select items data. */
  @Input()
  public data$?: Observable<Array<string>>;

  /** Select key. */
  @Input()
  public readonly key = '';

  /** Select control. */
  public readonly searchControl = new FormControl<string>('', { nonNullable: true });

  /** Selected data. */
  public readonly selectedItems: Array<SelectItem> = [];

  /** Select items. */
  public items$!: Observable<Array<SelectItem>>;

  public constructor() {
    this.searchControl.valueChanges.pipe(
      filter(filterString => filterString !== undefined),
      tap(filterString => {
        this.filterChanged.emit(filterString);

        // this.items$ = this.initItems();
      }),
      untilDestroyed(this),
    ).subscribe();
  }

  /** @inheritDoc */
  public ngOnInit(): void {
    if (this.data$ === undefined) {
      throw new Error('Data must be provided');
    }
    this.items$ = this.initItems();
  }

  private initItems(): Observable<SelectItem[]> {
    if (this.data$ === undefined) {
      throw new Error('Data must be provided');
    }
    return this.data$.pipe(
      map(data => data.map(item => {
        const isSelected = this.selectedItems.includes({
          value: item,
          isSelected: true,
        });
        return {
          value: item,
          isSelected,
        };
      })),
      scan((acc, value) => acc.concat(value)),
      untilDestroyed(this),
    );
  }

  /**
   * Toggle selection on item.
   * @param item Select item.
   */
  public toggleSelection(item: SelectItem): void {
    item.isSelected = !item.isSelected;

    if (item.isSelected) {
      this.selectedItems.push(item);
    } else {
      const i = this.selectedItems.findIndex(value => value.value === item.value);
      this.selectedItems.splice(i, 1);
    }

    this.emitAdjustedData();
  }

  /** Emmit selected items. */
  public emitAdjustedData(): void {
    const results: Array<string> = [];
    this.selectedItems.forEach((data: SelectItem) => {
      results.push(data.value);
    });
    this.chosenItems.emit({ key: this.key, data: results });
  }

  /**
   * Handle remove button clicked.
   * @param item Select item.
   */
  public onRemoveClicked(item: SelectItem): void {
    this.toggleSelection(item);
  }

  public onScroll() {
    this.scrollEvent.emit();
  }
}

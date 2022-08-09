import { Component, ChangeDetectionStrategy, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, catchError, tap } from 'rxjs';

import { FileService } from '../../../core/services/file.service';

/** Loading spinner. */
@UntilDestroy()
@Component({
  selector: 'image-upload',
  templateUrl: 'image-upload.component.html',
  styleUrls: ['image-upload.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageUploadComponent implements OnInit {

  /** Provided image url. */
  @Input()
  public imageUrl?: string;

  /** Image uploaded event. */
  @Output()
  public imageUploaded = new EventEmitter<string>();

  /** Image url. */
  public imageUrl$ = new BehaviorSubject<string | null>(null);

  /** Error. */
  public error$ = new BehaviorSubject<boolean>(false);

  public constructor(
    private readonly fileService: FileService,
  ) {
  }

  /** @inheritDoc */
  public ngOnInit(): void {
    if (this.imageUrl !== undefined) {
      this.imageUrl$.next(this.imageUrl);
    }
  }

  /**
   * Process choice file.
   * @param imageInput Image input.
   */
  public processFile(imageInput: HTMLInputElement): void {
    if (imageInput.files === null) {
      return;
    }
    const file: File = imageInput.files[0];
    this.fileService.uploadFile(
      file,
    ).pipe(
      tap(imageUrl => {
        this.imageUrl$.next(imageUrl);
        this.imageUploaded.emit(imageUrl);
      }),
      catchError((error: unknown) => {
        this.error$.next(true);
        throw error;
      }),
      untilDestroyed(this),
    )
      .subscribe();
  }
}

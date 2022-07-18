import { getElementOrRaiseError } from '../../../utils/query';

/** The class is used to work with the anime search input. */
export class AnimeSearch {
  /** Submit button. */
  private readonly submitButton: HTMLButtonElement;

  /** Input line. */
  private readonly inputElement: HTMLInputElement;

  /** Submit button click handler. */
  public submitCallBack: () => void;

  public constructor(submitCallback: () => void) {
    this.submitButton = getElementOrRaiseError('.searching__button');
    this.inputElement = getElementOrRaiseError('.searching__input');
    this.submitCallBack = submitCallback;
    this.setEventListener();
  }

  /** Get input content. */
  public getSearchString(): string {
    return this.inputElement.value;
  }

  /** Set event listener. */
  public setEventListener(): void {
    this.submitButton.addEventListener('click', evt => {
      evt.preventDefault();
      this.submitCallBack();
    });
  }
}

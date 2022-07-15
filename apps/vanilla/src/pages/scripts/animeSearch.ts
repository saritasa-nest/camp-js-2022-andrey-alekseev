import { getElementOrRaiseError } from '../../../utils/query';

/** The class is used to work with the anime search input. */
export class AnimeSearch {
  /** Submit button. */
  public submitBtn: Element;

  /** Input line. */
  public inputLine: HTMLInputElement;

  /** Submit button click handler. */
  public btnClickCallBack: Function;

  public constructor(inputSelector: string, btnSelector: string, btnClickCallback: Function) {
    this.submitBtn = getElementOrRaiseError(btnSelector);
    this.inputLine = getElementOrRaiseError(inputSelector);
    this.btnClickCallBack = btnClickCallback;
    this.setEventListener();
  }

  /** Get input content. */
  public getInputLineContent(): string | null {
    return this.inputLine.value;
  }

  /** Set event listener. */
  public setEventListener(): void {
    this.submitBtn.addEventListener('click', () => {
      this.btnClickCallBack(this.getInputLineContent());
    });
  }
}

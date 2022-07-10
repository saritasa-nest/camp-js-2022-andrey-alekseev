const MODAL_OPENED_CLASS = 'modal-window_opened';
const MODAL_CONTENT_CLASS = 'modal-window__content';

/**
 * Open modal and close it on click.
 * @param modalBlock Modal block.
 */
export function openModal(modalBlock: Element): void {
  modalBlock.classList.add(MODAL_OPENED_CLASS);
  document.body.addEventListener('click', handleBodyClick, true);

  /**
   * Close modal on click outside modal content.
   * @param event Click event.
   */
  function handleBodyClick(event: Event): void {
    const { target } = event;
    if (target === null) {
      return;
    }
    const modalContent = modalBlock.querySelector(`.${MODAL_CONTENT_CLASS}`);
    if (modalContent === null) {
      throw new Error('Modal has no content');
    }
    const isClickOnModal = modalContent.contains(target as HTMLElement);
    if (!isClickOnModal) {
      modalBlock.classList.remove(MODAL_OPENED_CLASS);
      document.body.removeEventListener('click', handleBodyClick);
    }
  }
}

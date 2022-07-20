import {
  DEFAULT_BUTTON_CLASS,
  MODAL_WINDOW_APPROVE_CLASS,
  MODAL_WINDOW_IMAGE_CLASS,
} from './constants';

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
    const modalContent = getModalContent(modalBlock);
    const isClickOnModal = modalContent.contains(target as HTMLElement);
    if (!isClickOnModal) {
      modalBlock.classList.remove(MODAL_OPENED_CLASS);
      document.body.removeEventListener('click', handleBodyClick);
    }
  }
}

/**
 * Initialize modal with image.
 * @param modalBlock Modal window block.
 * @param imageUrl Image URL.
 */
export function initImageModal(modalBlock: Element, imageUrl: string): void {
  const modalContent = getModalContent(modalBlock);
  const imageElement = document.createElement('img');
  imageElement.src = imageUrl;
  imageElement.classList.add(MODAL_WINDOW_IMAGE_CLASS);
  imageElement.alt = '';

  modalContent.innerHTML = '';
  modalContent.append(imageElement);
}

/**
 * Initialize modal with approve button.
 * @param modalBlock Modal window block.
 * @param approveCallback Callback that must be called on approve click.
 * @param approveText Text that must be shown in modal window.
 * @param buttonText Text in button.
 */
export function initApproveModal(
  modalBlock: Element,
  approveText: string,
  buttonText: string,
  approveCallback: () => void,
): void {
  const modalContent = getModalContent(modalBlock);
  const approveBlock = document.createElement('div');
  approveBlock.classList.add(MODAL_WINDOW_APPROVE_CLASS);
  approveBlock.textContent = approveText;

  const approveButton = document.createElement('button');
  approveButton.innerText = buttonText;
  approveButton.classList.add(DEFAULT_BUTTON_CLASS);
  approveButton.addEventListener('click', approveCallback);

  approveBlock.append(approveButton);
  modalContent.innerHTML = '';
  modalContent.append(approveBlock);
}

/**
 * Get modal content element or raise error.
 * @param modalBlock Modal window block.
 */
function getModalContent(modalBlock: Element): Element {
  const modalContent = modalBlock.querySelector(`.${MODAL_CONTENT_CLASS}`);
  if (modalContent !== null) {
    return modalContent;
  }
  throw new Error('Modal has no content');
}

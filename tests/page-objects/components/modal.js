import { PageObject, selector } from 'fractal-page-object';
import { click } from '@ember/test-helpers';

export default class Modal extends PageObject {
  static SELECTOR = '[data-test-modal]';
  constructor(elementSelector) {
    super(elementSelector || Modal.SELECTOR);
  }
  title = selector('[data-test-modal-title]');
  content = selector('[data-test-modal-content]');
  footer = selector('[data-test-modal-footer]');
  closeButton = selector('[data-test-modal-close]');

  async closeModal() {
    await click(this.closeButton.element);
  }
}

import { PageObject, selector } from 'fractal-page-object';
import { click } from '@ember/test-helpers';

export default class Notification extends PageObject {
  static SELECTOR = '[data-test-notification]';
  constructor(elementSelector) {
    super(elementSelector || Notification.SELECTOR);
  }

  closeButton = selector('[data-test-notification-close]');

  async close() {
    await click(this.closeButton.element);
  }
}

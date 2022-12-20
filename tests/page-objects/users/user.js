import { globalSelector, PageObject, selector } from 'fractal-page-object';
import { click } from '@ember/test-helpers';
import Modal from '../components/modal';
import Notification from '../components/notification';

export default class UserScreen extends PageObject {
  static SELECTOR = '[data-test-user-screen="root"]';
  constructor() {
    super(UserScreen.SELECTOR);
  }

  archiveFailureNotification = new Notification(
    '[data-test-user-screen="archive-failure-notify"]'
  );
  backLink = selector('[data-test-user-screen="back-link"]');
  userImage = selector('[data-test-user-screen="user-image"]');
  userName = selector('[data-test-user-screen="user-name"]');
  userValue = selector('[data-test-user-screen="user-value"]');
  archiveButton = selector('[data-test-user-screen="archive-button"]');
  confirmationModal = new Modal(
    `[data-test-user-screen="archive-confirmation-modal"]`
  );
  archiveConfirmButton = globalSelector(
    '[data-test-user-screen="archive-confirm-button"]'
  );
  archiveCancelButton = globalSelector(
    '[data-test-user-screen="archive-cancel-button"]'
  );

  async goBack() {
    await click(this.backLink.element);
  }

  async toggleArchive() {
    await click(this.archiveButton.element);
  }
  async confirmArchiveAttempt() {
    await click(this.archiveConfirmButton.element);
  }
  async cancelArchiveAttempt() {
    await click(this.archiveCancelButton.element);
  }
}

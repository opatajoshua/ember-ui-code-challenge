import { PageObject, selector } from 'fractal-page-object';
import { click } from '@ember/test-helpers';

export default class UsersIndexScreen extends PageObject {
  static SELECTOR = '[data-test-users-index-screen="root"]';
  constructor() {
    super(UsersIndexScreen.SELECTOR);
  }

  usersListWrapper = selector(`[data-test-users-index-screen="users-list"]`);

  userColumns = selector(
    '[data-test-users-index-screen="user-item"]',
    class extends PageObject {
      link = selector('[data-test-users-index-screen="user-link"]');
      image = selector('[data-test-users-index-screen="user-image"]');
      name = selector('[data-test-users-index-screen="user-name"]');
    }
  );

  async openUserPage(index) {
    await click(this.userColumns[index].link.element);
  }
}

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { getUserRawData, setupUserMockup } from '../../fixtures/users';
import UserScreen from '../../page-objects/users/user';

const screen = new UserScreen();

module('Acceptance | users/user', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  setupUserMockup(hooks);

  const userId = 1;
  const userJson = getUserRawData(userId);

  test('can visit /users/:user_id and go back', async function (assert) {
    await visit(`/users/${userId}`);
    assert.equal(currentURL(), `/users/${userId}`);

    await screen.goBack();
    assert.equal(currentURL(), `/users`);
  });

  test('renders user details', async function (assert) {
    await visit(`/users/${userId}`);

    assert.equal(
      screen.userImage.element.src.includes(userJson.image),
      true,
      'shows user image'
    );
    assert
      .dom(screen.userName.element)
      .hasText(userJson.name, 'shows user name');
    assert
      .dom(screen.userValue.element)
      .containsText(false, 'shows default archive value');
  });

  test('archive button toggles archive value', async function (assert) {
    await visit(`/users/${userId}`);
    assert
      .dom(screen.userValue.element)
      .containsText(false, 'shows default archive value');

    await screen.toggleArchive();
    assert
      .dom(screen.userValue.element)
      .containsText(false, 'toggle does not instantly change value');
    assert
      .dom(screen.confirmationModal.element)
      .exists('toggle button pops up modal');

    await screen.cancelArchiveAttempt();
    assert
      .dom(screen.confirmationModal.element)
      .doesNotExist('cancel button closes modal');
    assert
      .dom(screen.userValue.element)
      .containsText(false, 'canceling confirmation does not change value');

    await screen.toggleArchive();
    await screen.confirmArchiveAttempt();
    assert
      .dom(screen.userValue.element)
      .containsText(true, 'confirm confirmation modal changes archive value');
  });

  test('failed archive shows notification', async function (assert) {
    this.server.patch(
      `api/users/:user_id`,
      () => {
        return 'You do not have permission to perform this action';
      },
      500
    );
    await visit(`/users/${userId}`);
    assert
      .dom(screen.userValue.element)
      .containsText(false, 'shows default archive value');
    await screen.toggleArchive();
    await screen.confirmArchiveAttempt();
    assert
      .dom(screen.archiveFailureNotification.element)
      .exists('shows failure notification');
    assert
      .dom(screen.archiveFailureNotification.element)
      .containsText(
        'You do not have permission to perform this action',
        'Shows backend error on notification'
      );
  });
});

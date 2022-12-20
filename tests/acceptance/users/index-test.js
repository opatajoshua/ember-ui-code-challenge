import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { getUsersRawList, setupUserMockup } from '../../fixtures/users';
import UsersIndexScreen from '../../page-objects/users/index';

const screen = new UsersIndexScreen();
const users = getUsersRawList();
const testUserIndex = 3;
const testUser = users[testUserIndex];

module('Acceptance | users/index', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  setupUserMockup(hooks);

  test('visiting /users', async function (assert) {
    await visit('/users');

    assert.equal(currentURL(), '/users');
  });

  test('can see users list', async function (assert) {
    await visit('/users');

    assert
      .dom(screen.usersListWrapper.element)
      .exists('Can see user list container');
    assert.equal(
      screen.userColumns.length,
      users.length,
      'Shows expected number of users'
    );

    assert.true(
      screen.userColumns[testUserIndex].image.element.src.includes(
        testUser.image
      ),
      "Can see each users' image"
    );
    assert
      .dom(screen.userColumns[testUserIndex].element)
      .hasText(testUser.name, "Can see each users' name");
  });

  test('can open user details page', async function (assert) {
    await visit('/users');
    assert.equal(currentURL(), '/users', 'routes to index page');

    await screen.openUserPage(testUserIndex);
    assert.equal(
      currentURL(),
      `/users/${testUser.id}`,
      "routes to correct user's page after link click"
    );
  });
});

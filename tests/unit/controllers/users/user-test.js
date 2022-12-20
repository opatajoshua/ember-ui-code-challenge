import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { setupUserMockup } from '../../../fixtures/users';

module('Unit | Controller | users/user', function (hooks) {
  setupTest(hooks);
  setupMirage(hooks);
  setupUserMockup(hooks);

  test('toggleValue changes user archive value', async function (assert) {
    let store = this.owner.lookup('service:store');
    const model = await store.findRecord('user', 1);

    let controller = this.owner.lookup('controller:users/user');
    assert.ok(controller);

    controller.model = model;
    // making sure user model start with a false value first
    // so we can trust the change of value by toggleValue task call
    assert.equal(model.value, false, 'model starts with a false value');

    await controller.toggleValue.perform();
    assert.equal(
      model.value,
      true,
      'toggleValue action changes the value of a user model'
    );
  });
});

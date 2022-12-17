import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';
import Notification from '../../page-objects/components/notification';

const notification = new Notification();

module('Integration | Component | notification', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.close = sinon.spy();

    await render(hbs`
      <Notification
        @type="danger"
        @close={{this.close}}
      >
        Some notification content
      </Notification>
    `);

    assert.dom(notification.element).exists('Notification is rendered');
    assert
      .dom(notification.element)
      .hasText('Some notification content', 'renders notification content');
    assert.dom(notification.closeButton.element).exists('show close button');
    await notification.close();
    assert.true(this.close.calledOnce, 'close button closes notification');
  });
});

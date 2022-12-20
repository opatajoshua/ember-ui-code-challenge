import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';
import Modal from '../../page-objects/components/modal';

const modal = new Modal();

module('Integration | Component | modal', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.closeModal = sinon.spy();

    await render(hbs`
      <Modal
        @title="Confirmation!"
        @closeModal={{ this.closeModal }}
        as | modal |
      >
        <modal.content>
          Some example content
        </modal.content>
        <modal.footer>
          this is the footer
        </modal.footer>
      </Modal>
    `);

    assert.dom(modal.element).exists('Modal is rendered');
    assert
      .dom(modal.content.element)
      .hasText('Some example content', 'renders modal content');
    assert
      .dom(modal.footer.element)
      .hasText('this is the footer', 'renders modal footer');
    assert.dom(modal.closeButton.element).exists('show close button');
    await modal.closeModal();
    assert.true(this.closeModal.calledOnce, 'close button closes modal');
  });
});

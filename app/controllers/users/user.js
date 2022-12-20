import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { dropTask } from 'ember-concurrency';

export default class UsersUserController extends Controller {
  /** for showing confirmation modal */
  @tracked showArchiveConfirm = false;

  /** for displaying failed error */
  @tracked valueChangeError = null;

  /**
   * action to toggle archive value
   */
  toggleValue = dropTask(async () => {
    this.showArchiveConfirm = false;

    this.model.changeValue();
    await this.model
      .save()
      .then(() => {
        this.valueChangeError = '';
      })
      .catch((error) => {
        this.valueChangeError = error.errors[0].detail;
        this.model.rollbackAttributes();
      });
  });
}

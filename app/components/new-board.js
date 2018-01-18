import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  tilesAdapter: service(),

  click(e) {
    e.preventDefault();

    const tilesAdapter = this.get('tilesAdapter');
    tilesAdapter.newTiles();
    tilesAdapter.saveTiles();
  }
});

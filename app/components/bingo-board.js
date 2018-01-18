import Component from '@ember/component';
import { computed } from '@ember/object';
import { mapBy, and, or, alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

const ROW_SIZE = 5;
const COLUMN_SIZE = 5;
const DIAGONAL_SIZE = 5;

const ESCAPE_KEYCODE = 27;

export default Component.extend({
  classNames: ['bingo-board'],

  tilesAdapter: service(),

  /*  @title tiles
      @dev A collection of Ember objects that represent the buzzword
      and its selected state. Representing buzzword tiles as an array
      makes it easier to calculate a Bingo by rows and columns with
      division and modulos. Tiles come from tilesAdapter which abstracts
      the state management and caching of tiles to localStorage
  */
  tiles: alias('tilesAdapter.tiles'),
  tilesSelected: mapBy('tiles', 'selected'),

  win: or('_winByRow', '_winByColumn', '_winByDiagonal'),
  showWin: false,

  shouldShowWin: and('win', 'showWin'),

  _winByRow: computed('tilesSelected', {
    get() {
      const tilesSelected = this.get('tilesSelected');
      let bingo = 0;
      let index = 0;

      while (index < tilesSelected.length) {
        if (tilesSelected[index]) {
          bingo += 1;
          if (bingo === ROW_SIZE) {
            return true;
          }
          index += 1;
        } else {
          bingo = 0;
          // set index to beginning of next row
          index = (Math.floor(index / ROW_SIZE) + 1) * ROW_SIZE;
        }
      }
      return false;
    }
  }),

  _winByColumn: computed('tilesSelected', {
    get() {
      const tilesSelected = this.get('tilesSelected');
      let bingo = 0;
      let index = 0;

      while (index < tilesSelected.length) {
        if (tilesSelected[index]) {
          bingo += 1;
          if (bingo === COLUMN_SIZE) {
            return true;
          }
          index += COLUMN_SIZE;
        } else {
          bingo = 0;
          const columnIndex = index % COLUMN_SIZE;

          if (columnIndex === COLUMN_SIZE - 1) {
            return false;
          }
          // set index to beginning of next column
          index = columnIndex + 1;
        }
      }
    }
  }),

  _winByDiagonal: computed('tilesSelected', {
    get() {
      const tilesSelected = this.get('tilesSelected');
      const diagonalIndices = [
        [0, 6, 12, 18, 24],
        [4, 8, 12, 16, 20]
      ]
      let bingo = 0;

      for (let i = 0; i < diagonalIndices.length; i++) {
        const indices = diagonalIndices[i];

        for (let j = 0; j < indices.length; j++) {
          const diagonalIndex = indices[j];

          if (tilesSelected[diagonalIndex]) {
            bingo += 1;
          } else {
            bingo = 0;
            break;
          }
        }
        if (bingo === DIAGONAL_SIZE) {
          return true;
        }
      }
      return false;
    }
  }),

  actions: {
    toggleTileSelect(tile) {
      const selected = tile.get('selected');
      tile.set('selected', !selected);

      this.get('tilesAdapter').saveTiles();

      const win = this.get('win');
      this.set('showWin', win);
    }
  }
});

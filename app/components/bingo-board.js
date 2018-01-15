import Component from '@ember/component';
import { getBuzzword } from '../utils/buzzwords';
import EmberObject, { computed } from '@ember/object';
import { mapBy, and } from '@ember/object/computed';

const TILE_COUNT = 25;
const ROW_SIZE = 5;
const COLUMN_SIZE = 5;
const DIAGONAL_SIZE = 5;

export default Component.extend({
  classNames: ['bingo-board'],
  /*  A collection of Ember objects that represent the buzzword
      and its selected state. Representing buzzword tiles as an array
      makes it easier to calculate a Bingo by rows and columns with
      division and modulos.
  */
  win: false,
  showWin: false,

  shouldShowWin: and('win', 'showWin'),

  tiles: computed({
    get() {
      return [];
    }
  }),

  tilesSelected: mapBy('tiles', 'selected'),

  init() {
    this._super(...arguments);

    this._buildTiles();
  },

  _buildTiles() {
    const tiles = [];

    for (let i = 0; i < TILE_COUNT; i++) {
      let tile;
      // free word in the middle of the board
      if (i === 12) {
        tile = EmberObject.create({
                  word: 'ember',
                  selected: true,
                  free: true
                });
      } else {
        tile = EmberObject.create({
                  word: getBuzzword(),
                  selected: false
                });
      }
      tiles.push(tile);
    }
    this.set('tiles', tiles);
  },

  _checkForBingo() {
    const win = this._winByDiagonal() || this._winByRow() || this._winByColumn();

    this.set('win', win);
    this.set('showWin', win);
    return win;
  },

  _winByRow() {
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
  },

  _winByColumn() {
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
  },

  _winByDiagonal() {
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
  },

  actions: {
    toggleTileSelect(tile) {
      const selected = tile.get('selected');
      tile.set('selected', !selected);
      this._checkForBingo();
    }
  }
});

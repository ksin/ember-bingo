import Service from '@ember/service';
import { inject as service } from '@ember/service';
import EmberObject, { computed } from '@ember/object';
import { getBuzzword } from '../utils/buzzwords';

const TILE_COUNT = 25;
const TILES_LOCAL_STORAGE_KEY = 'EMBER_BINGO_TILES';

/*
  @title Titles Adapter Service
  @dev This service manages the cache fetching and updating of tile objects from localStorage.
  It holds the tiles state for the bingo board.
*/
export default Service.extend({
  localStorage: service(),

  tiles: computed({
    get() {
      return [];
    }
  }),

  // Check to see if tiles are already in localStorage. If so, use them, otherwise, build a new collection of tiles.
  init() {
    this._super(...arguments);

    let tiles = this.get('localStorage').getItem(TILES_LOCAL_STORAGE_KEY);

    if (!tiles) {
      this.newTiles();
      return
    }

    tiles = tiles.map((tile) => {
      return EmberObject.create(tile);
    });
    this.set('tiles', tiles);
  },

  newTiles() {
    const tiles = [];

    for (let i = 0; i < TILE_COUNT; i++) {
      let tile;
      // free word in the middle of the board
      if (i === 12) {
        tile =  EmberObject.create({
                  word: 'ember',
                  selected: true,
                  free: true
                });
      } else {
        tile =  EmberObject.create({
                  word: getBuzzword(),
                  selected: false
                });
      }
      tiles.push(tile);
    }

    this.set('tiles', tiles);
  },

  saveTiles() {
    const tiles = this.get('tiles');

    this.get('localStorage').setItem(TILES_LOCAL_STORAGE_KEY, tiles);
  }
});

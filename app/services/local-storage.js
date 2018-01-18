import Service from '@ember/service';
import { computed } from '@ember/object';

export default Service.extend({
  localStorage: computed({
    get() {
      return window.localStorage;
    }
  }),

  setItem(key, data) {
    const value = JSON.stringify(data);
    this.get('localStorage').setItem(key, value);
  },

  getItem(key) {
    const value = this.get('localStorage').getItem(key);
    return JSON.parse(value);
  }
});

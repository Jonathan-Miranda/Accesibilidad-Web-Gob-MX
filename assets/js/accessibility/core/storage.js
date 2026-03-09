const KEY = 'theme-a11y-settings';

export const storage = {
  get() {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  },

  set(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
  },

  clear() {
    localStorage.removeItem(KEY);
  }
};
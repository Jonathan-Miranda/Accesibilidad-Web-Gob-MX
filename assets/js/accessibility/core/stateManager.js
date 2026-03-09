export class StateManager {

  constructor(storage) {
    this.storage = storage;
    this.state = this.storage.get();
    this.features = new Map();
  }

  register(feature) {

    this.features.set(feature.id, feature);

    /* ejecutar init si existe */

    if (typeof feature.init === 'function') {
      feature.init(this.state);
    }

    /* activar si estaba guardado */

    if (this.state[feature.id] && typeof feature.enable === 'function') {
      feature.enable();
    }
  }

  toggle(id) {

    const feature = this.features.get(id);
    if (!feature) return;

    this.state[id] = !this.state[id];

    if (this.state[id]) {
      feature.enable?.();
    } else {
      feature.disable?.();
    }

    this.storage.set(this.state);
  }

  resetAll() {

    this.features.forEach(feature => {

      if (typeof feature.disable === 'function') {
        feature.disable();
      }

      if (typeof feature.reset === 'function') {
        feature.reset();
      }

    });

    this.state = {};
    this.storage.clear();
  }
}
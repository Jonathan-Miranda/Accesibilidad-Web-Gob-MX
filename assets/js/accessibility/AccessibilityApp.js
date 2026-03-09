import { StateManager } from './core/stateManager.js';
import { storage } from './core/storage.js';
// Capacidades diferentes
import { Grayscale } from './features/grayscale.js';
import { Contrast } from './features/contrast.js';
import { HighlightLinks } from './features/highlightLinks.js';
import { CursorSize } from './features/cursorSize.js';
import { ReadingMask } from './features/readingMask.js';
import { ReadingGuide } from './features/readingGuide.js';
import { DyslexiaFont } from './features/dyslexiaFont.js';
import { VerticalSpacing } from './features/verticalSpacing.js';
import { HorizontalSpacing } from './features/horizontalSpacing.js';
import { ScreenReader } from './features/screenReader.js';
import { FontSize } from './features/fontSize.js';

export class AccessibilityApp {
  constructor() {
    this.stateManager = new StateManager(storage);
    this.features = [
      new Grayscale(),
      new Contrast(),
      new HighlightLinks(),
      new CursorSize(),
      new ReadingMask(),
      new ReadingGuide(),
      new DyslexiaFont(),
      new VerticalSpacing(storage),
      new HorizontalSpacing(storage),
      new ScreenReader(),
      new FontSize(storage)
    ];
  }

  init() {

    this.registerFeatures();

    /* Tamaño de texto */
    const font = this.features.find(f => f.id === 'fontSize');
    font?.init();

    /* Espaciado vertical */
    const vertical = this.features.find(f => f.id === 'verticalSpacing');
    vertical?.init();

    if (vertical) {
      this.updateSpacingUI('verticalSpacing', vertical.level);
    }

    /* Espaciado horizontal */
    const horizontal = this.features.find(f => f.id === 'horizontalSpacing');
    horizontal?.init();

    if (horizontal) {
      this.updateSpacingUI('horizontalSpacing', horizontal.level);
    }

    this.bindUI();
    this.initPanel();
    this.syncUI();

  }

  registerFeatures() {
    this.features.forEach(feature => {
      this.stateManager.register(feature);
    });
  }

  bindUI() {
    document.addEventListener('click', (e) => {

      const btn = e.target.closest('button');
      if (!btn) return;

      const action = btn.dataset.a11y;
      // Niveles de espaciado (clic)
      if (btn.dataset.a11yLevel) {

        const id = btn.dataset.a11yLevel;
        const level = Number(btn.dataset.level);

        const feature = this.features.find(f => f.id === id);
        if (!feature) return;

        feature.setLevel(level);

        this.updateSpacingUI(id, level);

        return;
      }
      // verticaL
      if (action === 'verticalSpacing') {

        const feature = this.features.find(f => f.id === 'verticalSpacing');
        if (!feature) return;

        const next = feature.level >= 3 ? 0 : feature.level + 1;

        feature.setLevel(next);

        this.updateSpacingUI('verticalSpacing', next);

        return;
      }
      // horizontal
      if (action === 'horizontalSpacing') {

        const feature = this.features.find(f => f.id === 'horizontalSpacing');
        if (!feature) return;

        const next = feature.level >= 3 ? 0 : feature.level + 1;

        feature.setLevel(next);

        this.updateSpacingUI('horizontalSpacing', next);

        return;
      }
      // Tamaño texto
      if (action === 'fontInc') {
        const font = this.features.find(f => f.id === 'fontSize');
        font?.increase();
        return;
      }

      if (action === 'fontDec') {
        const font = this.features.find(f => f.id === 'fontSize');
        font?.decrease();
        return;
      }

      if (action === 'fontReset') {
        const font = this.features.find(f => f.id === 'fontSize');
        font?.reset();
        return;
      }
      // Restablecer
      if (action === 'reset') {
        this.stateManager.resetAll();

        const font = this.features.find(f => f.id === 'fontSize');
        font?.reset();

        const vertical = this.features.find(f => f.id === 'verticalSpacing');
        vertical?.reset();

        const horizontal = this.features.find(f => f.id === 'horizontalSpacing');
        horizontal?.reset();

        this.updateSpacingUI('verticalSpacing', 0);
        this.updateSpacingUI('horizontalSpacing', 0);

        this.syncUI();
        return;
      }
      // Toggle
      if (!action) return;

      this.stateManager.toggle(action);
      this.updateButtonState(btn, action);
    });
  }

  updateSpacingUI(id, level) {
    const buttons = document.querySelectorAll(`[data-a11y-level="${id}"]`);

    buttons.forEach(btn => {

      const btnLevel = Number(btn.dataset.level);

      if (btnLevel === level) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }

    });
  }

  initPanel() {
    const toggleBtn = document.getElementById('a11y-toggle');
    const panel = document.getElementById('a11y-panel');
    const closeBtn = panel?.querySelector('.a11y-close');

    if (!toggleBtn || !panel) return;

    const openPanel = () => {
      toggleBtn.setAttribute('aria-expanded', 'true');
      panel.hidden = false;
      panel.querySelector('button')?.focus();
    };

    const closePanel = () => {
      toggleBtn.setAttribute('aria-expanded', 'false');
      panel.hidden = true;
      toggleBtn.focus();
    };

    toggleBtn.addEventListener('click', () => {
      const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      expanded ? closePanel() : openPanel();
    });

    closeBtn?.addEventListener('click', closePanel);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !panel.hidden) {
        closePanel();
      }
    });
  }

  updateButtonState(button, id) {
    const isActive = !!this.stateManager.state[id];
    button.setAttribute('aria-pressed', String(isActive));
  }

  syncUI() {
    document.querySelectorAll('[data-a11y]').forEach(btn => {
      const id = btn.dataset.a11y;

      if (id === 'reset') return;

      const isActive = !!this.stateManager.state[id];
      btn.setAttribute('aria-pressed', String(isActive));
    });
  }
}
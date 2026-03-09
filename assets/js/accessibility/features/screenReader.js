export class ScreenReader {
  constructor() {
    this.id = 'screenReader';
    this.active = false;

    this.hoverDelay = 500;
    this.timer = null;

    this.lastText = '';
    this.currentElement = null;

    this.onHover = this.onHover.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  enable() {
    this.active = true;

    document.documentElement.classList.add('a11y-screen-reader');

    document.addEventListener('mouseover', this.onHover);
    document.addEventListener('focusin', this.onFocus);
  }

  disable() {
    this.active = false;

    document.documentElement.classList.remove('a11y-screen-reader');

    document.removeEventListener('mouseover', this.onHover);
    document.removeEventListener('focusin', this.onFocus);

    speechSynthesis.cancel();
    clearTimeout(this.timer);

    this.clearHighlight();
  }

  getReadableElement(el) {

    if (el.tagName === 'IMG') {
      return el;
    }

    return el.closest(
      'label, a, button, li, p, span, h1, h2, h3, h4, h5, h6, input, textarea, select'
    );
  }

  getReadableText(el) {

    if (!el) return '';

    // IMG
    if (el.tagName === 'IMG' && el.alt) {
      return el.alt.trim();
    }

    // aria-label
    const aria = el.getAttribute('aria-label');
    if (aria) return aria.trim();

    // label
    if (el.id) {
      const label = document.querySelector(`label[for="${el.id}"]`);
      if (label?.innerText) {
        return label.innerText.trim();
      }
    }

    // placeholder
    if (el.placeholder) {
      return el.placeholder.trim();
    }

    // inputs con texto
    if (el.value && el.tagName === 'INPUT') {
      return el.value.trim();
    }

    // texto normal
    const text = el.innerText;
    return text ? text.trim() : '';
  }

  highlight(el) {

    this.clearHighlight();

    if (!el) return;

    el.classList.add('a11y-speaking');
    this.currentElement = el;
  }

  clearHighlight() {

    if (this.currentElement) {
      this.currentElement.classList.remove('a11y-speaking');
      this.currentElement = null;
    }
  }

  speak(text) {

    if (!text || text === this.lastText) return;

    this.lastText = text;

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = document.documentElement.lang || 'es-MX';

    speechSynthesis.speak(utterance);
  }

  processElement(target) {

    const el = this.getReadableElement(target);
    if (!el) return;

    const text = this.getReadableText(el);
    if (!text) return;

    this.highlight(el);
    this.speak(text);
  }

  onHover(e) {

    if (!this.active) return;

    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.processElement(e.target);
    }, this.hoverDelay);
  }

  onFocus(e) {

    if (!this.active) return;

    this.processElement(e.target);
  }
}
export class ReadingGuide {
  constructor() {
    this.id = 'readingGuide';
    this.guide = null;
    this.rafId = null;
    this.mouseY = 0;

    this.onMouseMove = this.onMouseMove.bind(this);
    this.render = this.render.bind(this);
  }

  enable() {
    if (this.guide) return;

    this.createGuide();
    document.addEventListener('mousemove', this.onMouseMove);
    this.render();
  }

  disable() {
    document.removeEventListener('mousemove', this.onMouseMove);
    cancelAnimationFrame(this.rafId);

    if (this.guide) {
      this.guide.remove();
      this.guide = null;
    }
  }

  createGuide() {
    this.guide = document.createElement('div');
    this.guide.className = 'a11y-reading-guide';
    document.body.appendChild(this.guide);
  }

  onMouseMove(e) {
    this.mouseY = e.clientY;
  }

  render() {
    if (!this.guide) return;

    this.guide.style.transform = `translateY(${this.mouseY}px)`;
    this.rafId = requestAnimationFrame(this.render);
  }
}
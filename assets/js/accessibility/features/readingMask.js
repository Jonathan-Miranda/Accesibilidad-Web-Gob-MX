export class ReadingMask {
  constructor() {
    this.id = 'readingMask';
    this.mask = null;
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  enable() {
    if (this.mask) return;

    this.createMask();
    document.addEventListener('mousemove', this.onMouseMove);
  }

  disable() {
    document.removeEventListener('mousemove', this.onMouseMove);

    if (this.mask) {
      this.mask.remove();
      this.mask = null;
    }
  }

  createMask() {
    this.mask = document.createElement('div');
    this.mask.className = 'a11y-reading-mask';
    document.body.appendChild(this.mask);
  }

  onMouseMove(e) {
    if (!this.mask) return;

    const y = e.clientY;
    const windowHeight = window.innerHeight;
    const bandHeight = 120; // altura visible

    const topMaskHeight = Math.max(0, y - bandHeight / 2);
    const bottomMaskHeight = Math.max(
      0,
      windowHeight - (y + bandHeight / 2)
    );

    this.mask.style.background = `
      linear-gradient(
        to bottom,
        rgba(0,0,0,0.75) 0px,
        rgba(0,0,0,0.75) ${topMaskHeight}px,
        transparent ${topMaskHeight}px,
        transparent ${y + bandHeight / 2}px,
        rgba(0,0,0,0.75) ${y + bandHeight / 2}px,
        rgba(0,0,0,0.75) 100%
      )
    `;
  }
}
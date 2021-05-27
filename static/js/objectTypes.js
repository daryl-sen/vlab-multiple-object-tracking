class RectBlock {
  constructor(width, height, color, xPos, yPos) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = xPos;
    this.y = yPos;
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.restore();
  }

  translate(x, y) {
    this.x += x;
    this.y += y;
  }
}

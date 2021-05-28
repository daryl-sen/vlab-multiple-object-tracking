class OnscreenObj {
  constructor(width, height, color, xPos, yPos, velocity) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = xPos;
    this.y = yPos;
    this.originalCoords = { x: xPos, y: yPos };
    this.velocity = velocity || { x: 0, y: 0 };
    this.collisionAxis = null;
  }

  translate(x, y) {
    this.x += x;
    this.y += y;
  }

  reposition(x, y) {
    this.x = x;
    this.y = y;
  }

  resetPosition() {
    this.x = this.originalCoords.x;
    this.y = this.originalCoords.y;
  }

  reflectVelocity() {
    if (this.collisionAxis) {
      this.velocity[this.collisionAxis] = -this.velocity[this.collisionAxis];
      this.collisionAxis = null;
    }
  }

  static clearAll(ctx) {
    const { width, height } = ctx.canvas;
    ctx.clearRect(0, 0, width, height);
  }
}

class RectBlock extends OnscreenObj {
  draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.restore();
  }

  checkCollision(ctx, additionalObjs) {
    if (this.x > ctx.canvas.width || this.x + this.width > ctx.canvas.width) {
      this.collisionAxis = "x";
      return true;
    } else if (
      this.y > ctx.canvas.height ||
      this.y + this.height > ctx.canvas.height
    ) {
      this.collisionAxis = "y";
      return true;
    }
    return false;
  }
}

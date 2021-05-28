class OnscreenObj {
  constructor(id, width, height, color, xPos, yPos, velocity) {
    this.id = id;
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = xPos;
    this.y = yPos;
    this.originalCoords = { x: xPos, y: yPos };
    this.velocity = velocity || { x: 0, y: 0 };
    this.collisionAxis = null;
    this.bouncing = { x: false, y: false };
  }

  get xEnd() {
    return this.x + this.width;
  }

  get yEnd() {
    return this.y + this.height;
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

  displayCoordinates(xContainerID, yContainerID) {
    document.getElementById(xContainerID).innerHTML = this.x;
    document.getElementById(yContainerID).innerHTML = this.y;
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

  checkCollision(ctx, collisionZones) {
    if (
      this.x > ctx.canvas.width ||
      this.xEnd > ctx.canvas.width ||
      this.x < 0
    ) {
      this.collisionAxis = "x";
      return true;
    }
    if (
      this.y > ctx.canvas.height ||
      this.yEnd > ctx.canvas.height ||
      this.y < 0
    ) {
      this.collisionAxis = "y";
      return true;
    }

    if (collisionZones) {
      for (const zone of collisionZones.x) {
        if (
          (this.x > zone.start && this.x < zone.end) ||
          (this.xEnd > zone.start && this.xEnd < zone.end)
        ) {
          if (this.bouncing.x) {
            // prevent rapidly switching directions during collision
            return false;
          }
          this.bouncing.x = true;
          this.collisionAxis = "x";
          return true;
        } else {
          this.bouncing.x = false;
        }
      }

      for (const zone of collisionZones.y) {
        if (
          (this.y > zone.start && this.y < zone.end) ||
          (this.yEnd > zone.start && this.yEnd < zone.end)
        ) {
          if (this.bouncing.y) {
            // prevent rapidly switching directions during collision
            return false;
          }
          this.bouncing.y = true;
          this.collisionAxis = "y";
          return true;
        } else {
          this.bouncing.y = false;
        }
      }
    }
    return false;
  }
}

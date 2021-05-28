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
    this.bouncing = false;
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
      for (const zoneID in collisionZones) {
        if (this.id == zoneID) {
          continue;
        }

        const zone = collisionZones[zoneID];

        if (
          this.y > zone.y.end ||
          this.xEnd < zone.x.start ||
          this.yEnd < zone.y.start ||
          this.x > zone.x.end
        ) {
        } else {
          if (this.id === 1) {
            console.log("Collision with:", zoneID);
          }
          return true;
        }

        // const xInRange =
        //   (this.x >= zone.x.start && this.x <= zone.x.end) ||
        //   (this.xEnd >= zone.x.start && this.xEnd <= zone.x.end);
        // const yInRange =
        //   (this.y >= zone.y.start && this.y <= zone.y.end) ||
        //   (this.yEnd >= zone.y.start && this.yEnd <= zone.y.end);

        // if (xInRange && yInRange) {
        //   console.log("Collision!", this.id, zoneID);
        //   return true;
        // }
      }
    }
    return false;
  }
}

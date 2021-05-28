class OnscreenObj {
  constructor(id, width, height, color, xPos, yPos, velocity) {
    this.id = id;
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = xPos;
    this.y = yPos;
    this.midPoint = { x: xPos + width / 2, y: yPos + height / 2 };
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
    if (this.collisionAxis && !this.bouncing) {
      this.velocity[this.collisionAxis] = -this.velocity[this.collisionAxis];
      this.collisionAxis = null;
      this.bouncing = true;
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

  calculateBearing(targetCoords) {
    return (
      (Math.atan2(targetCoords.x - this.x, targetCoords.y - this.y) * 180) /
      Math.PI
    );
  }
}

class RectBlock extends OnscreenObj {
  draw(ctx) {
    ctx.save();
    if (this.bouncing) {
      ctx.fillStyle = "#393939";
    } else {
      ctx.fillStyle = this.color;
    }
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.restore();
  }

  determineDirection(targetCoords) {
    // only needs vertical or horizontal
    const bearing = Math.abs(this.calculateBearing(targetCoords));
    if (bearing < 45 || (bearing > 135 && bearing <= 180)) {
      return "y";
    } else if (bearing > 45 && bearing < 135) {
      return "x";
    } else if (bearing === 45 || bearing === 135) {
      return "both";
    }
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
          this.yEnd < zone.y.start ||
          this.x > zone.x.end ||
          this.xEnd < zone.x.start
        ) {
          // no collision
          this.bouncing = false;
        } else {
          this.collisionAxis = this.determineDirection(zone.midPoint);
          return true;
          // if (this.id == 4) {
          //   console.log("collision!");
          //   console.log(this.determineDirection(zone.midPoint));
          // }
        }
      }
    }
    this.bouncing = false;
    return false;
  }
}

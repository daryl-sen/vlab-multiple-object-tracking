const c1 = document.getElementById("object-layer").getContext("2d");
const c2 = document.getElementById("overlay-layer").getContext("2d");

const obj1 = new RectBlock(1, 100, 100, "#fff", 200, 200, { x: 1, y: 1 });
const obj2 = new RectBlock(2, 100, 100, "#ff3939", 300, 400, { x: 10, y: 20 });

const onscreenObjects = [obj2, obj1];

const animate = () => {
  OnscreenObj.clearAll(c1);
  c1.save();

  // record collision zones for object-object collision detection
  const collisionZones = [];

  // assign all coordinates before drawing, so collisions can be detected
  for (const obj of onscreenObjects) {
    if (obj.checkCollision(c1)) {
      obj.reflectVelocity();
    }
    obj.displayCoordinates(`obj${obj.id}-x`, `obj${obj.id}-y`);
    obj.translate(obj.velocity.x, obj.velocity.y);
  }

  // draw all coordinates
  for (const obj of onscreenObjects) {
    obj.draw(c1);
  }
  window.requestAnimationFrame(animate);
  c1.restore();
};

animate();

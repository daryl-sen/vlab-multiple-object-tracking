const c1 = document.getElementById("object-layer").getContext("2d");
const c2 = document.getElementById("overlay-layer").getContext("2d");

const obj1 = new RectBlock(1, 100, 100, "#fff", 200, 200, { x: 1, y: 1 });
const obj2 = new RectBlock(2, 100, 100, "#ff3939", 400, 200, { x: -1, y: -1 });

const onscreenObjects = [obj2, obj1];

const animate = () => {
  OnscreenObj.clearAll(c1);
  c1.save();

  // record collision zones for object-object collision detection
  const collisionZones = {
    x: [],
    y: [],
  };

  // assign all coordinates before drawing, so collisions can be detected
  for (const obj of onscreenObjects) {
    collisionZones.x.push({ start: obj.x, end: obj.xEnd });
    collisionZones.y.push({ start: obj.y, end: obj.yEnd });
    // obj.displayCoordinates(`obj${obj.id}-x`, `obj${obj.id}-y`);
  }

  console.log(collisionZones);

  // draw all coordinates
  for (const obj of onscreenObjects) {
    if (obj.checkCollision(c1, collisionZones)) {
      obj.reflectVelocity();
    }
    obj.translate(obj.velocity.x, obj.velocity.y);
    obj.draw(c1);
  }
  window.requestAnimationFrame(animate);
  c1.restore();
};

animate();

const c1 = document.getElementById("object-layer").getContext("2d");
const c2 = document.getElementById("overlay-layer").getContext("2d");

const obj1 = new RectBlock(1, 100, 100, "#fff", 100, 50, { x: 3, y: 3 });
const obj2 = new RectBlock(2, 100, 100, "#ff3939", 400, 200, { x: -3, y: -3 });

const onscreenObjects = [obj1, obj2];

const animate = () => {
  OnscreenObj.clearAll(c1);
  c1.save();

  // record collision zones for object-object collision detection
  const collisionZones = {};

  // assign all coordinates before drawing, so collisions can be detected
  for (const obj of onscreenObjects) {
    // obj.displayCoordinates(`obj${obj.id}-x`, `obj${obj.id}-y`);
    obj.translate(obj.velocity.x, obj.velocity.y);
    collisionZones[obj.id] = {
      x: { start: obj.x, end: obj.xEnd },
      y: { start: obj.y, end: obj.yEnd },
    };
  }

  // console.log(collisionZones);
  // draw all coordinates
  for (const obj of onscreenObjects) {
    // debugger;
    const exclusiveZones = { ...collisionZones };
    delete exclusiveZones[obj.id];
    if (obj.checkCollision(c1, exclusiveZones)) {
      obj.reflectVelocity();
    }
    obj.draw(c1);
  }
  window.requestAnimationFrame(animate);
  c1.restore();
};

animate();

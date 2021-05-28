const c1 = document.getElementById("object-layer").getContext("2d");
const c2 = document.getElementById("overlay-layer").getContext("2d");

const obj1 = new RectBlock(1, 100, 100, "#fff", 200, 200, { x: 1, y: 1 });
const obj2 = new RectBlock(2, 100, 100, "#ff3939", 500, 500, { x: 10, y: 50 });

const onscreenObjects = [obj2, obj1];

const animate = () => {
  OnscreenObj.clearAll(c1);
  c1.save();
  for (const obj of onscreenObjects) {
    if (obj.checkCollision(c1)) {
      obj.reflectVelocity();
    }
    obj.displayCoordinates(`obj${obj.id}-x`, `obj${obj.id}-y`);
    obj.translate(obj.velocity.x, obj.velocity.y);
    obj.draw(c1);
  }

  window.requestAnimationFrame(animate);
  c1.restore();
};

animate();

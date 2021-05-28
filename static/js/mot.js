const c1 = document.getElementById("object-layer").getContext("2d");
const c2 = document.getElementById("overlay-layer").getContext("2d");

const config = {
  showFixationCross: true,
  fixationCrossWidth: 10,
  fixationCrossLength: 30,
  fixationCrossColor: "white",
};

if (config.showFixationCross) {
  c2.lineWidth = config.fixationCrossWidth;
  c2.strokeStyle = config.fixationCrossColor;
  c2.beginPath();
  c2.moveTo(
    c2.canvas.width / 2,
    c2.canvas.height / 2 - config.fixationCrossLength
  );
  c2.lineTo(
    c2.canvas.width / 2,
    c2.canvas.height / 2 + config.fixationCrossLength
  );
  c2.moveTo(
    c2.canvas.width / 2 - config.fixationCrossLength,
    c2.canvas.height / 2
  );
  c2.lineTo(
    c2.canvas.width / 2 + config.fixationCrossLength,
    c2.canvas.height / 2
  );
  c2.stroke();
}

const obj1 = new RectBlock(1, 55, 55, "#fff", 300, 50, { x: 3, y: 3 });
const obj2 = new RectBlock(2, 55, 55, "red", 250, 200, { x: -1, y: -1 });
const obj3 = new RectBlock(3, 55, 55, "green", 400, 200, { x: 3, y: -1 });
const obj4 = new RectBlock(4, 55, 55, "blue", 550, 200, { x: 3, y: -1 });
const obj5 = new RectBlock(5, 55, 55, "yellow", 700, 200, { x: 3, y: 3 });

const onscreenObjects = [obj1, obj2, obj3, obj4, obj5];

const animate = () => {
  OnscreenObj.clearAll(c1);
  c1.save();

  // record collision zones for object-object collision detection
  const collisionZones = {};

  // assign all coordinates before drawing, so collisions can be detected
  for (const obj of onscreenObjects) {
    obj.translate(obj.velocity.x, obj.velocity.y);
    collisionZones[obj.id] = {
      x: { start: obj.x, end: obj.xEnd },
      y: { start: obj.y, end: obj.yEnd },
    };
  }

  // draw all coordinates
  for (const obj of onscreenObjects) {
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

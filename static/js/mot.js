const c1 = document.getElementById("object-layer").getContext("2d");
const c2 = document.getElementById("overlay-layer").getContext("2d");

const obj1 = new RectBlock(100, 100, "#fff", 200, 200);
obj1.draw(c1);

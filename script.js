const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const colorsArr = [
  "blue",
  "lightblue",
  "aliceblue",
  "aqua",
  "cornflowerblue",
  "deepskyblue",
  "dodgerblue",
  "lightskyblue",
  "lightsteelblue",
];
let play = true;
let rainDisabled = false;
let waterfallDisabled = false;
let particlesArray = [];
let numberOfParticles,
  animationId,
  size,
  weight,
  directionX,
  directionY,
  color,
  pattern,
  trail,
  position;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.weight = weight;
    this.directionX = directionX;
    this.directionY = directionY;
  }

  update() {
    if (this.y > canvas.height) {
      this.y = 0 - this.size;
      this.weight = 2;
      this.x = Math.random() * canvas.width * 1.3;
    }
    this.weight += 0.05;
    if (pattern === "waterfall") {
      this.y += this.weight;
      color = colorsArr[Math.floor(Math.random() * colorsArr.length)];
    } else {
      this.y -= this.directionY;
    }
    this.x += this.directionX;
  }

  draw() {
    ctx.fillStyle = color;
    ctx.beginPath();
    switch (pattern) {
      case "3rd pattern":
        //new kind of drawing here
        break;

      default:
        ctx.arc(this.x, this.y, this.size, 0, shape);
    }
    ctx.closePath();
    ctx.fill();
  }
}

function init() {
  for (let i = 0; i < numberOfParticles; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    particlesArray.push(new Particle(x, y));
  }
}

function animate() {
  ctx.fillStyle = `rgba(255, 255, 255, ${trail})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    i === particlesArray.length && particlesArray.push(numberOfParticles);
  }
  animationId = requestAnimationFrame(animate);
}

init();
animate();

function playPause(animationId) {
  if (rainDisabled || waterfallDisabled) {
    play ? window.cancelAnimationFrame(animationId) : animate();
    play = !play;
  }
}

function rain() {
  ctx.fillStyle = `rgba(255, 255, 255)`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  document.getElementById("rain").disabled = !rainDisabled;
  rainDisabled = !rainDisabled;
  waterfallDisabled && (waterfallDisabled = false);
  document.getElementById("waterfall").disabled = waterfallDisabled;
  particlesArray = [];
  color = "blue";
  numberOfParticles = 1000;
  size = 5;
  directionX = -1;
  directionY = -2;
  weight = Math.random() * 1 + 1;
  shape = 2;
  pattern = "rain";
  trail = 0.25;
  init();
}

function waterfall() {
  ctx.fillStyle = `rgba(255, 255, 255)`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  document.getElementById("waterfall").disabled = !waterfallDisabled;
  waterfallDisabled = !waterfallDisabled;
  rainDisabled && (rainDisabled = false);
  document.getElementById("rain").disabled = rainDisabled;
  particlesArray = [];
  color = "blue";
  numberOfParticles = 100;
  size = 4;
  directionX = 1.5;
  directionY = 0;
  weight = 4;
  shape = Math.PI * 2;
  pattern = "waterfall";
  trail = 0.01;
  init();
}

function getCursorPosition(canvas, e) {
  const rect = canvas.getBoundingClientRect();
  console.log(rect);
  const x = e.clientX - rect.left;
  console.log(x);
  const y = e.clientY - rect.top;
  console.log(y);
  console.log("x: " + x + "y: " + y);
  return [x, y];
}

document.getElementById("canvas-wrapper").addEventListener("mousedown", function (e) {
  position = getCursorPosition(canvas, e);
  console.log(position);
  let div = document.createElement("div");
  div.style = `background-color:brown;position: absolute;top: ${position[1]}px;left: ${position[0]}px;width: 100px;height: 50px;`;
  document.getElementById("canvas-wrapper").appendChild(div);
});

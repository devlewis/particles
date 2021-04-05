const canvasW = document.getElementById("canvas-wrapper");
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
    this.weight += 0.1;
    if (pattern === "waterfall") {
      this.y += this.weight * 1.75;
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
        //developers may add new kind of drawing here
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

function choose(sim) {
  pattern = sim;
  ctx.fillStyle = `rgba(255, 255, 255)`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  particlesArray = [];
  sim === "rain" ? rain() : waterfall();
}

function rain() {
  document.getElementById("rain").disabled = !rainDisabled;
  rainDisabled = !rainDisabled;
  waterfallDisabled && (waterfallDisabled = false);
  document.getElementById("waterfall").disabled = waterfallDisabled;
  color = "blue";
  numberOfParticles = 1000;
  size = 5;
  directionX = -1;
  directionY = -2;
  weight = Math.random() * 1 + 1;
  shape = 2;
  trail = 0.25;
  init();
}

function waterfall() {
  document.getElementById("waterfall").disabled = !waterfallDisabled;
  waterfallDisabled = !waterfallDisabled;
  rainDisabled && (rainDisabled = false);
  document.getElementById("rain").disabled = rainDisabled;
  color = "blue";
  numberOfParticles = 500;
  size = 4;
  directionX = 4;
  directionY = 0;
  weight = 10;
  shape = Math.PI * 2;
  trail = 0.01;
  init();
}

// new pattern function needed for each new pattern developer wishes to add. variables
// may largely be kept the same.

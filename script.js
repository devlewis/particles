const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let play = true;
let rainDisabled = false;
let waterfallDisabled = false;
let particlesArray = [];
let numberOfParticles;
let animationId;
let size;
let weight;
let directionX;
let directionY;
let color;
let pattern;
let trail;

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
      this.x = Math.random() * canvas.width * 2;
    }
    this.weight += 0.05;
    pattern === "waterfall"
      ? (this.y += this.weight)
      : (this.y -= this.directionY);
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

init();

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
  color = "lightblue";
  numberOfParticles = 100;
  size = 10;
  directionX = 1;
  directionY = 0;
  weight = 2;
  shape = Math.PI * 2;
  pattern = "waterfall";
  trail = 0.01;
  init();
}

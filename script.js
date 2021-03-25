const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const stopButton = document.getElementById("stop");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];
let numberOfParticles;
let animationId;
let size;
let weight;
let directionX;
let directionY;
let color;
let pattern;
const colorsArray = ["red", "orange", "yellow", "brown"];

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
      if (pattern === "leaves") {
        color = colorsArray[Math.floor(Math.random() * colorsArray.length + 1)];
      }
      this.y = 0 - this.size;
      this.weight = weight;
      this.x = Math.random() * canvas.width * 1.8;
    }
    if (this.y) this.weight += Math.random() * 25 + 10;
    this.y -= this.directionY;
    this.x += this.directionX;
  }

  draw() {
    ctx.fillStyle = color;
    ctx.beginPath();
    switch (pattern) {
      case "leaves":
        ctx.moveTo(this.x + 75, this.y + 45);
        ctx.lineTo(this.x + 90, this.y + 25);
        ctx.lineTo(this.x + 80, this.y + 15);
        ctx.lineTo(this.x + 95, this.y + 20);
        ctx.lineTo(this.x + 100, this.y + 0);
        ctx.lineTo(this.x + 105, this.y + 20);
        ctx.lineTo(this.x + 120, this.y + 15);
        ctx.lineTo(this.x + 110, this.y + 25);
        ctx.lineTo(this.x + 125, this.y + 45);
        ctx.lineTo(this.x + 100, this.y + 35);
        break;

      case "waterfall":
        ctx.arc(this.x, this.y, this.size, 0, shape);
        break;

      default:
        ctx.arc(this.x, this.y, this.size, 0, shape);
    }
    //ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); //change last two digits for different shape of particel
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
  ctx.fillStyle = `rgba(255, 255, 255, 0.25)`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  animationId = requestAnimationFrame(animate);
}

animate();

function pause(animationId) {
  window.cancelAnimationFrame(animationId);
}

function start() {
  animate();
}

function rain() {
  particlesArray = [];
  color = "blue";
  numberOfParticles = 1000;
  size = 5;
  directionX = -1;
  directionY = -2;
  weight = 0.5;
  shape = 2;
  pattern = "rain";
  init();
}

function leaves() {
  particlesArray = [];
  numberOfParticles = 3;
  directionX = -1;
  directionY = -2;
  weight = 0.5;
  pattern = "leaves";
  init();
}

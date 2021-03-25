const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let play = true;
let rainDisabled = false;
let particlesArray = [];
let numberOfParticles;
let animationId;
let size;
let weight;
let directionX;
let directionY;
let color;
let pattern;

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
      this.weight = weight;
      this.x = Math.random() * canvas.width * 2;
    }
    if (this.y) this.weight += Math.random() * 25 + 10;
    this.y -= this.directionY;
    this.x += this.directionX;
  }

  draw() {
    ctx.fillStyle = color;
    ctx.beginPath();
    switch (pattern) {
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
    i === particlesArray.length && particlesArray.push(numberOfParticles);
  }
  animationId = requestAnimationFrame(animate);
}

animate();

function playPause(animationId) {
  if (rainDisabled) {
    play ? window.cancelAnimationFrame(animationId) : animate();
    play = !play;
  }
}

function rain() {
  document.getElementById("rain").disabled = !rainDisabled;
  rainDisabled = !rainDisabled;
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

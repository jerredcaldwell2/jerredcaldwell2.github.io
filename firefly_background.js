// firefly_background.js

const canvas = document.getElementById('matrixTunnel');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Particle Class
class Particle {
  constructor() {
    this.reset();
    this.color = Math.random() < 0.5 ? 'rgba(128, 0, 0,' : 'rgba(0, 0, 128,'; // Blue or Orange
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = (Math.random() * 2 + 1) * 3; // Increased size
    this.opacity = 0;
    this.opacityChange = (Math.random() * 0.01) + 0.005;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
    this.fadingIn = true;
  }
  

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Handle opacity fading
    if (this.fadingIn) {
      this.opacity += this.opacityChange;
      if (this.opacity >= 1) {
        this.opacity = 1;
        this.fadingIn = false;
      }
    } else {
      this.opacity -= this.opacityChange;
      if (this.opacity <= 0) {
        this.reset();
      }
    }

    // Wrap around edges
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `${this.color} ${this.opacity})`;
    ctx.fill();
  }
}

// Initialize Particles
for (let i = 0; i < 350; i++) {  // 300 particles now
  particles.push(new Particle());
}

// Animation Loop
function animate() {
  ctx.fillStyle = '#f5f8fa'; // Solid white background each frame
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}
animate();

const canvas = document.getElementById("sparkles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Sparkle {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.alpha = 1;
    this.speedY = Math.random() * 1 + 0.5;
  }

  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  update() {
    this.y -= this.speedY;
    this.alpha -= 0.01;
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    p.update();
    p.draw();
    if (p.alpha <= 0) particles.splice(i, 1);
  });
  requestAnimationFrame(animate);
}

document.getElementById("heartButton").addEventListener("click", () => {
  for (let i = 0; i < 20; i++) {
    particles.push(
      new Sparkle(
        window.innerWidth / 2 + (Math.random() - 0.5) * 200,
        window.innerHeight / 2,
        Math.random() * 4 + 2,
        `hsl(${Math.random() * 60 + 300}, 100%, 75%)`
      )
    );
  }
});

animate();

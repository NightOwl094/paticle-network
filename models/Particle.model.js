import { Line } from "./Line.model.js";
import { computeDistance, randomFloatBetween } from "../utils.js";

export class Particle {
  detectionScope = 400;

  constructor({ ctx, x, y, radius, velocity }) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocity = velocity;
  }

  draw() {
    const ctx = this.ctx;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
  }

  animate() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.draw();
  }

  invalidate({ limit }) {
    const { width, height } = limit;
    const isOverScreenX = this.x < 0 || this.x > width;
    const isOverScreenY = this.y < 0 || this.y > height;
    const isOverScreen = isOverScreenX || isOverScreenY;

    if (isOverScreen) {
      this.x = randomFloatBetween(0, width);
      this.y = randomFloatBetween(0, height);
    }
  }

  connectParticles(particles) {
    particles.forEach((it) => {
      const distance = computeDistance(it.x, it.y, this.x, this.y);
      const isDetected = distance < this.detectionScope;

      if (isDetected) {
        const from = { x: this.x, y: this.y };
        const to = { x: it.x, y: it.y };
        const opacity = 1 - distance / this.detectionScope;

        new Line({ from, to }).draw(this.ctx, opacity);
      }
    });
  }
}

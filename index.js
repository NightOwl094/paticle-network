import { Particle } from "./models/Particle.model.js";
import { randomFloatBetween } from "./utils.js";

// canvas
const canvas = document.querySelector("canvas");
const initCanvasSize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};
initCanvasSize();
const ctx = canvas.getContext("2d");

// mouse
const mouse = { x: 0, y: 0, isActive: false };

// particles
const TOTAL = 30;
const particles = Array.from(
  { length: TOTAL },
  () =>
    new Particle({
      ctx,
      x: randomFloatBetween(0, window.innerWidth),
      y: randomFloatBetween(0, window.innerHeight),
      radius: randomFloatBetween(0.5, 2),
      velocity: {
        x: randomFloatBetween(-2, 2),
        y: randomFloatBetween(-2, 2),
      },
    })
);

// render
const render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const detectionTargets = mouse.isActive ? particles.concat(mouse) : particles;

  particles.forEach((it) => {
    it.connectParticles(detectionTargets);
    it.animate();
    it.invalidate({
      limit: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  });
  window.requestAnimationFrame(render);
};

// subscribe events
window.addEventListener("resize", initCanvasSize);
canvas.addEventListener("mouseenter", () => (mouse.isActive = true));
canvas.addEventListener("mouseleave", () => (mouse.isActive = false));
canvas.addEventListener("mousemove", ({ clientX, clientY }) => {
  mouse.x = clientX;
  mouse.y = clientY;
});

render();

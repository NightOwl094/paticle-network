export class Line {
  constructor({ from, to }) {
    this.from = from;
    this.to = to;
  }

  draw(ctx, opacity) {
    ctx.beginPath();
    ctx.moveTo(this.from.x, this.from.y);
    ctx.lineTo(this.to.x, this.to.y);

    ctx.strokeStyle = `rgba(254,231,21,${opacity})`;
    ctx.lineWidth = 1;

    ctx.stroke();
  }
}

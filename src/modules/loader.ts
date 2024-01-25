export class HoldLoader {
  constructor(
    public ctx: CanvasRenderingContext2D,
    public width: number,
    public height: number,
  ) {}

  draw(progress: number, x: number, y: number) {
    this.clear();

    //background for bar
    // this.ctx.beginPath();
    // this.ctx.arc(x - 10, y - 10, 50, 0, 2 * Math.PI);
    // this.ctx.strokeStyle = "lightgray";
    // this.ctx.lineWidth = 10;
    // this.ctx.stroke();

    //foreground for bar
    this.ctx.beginPath();
    this.ctx.arc(x, y, 50, 0, progress * 2 * Math.PI);
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 10;
    this.ctx.stroke();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}

export class Ball {
  constructor(x, y, size) {
    this.x = x
    this.y = y
    this.size = size / 2
  }

  draw(ctx, x, y) {
    this.ctx = ctx
    this.sx = x
    this.sy = y
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    this.ctx.strokeStyle = 'black'
    this.ctx.beginPath()
    this.ctx.arc(this.sx, this.sy, this.size, 0, Math.PI * 2)
    this.ctx.stroke()
  }
}

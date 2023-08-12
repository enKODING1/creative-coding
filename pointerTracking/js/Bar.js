export class Bar {
  constructor(x, y) {
    this.x = x
    this.y = y

    this.angle = 0
  }

  draw(ctx) {
    this.createBar(ctx)
  }

  createBar(ctx) {
    ctx.strokeStyle = 'rgba(255,0,0,0.4)'
    ctx.beginPath()
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle)
    ctx.lineWidth = 5
    ctx.lineCap = 'round'
    ctx.moveTo(-20, 0)
    ctx.lineTo(20, 0)
    ctx.stroke()
    ctx.restore()
  }

  resizePos(x, y) {
    this.x = x
    this.y = y
  }

  update(x, y) {
    this.angle = Math.atan2(this.y - y, this.x - x)
  }
}

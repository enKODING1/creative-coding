export class Line {
  constructor(x, y, angle) {
    this.x = x
    this.y = y
    this.angle = angle
  }

  draw(ctx) {
    const angle = this.angle * (Math.PI / 180)
    const x = Math.sin(angle) * this.radius + this.x
    const y = Math.cos(angle) * this.radius + this.y

    ctx.strokeStyle = 'black'
    ctx.beginPath()
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(x, y)
  }
}

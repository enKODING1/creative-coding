export class Wave {
  constructor(x, y, radius, speed, frequency, yGap) {
    this.x = 0
    this.y = 0
    this.sx = x
    this.sy = y
    this.radius = radius
    this.speed = speed
    this.frequency = frequency
    this.angle = yGap
  }

  draw(ctx) {
    const angle = this.angle * (Math.PI / 180)
    this.x = this.sx
    this.y = Math.sin(angle) * this.radius * this.frequency + this.sy

    // const y = this.y;

    ctx.fillStyle = `rgba(0,0,255,0.3)`
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fill()

    this.angle += this.speed
  }
}

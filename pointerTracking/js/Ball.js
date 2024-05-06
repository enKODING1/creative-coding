export class Ball {
  constructor(x, y, radius, speed) {
    this.x = x
    this.y = y

    this.sx = speed
    this.sy = speed
    this.radius = radius
    this.speed = speed
  }
  draw(ctx) {
    ctx.fillStyle = 'rgba(0,0,0,0.4)'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fill()
  }

  updatePos(x, y) {
    this.x = x
    this.y = y
  }

  crash() {
    const minX = this.radius
    const maxX = window.innerWidth - this.radius

    const minY = this.radius
    const maxY = window.innerHeight - this.radius

    if (this.x < minX || this.x > maxX) {
      this.sx *= -1
    } else if (this.y < minY || this.y > maxY) {
      this.sy *= -1
    }
  }
}

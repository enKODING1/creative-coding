export class Ball {
  constructor(x, y, radius, speed, color) {
    this.x = Math.floor(Math.random() * window.innerWidth)
    this.y = Math.floor(Math.random() * 100) + y
    this.dx = speed
    this.dy = speed
    this.radius = radius
    this.speed = speed
    this.color = color
  }

  draw(ctx, stageWidth, stageHeight) {
    this.x += this.dx
    this.y += this.dy

    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fill()

    this.crash(stageWidth, stageHeight)
  }

  crash(stageWidth, stageHeight) {
    this.weight += 0.5
    this.directionX *= 0.997

    let minX = this.radius
    let minY = this.radius

    let maxX = stageWidth - this.radius
    let maxY = stageHeight - this.radius

    if (this.x < minX || this.x > maxX) {
      this.dx *= -1
      this.x += this.dx
    } else if (this.y < minY || this.y > maxY) {
      this.dy *= -1
      this.y += this.dy
    }
  }
}

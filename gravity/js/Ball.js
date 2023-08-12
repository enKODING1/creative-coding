export class Ball {
  constructor(x, y, radius, speed, color) {
    this.x = Math.floor((Math.random() * window.innerWidth) / 2 + radius)
    this.y = Math.floor((Math.random() * window.innerHeight) / 2 + radius)
    let random = Math.floor(Math.random() * 2) + 1
    this.dx = random == 1 ? speed : -speed
    this.dy = random == 1 ? speed : -speed
    this.weight = 0
    this.directionX = 0
    this.radius = Math.floor(Math.random() * radius + 20)
    this.gravity = 0.9
    this.color = color
  }

  draw(ctx, stageWidth, stageHeight) {
    this.x += this.directionX + this.dx
    this.y += this.weight

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
      this.directionX *= -1
      this.x += this.directionX
    } else if (this.y < minY || this.y > maxY) {
      this.weight *= -0.7
      this.dy *= -1
      this.y += this.weight
    }
  }
}

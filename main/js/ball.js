export class Ball {
  constructor(x, y, radius, speed, color) {
    this.x = Math.floor((Math.random() * window.innerWidth) / 2) + x
    this.y = Math.floor((Math.random() * window.innerHeight) / 2) + y
    this.random = Math.floor(Math.random() * 2) + 1
    this.dx = this.random == 1 ? speed : -speed
    this.dy = speed
    this.radius = Math.random() * radius + 2
    this.speed = Math.random() * speed + 0.3
    this.color = color
    this.ballSize = 0.02
  }

  animate(ctx, stageWidth, stageHeight) {
    if (this.radius >= 3) {
      this.ballSize = -0.02
    } else if (this.radius <= 0.3) {
      this.ballSize = 0.02
    }

    this.x += this.dx
    this.y += this.dy
    this.radius += this.ballSize

    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fill()

    this.crash(stageWidth, stageHeight)
  }

  crash(stageWidth, stageHeight) {
    let minX = this.radius
    let minY = this.radius

    let maxX = stageWidth - this.radius
    let maxY = stageHeight - this.radius

    if (this.x < minX || this.x > maxX) {
      this.dx *= -1
    } else if (this.y < minY || this.y > maxY) {
      this.dy *= -1
    }
  }
}

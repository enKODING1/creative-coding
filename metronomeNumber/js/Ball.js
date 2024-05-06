export class Ball {
  constructor(x, y, radius, speed, angle, sizeup, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.speed = speed
    this.angle = angle
    this.sizeup = sizeup
    this.color = color
    this.number = 0
    this.angleBlock = {
      min: this.angle - 10,
      max: this.angle + 70,
    }
  }

  draw(ctx) {
    const angle = this.angle * (Math.PI / 180)

    const x = Math.cos(angle) * (this.radius + this.sizeup) + this.x
    const y = Math.sin(angle) * (this.radius + this.sizeup) + this.y

    // ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color
    ctx.beginPath()
    // ctx.arc(x, y, this.radius, 0, Math.PI * 2, false);
    ctx.font = `20px serif `
    ctx.strokeText(this.number, x, y)
    ctx.fill()

    if (this.angle < this.angleBlock.min || this.angle > this.angleBlock.max) {
      this.speed *= -1
      this.number++
    }

    this.angle += this.speed
  }

  update(x, y) {
    this.x = x
    this.y = y
  }
}

import { Wave } from './wave.js'

class App {
  constructor() {
    this.canvas = document.createElement('canvas')
    document.body.appendChild(this.canvas)
    this.ctx = this.canvas.getContext('2d')

    this.ball = []
    this.ballCount = 6
    this.xGap = window.innerWidth / (this.ballCount - 1)
    this.radius = 10
    this.speed = 4
    this.frequency = 26
    this.yGap = 0

    for (let i = 0; i < this.ballCount; i++) {
      if (i === 0 || i === this.ballCount - 1) {
        var speed = 0
        var frequency = 0
        var yGap = 0
      } else {
        var speed = 5
        var frequency = 16
        var yGap = 30 * i
      }

      const x = this.xGap * i
      const y = window.innerHeight / 2

      this.ball.push(new Wave(x, y, this.radius, speed, frequency, yGap))
    }

    window.addEventListener('resize', this.resize.bind(this))
    this.resize()
    window.requestAnimationFrame(this.animate.bind(this))
  }
  resize() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this))
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

    for (let i = 0; i < this.ballCount; i++) {
      this.ball[i].draw(this.ctx)
    }

    this.connect(this.ctx)
  }

  connect(ctx) {
    ctx.strokeStyle = 'red'
    ctx.beginPath()

    let prevX = this.ball[0].x
    let prevY = this.ball[0].y
    ctx.moveTo(prevX, prevY)

    for (let i = 1; i < this.ballCount; i++) {
      const cx = (prevX + this.ball[i].x) / 2
      const cy = (prevY + this.ball[i].y) / 2

      ctx.quadraticCurveTo(prevX, prevY, cx, cy)

      prevX = this.ball[i].x
      prevY = this.ball[i].y
    }

    ctx.lineTo(prevX, prevY)
    ctx.lineTo(window.innerWidth, window.innerHeight)
    ctx.lineTo(this.ball[0].x, window.innerHeight)

    ctx.fill()
    ctx.closePath()
  }
}

window.onload = () => {
  new App()
}

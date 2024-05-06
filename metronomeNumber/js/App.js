import { Ball } from './Ball.js'

class App {
  constructor() {
    this.canvas = document.createElement('canvas')
    document.body.appendChild(this.canvas)
    this.ctx = this.canvas.getContext('2d')

    this.ball = []
    this.radius = 5
    let speed = 2
    this.angle = 240
    let sizeup = 0

    for (let i = 0; i < 15; i++) {
      const x = window.innerWidth / 2
      const y = window.innerHeight / 2

      const r = Math.floor(Math.random() * 255)
      const g = Math.floor(Math.random() * 255)
      const b = Math.floor(Math.random() * 255)

      const color = `rgba(${r},${g},${b},0.5)`

      speed -= 0.1
      sizeup += 22
      this.ball.push(
        new Ball(x, y, this.radius, speed, this.angle, sizeup, color)
      )
    }

    this.ballSize = this.ball.length

    window.addEventListener('resize', this.resize.bind(this))
    this.resize()
    window.requestAnimationFrame(this.animate.bind(this))
  }

  resize() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight

    for (let i = 0; i < this.ballSize; i++) {
      const x = window.innerWidth / 2
      const y = window.innerHeight - window.innerHeight / 3

      this.ball[i].update(x, y)
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this))
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    for (let i = 0; i < this.ballSize; i++) {
      this.ball[i].draw(this.ctx)
    }
  }
}

window.onload = () => {
  new App()
}

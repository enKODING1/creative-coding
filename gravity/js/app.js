import { Ball } from './Ball.js'

class App {
  constructor() {
    this.canvas = document.createElement('canvas')
    document.body.appendChild(this.canvas)
    this.ctx = this.canvas.getContext('2d')

    window.addEventListener('resize', this.resize.bind(this))
    this.resize()

    window.requestAnimationFrame(this.animate.bind(this))
    this.ball = new Array()
    let ball_count = Math.floor(Math.random() * 5) + 1

    for (let i = 0; i < ball_count; i++) {
      let r = Math.floor(Math.random() * 255)
      let g = Math.floor(Math.random() * 255)
      let b = Math.floor(Math.random() * 255)
      let color = `rgba(${r},${g},${b},0.4)`
      this.ball.push(new Ball(100, 100, 50, 10, color))
    }
  }
  resize() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }
  animate() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    window.requestAnimationFrame(this.animate.bind(this))

    for (let i = 0; i < this.ball.length; i++) {
      this.ball[i].draw(this.ctx, window.innerWidth, window.innerHeight)
    }
  }
}

window.onload = () => {
  new App()
}

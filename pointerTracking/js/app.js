import { Bar } from './Bar.js'

import { Ball } from './ball.js'

class App {
  constructor() {
    this.canvas = document.createElement('canvas')
    document.body.appendChild(this.canvas)
    this.ctx = this.canvas.getContext('2d')

    this.mousedown = false
    this.x = Math.floor(Math.random() * window.innerWidth)
    this.y = Math.floor(Math.random() * window.innerHeight)
    this.bar = []

    this.row = 20
    this.col = 15

    this.totalSize = this.row * this.col

    for (let i = 1; i < this.col + 1; i++) {
      for (let j = 1; j < this.row + 1; j++) {
        const x = (window.innerWidth / (this.row + 1)) * j
        const y = (window.innerHeight / (this.col + 1)) * i

        this.bar.push(new Bar(x, y))
      }
    }

    this.ball = new Ball(this.x, this.y, 30, 10)

    window.addEventListener('resize', this.resize.bind(this))
    this.resize()
    window.requestAnimationFrame(this.animate.bind(this))
    window.addEventListener('pointermove', this.onMove.bind(this))
    window.addEventListener('pointerdown', this.onDown.bind(this))
    window.addEventListener('pointerup', this.onUp.bind(this))
  }

  onDown() {
    this.mousedown = true
  }

  onMove(e) {
    if (this.mousedown === true) {
      this.x = e.x
      this.y = e.y
    }
  }

  onUp() {
    this.mousedown = false
  }

  resize() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight

    this.count = 0

    for (let i = 1; i < this.col + 1; i++) {
      for (let j = 1; j < this.row + 1; j++) {
        const x = (window.innerWidth / (this.row + 1)) * j
        const y = (window.innerHeight / (this.col + 1)) * i

        this.bar[this.count].resizePos(x, y)
        this.count++
      }
    }
  }
  animate() {
    window.requestAnimationFrame(this.animate.bind(this))
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

    for (let i = 0; i < this.totalSize; i++) {
      this.bar[i].update(this.x, this.y)
      this.bar[i].draw(this.ctx)
      this.connect(i)
    }

    this.ball.updatePos(this.x, this.y)
    this.ball.draw(this.ctx)
  }

  connect(i) {
    const dx = this.bar[i].x - this.x
    const dy = this.bar[i].y - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < 200) {
      // text code
      this.ctx.strokeStyle = 'black'

      this.ctx.lineWidth = 1
      this.ctx.lineCap = 'round'
      this.ctx.beginPath()
      this.ctx.moveTo(this.bar[i].x, this.bar[i].y)
      this.ctx.lineTo(this.x, this.y)
      // this.ctx.lineTo(this.bar[i+1].x,this.bar[i+1].y)
      this.ctx.stroke()
      this.ctx.fill()
    }
  }
}

window.onload = () => {
  new App()
}

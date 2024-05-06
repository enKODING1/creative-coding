import { Shape } from './Shape.js'
import { Bar } from './Bar.js'

class App {
  constructor() {
    this.canvas = document.createElement('canvas')
    document.body.appendChild(this.canvas)
    this.ctx = this.canvas.getContext('2d')

    window.addEventListener('resize', this.resize.bind(this))
    this.resize()

    window.requestAnimationFrame(this.animate.bind(this))

    //bar
    this.barWidth = 150
    this.barHeight = 80
    this.barX = window.innerWidth / 2 - this.barWidth / 2
    this.barY = window.innerHeight - this.barHeight - 100
    this.barRange = this.barX
    this.barYrange = this.barY

    this.bar = new Bar(
      this.barX,
      this.barY,
      this.barWidth,
      this.barHeight,
      this.barRange,
      this.barYrange
    )
    window.addEventListener('keydown', (e) => {
      //left : 37 , right : 39 ,top : 38 , bottom: 40
      let status = this.bar.update(this.barRange, this.barYrange)
      if (status == 'minX') {
        this.barRange = 0
      } else if (status == 'maxX') {
        this.barRange = window.innerWidth - this.baWwidth
      } else if (status == 'minY') {
        this.barYrange = 0
      } else if (status == 'maxY') {
        this.barYrange = window.innerHeight - this.barHeight
      }

      if (e.keyCode == 37) {
        this.barRange -= 20
      } else if (e.keyCode == 39) {
        this.barRange += 20
      } else if (e.keyCode == 38) {
        this.barYrange -= 20
      } else if (e.keyCode == 40) {
        this.barYrange += 20
      }

      this.bar.update(this.barRange, this.barYrange)
    })

    //shape

    this.shape = new Array()
    this.shape_count = Math.floor(Math.random() * 10) + 1
    //this.shape_count = 5;
    for (let i = 0; i < this.shape_count; i++) {
      let x = Math.floor(Math.random() * window.innerWidth)
      let y = Math.floor(Math.random() * window.innerHeight)
      let radius = Math.floor(Math.random() * 30 + 15)
      let speed = Math.floor(Math.random() * 10) + 2
      let r = Math.floor(Math.random() * 255)
      let g = Math.floor(Math.random() * 255)
      let b = Math.floor(Math.random() * 255)
      let color = `rgba(${r},${g},${b},0.5)`
      this.shape.push(new Shape(x, y, radius, speed, color))
    }
  }

  resize() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }
  animate() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    window.requestAnimationFrame(this.animate.bind(this))
    for (let i = 0; i < this.shape.length; i++) {
      this.shape[i].draw(this.ctx)
      this.shape[i].crashBar(
        this.bar.x,
        this.bar.y,
        this.bar.width,
        this.bar.height
      )
    }

    this.bar.move(this.ctx)
  }
}

window.onload = () => {
  new App()
}

import { Ball } from './Ball.js'
import { Polygon } from './Polygon.js'

class App {
  constructor() {
    this.canvas = document.createElement('canvas')
    document.body.appendChild(this.canvas)
    this.ctx = this.canvas.getContext('2d')

    window.addEventListener('resize', this.resize.bind(this))
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1
    this.resize()

    window.requestAnimationFrame(this.animate.bind(this))
    this.ball = new Array()
    let ballCount = 100

    for (let i = 0; i < ballCount; i++) {
      // let r = Math.floor(Math.random() * 255);
      // let g = Math.floor(Math.random() * 255);
      // let b = Math.floor(Math.random() * 255);
      // let color = `rgba(${r},${g},${b},0.8)`;
      let speed = Math.random() * 1 + 0.1
      let color = 'white'
      this.ball.push(new Ball(100, 100, 2, speed, color))
    }

    this.pointerParticle = new Ball(0, 0, 20, 2, 'white')

    this.polygon = new Polygon(
      window.innerWidth / 2,
      window.innerHeight - window.innerHeight / 10,
      window.innerHeight / 20,
      3
    )
    this.pointerDown = false
    this.moveX = 0
    window.addEventListener('pointerdown', this.onDown.bind(this))
    window.addEventListener('pointermove', this.onMove.bind(this))
    window.addEventListener('pointerup', this.onUp.bind(this))
  }
  resize() {
    this.canvas.width = window.innerWidth * this.pixelRatio
    this.canvas.height = window.innerHeight * this.pixelRatio
    this.ctx.scale(this.pixelRatio, this.pixelRatio)
  }
  animate() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    window.requestAnimationFrame(this.animate.bind(this))
    this.moveX *= 0.9
    this.polygon.animate(
      this.ctx,
      this.moveX,
      window.innerWidth,
      window.innerHeight
    )
    this.connect()
  }

  onDown(e) {
    this.pointerDown = true
    this.moveX = 0
    this.offsetX = e.clientX
  }

  onMove(e) {
    if (this.pointerDown === true) {
      e.preventDefault()

      this.moveX = e.clientX - this.offsetX //현재 마우스를 움직이는 첫 지점을 0으로 만드는 코드
      this.offsetX = e.clientX
    }
  }

  onUp(e) {
    this.pointerDown = false
  }

  connect() {
    for (let i = 0; i < this.ball.length; i++) {
      this.ball[i].draw(
        this.ctx,
        window.innerWidth,
        window.innerHeight,
        this.moveX
      )
      for (let j = 0; j < this.ball.length; j++) {
        let dx = this.ball[i].x - this.ball[j].x
        let dy = this.ball[i].y - this.ball[j].y
        let distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 80) {
          this.ctx.lineWidth = 0.06
          this.ctx.strokeStyle = this.ball[i].color
          this.ctx.moveTo(this.ball[i].x, this.ball[i].y)
          this.ctx.lineTo(this.ball[j].x, this.ball[j].y)
          this.ctx.stroke()
        }
      }
    }
  }
}

window.onload = () => {
  new App()
}

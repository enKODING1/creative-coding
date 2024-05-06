import { Item } from './Item.js'
import { Ball } from './ball.js'
import { Polygon } from './polygon.js'

class App {
  constructor() {
    this.canvas = document.createElement('canvas')
    document.body.appendChild(this.canvas)
    this.ctx = this.canvas.getContext('2d')
    window.addEventListener('resize', this.resize.bind(this))
    this.resize()

    this.ball_count = Math.floor(Math.random() * 30) + 8
    this.ball = new Array()
    let x = 100
    let y = 100
    let radius = 3
    let speed = 2
    for (let i = 0; i < this.ball_count; i++) {
      let r = Math.floor(Math.random() * 255)
      let g = Math.floor(Math.random() * 255)
      let b = Math.floor(Math.random() * 255)

      let color = `rgba(${r},${g},${b},0.2)`
      // let color = 'black';

      this.ball.push(new Ball(x, y, radius, speed, color))
    }

    const ITEM_LIST = {
      SPACE: '../space/index.html',
      CRASH: '../crash/index.html',
      'CRASH\nBLOCK': '../crashBlock/index.html',
      GRAVITY: '../gravity/index.html',
      'DRAWING\nPARTICLE': '../drawingParticle/index.html',
      'ROTATION\nCARD': '../rotationCard/index.html',
      'POINTER\nTRACKING': '../pointerTracking/index.html',
      'METRONOME\nNUMBER': '../metronomeNumber/index.html',
      WAVE: '../wave/index.html',
      FORCE: '../force/index.html',
    }

    this.content = document.getElementById('content')

    this.item = new Item(this.content, ITEM_LIST)
    this.item.create()

    this.mouseDown = false
    this.moveX = 0
    this.backupX = 0
    this.speed = 0

    this.polygon = new Polygon(
      window.innerWidth / 2,
      window.innerHeight - window.innerHeight / 10,
      window.innerHeight / 20,
      Math.floor(Math.random() * 6 + 3)
    )

    window.addEventListener('pointerdown', this.onDown.bind(this))

    window.addEventListener('pointermove', this.onMove.bind(this))

    window.addEventListener('pointerup', this.onUp.bind(this))

    window.requestAnimationFrame(this.update.bind(this))
  }

  update() {
    window.requestAnimationFrame(this.update.bind(this))
    this.moveX *= 0.9
    this.item.moveAnimate(this.moveX)

    //canvas구간
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    // for(let i =0 ; i <this.ball_count; i++){
    //     this.ball[i].animate(this.ctx,window.innerWidth,window.innerHeight);
    // }
    for (let i = 0; i < this.ball.length; i++) {
      this.ball[i].animate(this.ctx, window.innerWidth, window.innerHeight)
      for (let j = 0; j < this.ball.length; j++) {
        let dx = this.ball[i].x - this.ball[j].x
        let dy = this.ball[i].y - this.ball[j].y
        let distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 100) {
          this.ctx.strokeStyle = this.ball[j].color
          this.ctx.lineWidth = 0.1
          this.ctx.moveTo(this.ball[i].x, this.ball[i].y)
          this.ctx.lineTo(this.ball[j].x, this.ball[j].y)
          this.ctx.stroke()
        }
      }
    }

    this.polygon.animate(
      this.ctx,
      this.moveX,
      window.innerWidth,
      window.innerHeight
    )
  }

  onDown(e) {
    this.mouseDown = true
    this.offsetX = e.clientX
    this.moveX = 0
  }

  onMove(e) {
    if (this.mouseDown == true) {
      e.preventDefault()
      this.moveX = e.clientX - this.offsetX
      this.offsetX = e.clientX
    }
  }

  onUp(e) {
    this.mouseDown = false
  }

  resize() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }
}

window.onload = () => {
  new App()
}

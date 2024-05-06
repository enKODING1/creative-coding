import { Polygon } from './Polygon.js'

class App {
  constructor() {
    this.canvas = document.createElement('canvas')
    document.body.appendChild(this.canvas)
    this.ctx = this.canvas.getContext('2d')

    window.addEventListener('resize', this.resize.bind(this))

    this.resize()

    window.requestAnimationFrame(this.animate.bind(this))

    this.pointerDown = false
    this.moveX = 0
    window.addEventListener('pointerdown', this.onDown.bind(this))
    window.addEventListener('pointermove', this.onMove.bind(this))
    window.addEventListener('pointerup', this.onUp.bind(this))
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

  resize() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight

    this.polygon = new Polygon(
      window.innerWidth / 2,
      window.innerHeight + window.innerHeight / 4,
      window.innerHeight / 1.5,
      9
    )
  }
  animate() {
    window.requestAnimationFrame(this.animate.bind(this))
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    this.moveX *= 0.9

    this.polygon.animate(this.ctx, this.moveX)
  }
}

window.onload = () => {
  new App()
}

// //test code
// const canvas = document.createElement('canvas');
// document.body.appendChild(canvas);
// let ctx = canvas.getContext('2d');
// var angle = 0;
// var rotation = 0;
// var rotation_s = 0.9;

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// window.requestAnimationFrame(draw);

// function draw(){
//     window.requestAnimationFrame(draw);
//     ctx.clearRect(0,0,window.innerWidth,window.innerHeight);

//     ctx.save();
//     ctx.fillStyle = 'red';

//     // 사각형 안으로 원점 이동

//     ctx.translate(300,300);
//     ctx.rotate(angle *(Math.PI/180));

//     ctx.fillRect(-150,-150,300,300);
//     ctx.restore();

//     ctx.moveTo(0,0);
//     ctx.lineTo(300,300);
//     ctx.stroke();

//     if(angle > 360){
//         angle = 0;
//     }

// //    rotation += rotation_s;
//     angle += 1;

// }

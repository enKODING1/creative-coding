const canvas = document.createElement('canvas')
document.body.appendChild(canvas)
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight
let particleArray = []
let ball = null

const mouse = {
  x: null,
  y: null,
  radius: 150,
}

window.addEventListener('pointermove', function (e) {
  mouse.x = e.x
  mouse.y = e.y
  mouse.radius = 150
  // console.log(mouse.x ,mouse.y);
})

ctx.fillStyle = 'white'
ctx.font = '30px Verdana'
ctx.fillText('A', 0, 30)
ctx.strokeStyle = 'white'
ctx.strokeRect(0, 0, 100, 100)
const data = ctx.getImageData(0, 0, 100, 100)

class Particle {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.size = 3
    this.baseX = this.x
    this.baseY = this.y
    this.density = Math.random() * 30 + 1
  }

  draw() {
    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
    ctx.closePath()
    ctx.fill()
  }

  update(ballX, ballY) {
    let dx = mouse.x - this.x
    let dy = mouse.y - this.y
    let distance = Math.sqrt(dx * dx + dy * dy)

    let forceDirectionX = dx / distance
    let forceDirectionY = dy / distance
    let maxDistance = mouse.radius
    let force = (maxDistance - distance) / maxDistance
    let directionX = forceDirectionX * force * this.density
    let directionY = forceDirectionY * force * this.density
    // console.log(force);
    if (distance < mouse.radius) {
      this.x -= directionX
      this.y -= directionY
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX
        this.x -= dx / 10
      }

      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY
        this.y -= dy / 5
      }
    }
  }

  updateBall(ballX, ballY) {
    let dx = ballX - this.x
    let dy = ballY - this.y
    let distance = Math.sqrt(dx * dx + dy * dy)

    let forceDirectionX = dx / distance
    let forceDirectionY = dy / distance
    let maxDistance = mouse.radius
    let force = (maxDistance - distance) / maxDistance
    let directionX = forceDirectionX * force * this.density
    let directionY = forceDirectionY * force * this.density
    // console.log(force);
    if (distance < mouse.radius) {
      this.x -= directionX
      this.y -= directionY
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX
        this.x -= dx / 10
      }

      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY
        this.y -= dy / 5
      }
    }
  }

  connect(sx, sy) {
    const dx = this.x - sx
    const dy = this.y - sy
    const distance = Math.sqrt(dx * dx + dy * dy)
    if (distance < 120) {
      ctx.strokeStyle = 'white'
      ctx.beginPath()
      ctx.lineWidth = 0.2
      ctx.moveTo(this.x, this.y)
      ctx.lineTo(sx, sy)
      ctx.stroke()
    }
  }
}

class Ball {
  constructor(x, y, radius, speed) {
    this.x = x
    this.y = y
    this.sx = speed
    this.sy = speed
    this.speed = speed
    this.radius = radius
  }

  draw(x, y) {
    this.x += this.sx
    this.y += this.sy

    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fill()

    this.crash()
  }

  crash() {
    const minX = this.radius
    const maxX = window.innerWidth - this.radius

    const minY = this.radius
    const maxY = window.innerHeight - this.radius

    if (this.x > maxX || this.x < minY) {
      this.sx *= -1
    } else if (this.y > maxY || this.y < minY) {
      this.sy *= -1
    }
  }

  connect(x, y) {
    const dx = this.x - x
    const dy = this.y - y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < 150) {
      ctx.strokeStyle = 'yellow'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(this.x, this.y)
      ctx.lineTo(x, y)
      ctx.stroke()
    }
  }
}

function init() {
  const ballX = Math.random() * window.innerWidth
  const ballY = Math.random() * window.innerHeight

  ball = new Ball(ballX, ballY, 20, 4)
  particleArray = []
  for (let i = 0; i < 200; i++) {
    let x = Math.random() * window.innerWidth
    let y = Math.random() * window.innerHeight
    particleArray.push(new Particle(x, y))
  }
}

init()

function animate() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
  ball.draw()
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].draw()
    particleArray[i].update()
    particleArray[i].updateBall(ball.x, ball.y)

    // ball.connect(particleArray[i].x,particleArray[i].y);
    for (let j = 0; j < particleArray.length; j++) {
      particleArray[i].connect(particleArray[j].x, particleArray[j].y)
    }
  }

  requestAnimationFrame(animate)
}

window.onload = () => {
  animate()
}

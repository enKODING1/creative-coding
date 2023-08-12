const canvas = document.createElement('canvas')
document.body.appendChild(canvas)
const ctx = canvas.getContext('2d')

const particles = document.querySelector('#particle')
const particle_lined = document.querySelector('#particle_line')
const particle_effect = document.querySelector('#particle_effect')
let val = document.querySelectorAll('.val')
let count = 0

canvas.width = window.innerWidth
canvas.height = window.innerHeight
const particleArray = []
let hue = 0
let particle_num = 0
let particle_line = 0
let particle = false

particles.onchange = (e) => {
  val[0].innerHTML = `원:${e.target.value}`
  particle_num = e.target.value
}
particle_lined.onchange = (e) => {
  val[1].innerHTML = `라인:${e.target.value}`
  particle_line = e.target.value
}

particle_effect.onchange = (e) => {
  count++
  if (count % 2 == 0) {
    val[2].innerHTML = `효과 꺼짐`
    particle = false
  } else {
    val[2].innerHTML = `효과 켜짐`
    particle = true
  }
}

window.addEventListener('resize', (e) => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

const mouse = {
  x: undefined,
  y: undefined,
}
canvas.addEventListener('click', (event) => {
  mouse.x = event.x
  mouse.y = event.y
  for (let i = 0; i < particle_num; i++) {
    particleArray.push(new Particle())
  }
})

canvas.addEventListener('pointermove', (event) => {
  mouse.x = event.x
  mouse.y = event.y

  // ctx.clearRect(0,0,canvas.width,canvas.height);
  for (let i = 0; i < particle_num; i++) {
    particleArray.push(new Particle())
  }
})

class Particle {
  constructor() {
    this.x = mouse.x
    this.y = mouse.y
    //0~5 랜덤 숫자 생성
    // this.x = Math.random() * canvas.width;
    // this.y = Math.random() * canvas.height;
    this.size = Math.random() * 20 + 1
    this.speedX = Math.random() * 3 - 1.5
    this.speedY = Math.random() * 3 - 1.5
    this.color = `hsl(${hue},100%,50%)`
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY
    if (this.size > 0.2) this.size -= 0.1
  }

  draw() {
    ctx.fillStyle = this.color
    // ctx.strokeStyle = 'white';
    ctx.lineWidth = 0.1
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)

    ctx.fill()
    //    ctx.stroke();
  }
}

function handleParticles() {
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update()
    particleArray[i].draw()
    for (let j = i; j < particleArray.length; j++) {
      const dx = particleArray[i].x - particleArray[j].x
      const dy = particleArray[i].y - particleArray[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)
      if (distance < particle_line) {
        ctx.beginPath()
        ctx.strokeStyle = particleArray[i].color
        // ctx.strokeStyle = 'white';
        ctx.moveTo(particleArray[i].x, particleArray[i].y)
        ctx.lineTo(particleArray[j].x, particleArray[j].y)
        ctx.stroke()
      }
    }
    if (particleArray[i].size <= 0.3) {
      particleArray.splice(i, 1)
      i--
    }
  }
}

function animate() {
  if (particle == false) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  } else {
    ctx.fillStyle = 'rgb(2,0,0,0.1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  handleParticles()
  hue += 2
  requestAnimationFrame(animate)
  // setTimeout(animate);
}

window.onload = () => {
  animate()
}

export class Shape {
  constructor(x, y, radius, speed, color) {
    this.x = x
    this.y = y
    this.sx = speed
    this.sy = speed
    this.radius = radius
    this.speed = speed
    this.color = color
    this.width = Math.floor(Math.random() * 100 + 20)
    this.height = Math.floor(Math.random() * 100 + 20)
    this.angle = 0
    this.dx = 0
    this.dy = 0
  }
  //원으로 그리는 옵션
  draw(ctx) {
    this.x += this.sx
    this.y += this.sy

    // this.dx = this.x + Math.cos(this.angle * (Math.PI/180))*this.radius;
    // this.dy = this.y + Math.sin(this.angle * (Math.PI/180))*this.radius;

    // if(this.angle > 360){
    //     this.angle = 0;
    // }

    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    //ctx.arc(this.dx, this.dy, this.radius, 0, Math.PI * 2);
    ctx.fill()
    this.crash()
    this.crashBar()

    //this.angle += 5;
  }
  //사각형으로 그리는 옵션
  drawRect(ctx) {
    this.x += this.sx
    this.y += this.sy

    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.rect(this.dx, this.dy, this.width, this.height)
    ctx.fill()
    this.crash()
    this.crashBar()
  }

  crash() {
    let minX = this.radius
    let minY = this.radius

    let maxX = window.innerWidth - this.radius
    let maxY = window.innerHeight - this.radius

    if (this.x > maxX || this.x < minX) {
      this.sx *= -1
      this.x += this.sx
    } else if (this.y > maxY || this.y < minY) {
      this.sy *= -1
      this.y += this.sy
    }
  }

  crashBar(x, y, width, height) {
    let minX = x - this.radius
    let maxX = x + width + this.radius

    let minY = y - this.radius
    let maxY = y + height + this.radius

    if (this.x > minX && this.x < maxX && this.y > minY && this.y < maxY) {
      const x1 = Math.abs(minX - this.x)
      const x2 = Math.abs(this.x - maxX)
      const y1 = Math.abs(minY - this.y)
      const y2 = Math.abs(this.y - maxY)

      const min1 = Math.min(x1, x2)
      const min2 = Math.min(y1, y2)
      const min = Math.min(min1, min2)

      if (min == min1) {
        this.sx *= -1
        this.x += this.sx
      } else if (min == min2) {
        this.sy *= -1
        this.y += this.sy
      }
    }

    // let minX = x - this.radius;
    // let maxX = x + width + this.radius;

    // let minY = y - this.radius;
    // let maxY = y+height+ this.radius;

    // if(this.x > minX && this.x <maxX && this.y > minY && this.y < maxY){
    //     const x1 = Math.abs(minX - this.x);
    //     const x2 = Math.abs(this.x - maxX);
    //     const y1 = Math.abs(minY - this.y);
    //     const y2 = Math.abs(this.y-maxY);

    //     const min1 = Math.min(x1,x2);
    //     const min2 = Math.min(y1,y2);
    //     const min = Math.min(min1,min2);

    //     if(min == min1){
    //         this.sx *= -1;
    //         this.x += this.sx;
    //     }else if(min == min2){
    //         this.sy *= -1;
    //         this.y += this.sy;
    //     }
    // }
  }
}

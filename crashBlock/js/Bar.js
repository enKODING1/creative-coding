export class Bar {
  constructor(x, y, width, height, move_range, move_yrange) {
    this.x = x
    this.y = y

    this.width = width

    this.height = height
    this.move_range = move_range
    this.move_yrange = move_yrange
    this.mv = move_range
  }

  move(ctx) {
    this.x = this.move_range
    this.y = this.move_yrange
    ctx.fillStyle = 'purple'
    ctx.beginPath()
    ctx.rect(this.x, this.y, this.width, this.height)
    ctx.fill()
  }

  update(move_range, move_yrange) {
    this.move_range = move_range
    this.move_yrange = move_yrange

    let minX = 0
    let maxX = window.innerWidth - this.width

    let minY = 0
    let maxY = window.innerHeight - this.height

    if (this.move_range < minX) {
      this.move_range = minX
      return 'minX'
    } else if (this.move_range > maxX) {
      this.move_range = maxX
      return 'maxX'
    }

    if (this.move_yrange < minY) {
      this.move_yrange = minY
      return 'minY'
    } else if (this.move_yrange > maxY) {
      this.move_yrange = maxY
      return 'maxY'
    }
  }
}

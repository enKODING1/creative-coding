export class Item {
  constructor(parent, ITEM_LIST) {
    this.item = undefined
    this.itemTitle = undefined

    this.parent = parent
    this.count = 0
    this.transitionX = 0
    this.transitionY = 100

    this.ITEM_LIST = ITEM_LIST
  }

  create() {
    this.getItemCount()

    for (let i = 0; i < this.count; i++) {
      let item = document.createElement('div')
      let item_title_box = document.createElement('div')
      let item_title = document.createElement('h2')

      item.className = 'item'
      item_title_box.className = 'item_title_box'
      item_title.className = 'item_title'

      item_title_box.appendChild(item_title)
      item.appendChild(item_title_box)
      this.parent.appendChild(item)
    }

    this.selectItem()
    this.insertTitle()
    this.setColor()
    this.clickEvent()
  }

  selectItem() {
    this.item = document.querySelectorAll('.item')
    this.itemTitle = document.querySelectorAll('.item_title')
    if (this.item.length < 0 && this.itemTitle < 0) {
      return 'failed'
    } else if (this.item.length > 0 && this.item_title_box > 0) {
      return 'success'
    }
  }

  moveAnimate(moveX) {
    this.transitionX += moveX * 1.3
    for (let i = 0; i < this.item.length; i++) {
      this.item[i].style.transform = `translateX(${this.transitionX}px)`
    }
  }

  insertTitle() {
    let count = 0
    for (let i in this.ITEM_LIST) {
      this.itemTitle[count].innerText = `${i}`
      count++
    }
  }

  setColor() {
    for (let i = 0; i < this.count; i++) {
      let r = Math.floor(Math.random() * 255)
      let g = Math.floor(Math.random() * 255)
      let b = Math.floor(Math.random() * 255)
      let color = `rgba(${r},${g},${b},0.43)`
      // let color = `rgb(${r},${g},${b})`;

      this.item[i].style.backgroundColor = `${color}`
    }
  }

  getItemCount() {
    for (let i in this.ITEM_LIST) {
      this.count += 1
    }
  }

  clickEvent() {
    let count = 0

    this.item.forEach((e, key) => {
      e.addEventListener('click', () => {
        count = 0
        for (let i in this.ITEM_LIST) {
          if (key == count) {
            location.href = this.ITEM_LIST[i]

            return 0
          } else {
            count++
          }
        }
      })
    })
  }
}

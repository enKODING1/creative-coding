const clockContainer = document.createElement('div')
const miniClock = document.createElement('div')
const lineHour = document.createElement('div')
const lineMin = document.createElement('div')
const hour = document.querySelector('.hour');
const min = document.querySelector('.min')
const sec = document.querySelector('.sec')
clockContainer.className = 'clock-container'
miniClock.className = 'mini-clock'
lineHour.className = 'line'
lineMin.className = 'line'
miniClock.appendChild(lineHour)
miniClock.appendChild(lineMin)

for (let i = 0; i < 24; ++i) {
  clockContainer.appendChild(miniClock.cloneNode(true))
}

hour.appendChild(clockContainer.cloneNode(true))
hour.appendChild(clockContainer.cloneNode(true))
min.appendChild(clockContainer.cloneNode(true))
min.appendChild(clockContainer.cloneNode(true))
sec.appendChild(clockContainer.cloneNode(true))
sec.appendChild(clockContainer.cloneNode(true))


const GLYPHS = {
  " ": [135, 135],
  "┘": [180, 270],
  "└": [0, 270],
  "┐": [90, 180],
  "┌": [0, 90],
  "-": [0, 180],
  "|": [90, 270]
}

 const digits = {
  "0": [
    "┌", "-", "-", "┐",
    "|", "┌", "┐", "|",
    "|", "|", "|", "|",
    "|", "|", "|", "|",
    "|", "└", "┘", "|",
    "└", "-", "-", "┘",
  ],

  "1": [
    "┌", "-", "┐", " ",
    "└", "┐", "|", " ",
    " ", "|", "|", " ",
    " ", "|", "|", " ",
    "┌", "┘", "└", "┐",
    "└", "-", "-", "┘",
  ],

  "2": [
    "┌", "-", "-", "┐",
    "└", "-", "┐", "|",
    "┌", "-", "┘", "|",
    "|", "┌", "-", "┘",
    "|", "└", "-", "┐",
    "└", "-", "-", "┘",
  ],

  "3": [
    "┌", "-", "-", "┐",
    "└", "-", "┐", "|",
    " ", "┌", "┘", "|",
    " ", "└", "┐", "|",
    "┌", "-", "┘", "|",
    "└", "-", "-", "┘",
  ],

  "4": [
    "┌", "┐", "┌", "┐",
    "|", "|", "|", "|",
    "|", "└", "┘", "|",
    "└", "-", "┐", "|",
    " ", " ", "|", "|",
    " ", " ", "└", "┘",
  ],

  "5": [
    "┌", "-", "-", "┐",
    "|", "┌", "-", "┘",
    "|", "└", "-", "┐",
    "└", "-", "┐", "|",
    "┌", "-", "┘", "|",
    "└", "-", "-", "┘",
  ],

  "6": [
    "┌", "-", "-", "┐",
    "|", "┌", "-", "┘",
    "|", "└", "-", "┐",
    "|", "┌", "┐", "|",
    "|", "└", "┘", "|",
    "└", "-", "-", "┘",
  ],

  "7": [
    "┌", "-", "-", "┐",
    "└", "-", "┐", "|",
    " ", " ", "|", "|",
    " ", " ", "|", "|",
    " ", " ", "|", "|",
    " ", " ", "└", "┘",
  ],

  "8": [
    "┌", "-", "-", "┐",
    "|", "┌", "┐", "|",
    "|", "└", "┘", "|",
    "|", "┌", "┐", "|",
    "|", "└", "┘", "|",
    "└", "-", "-", "┘",
  ],

  "9": [
    "┌", "-", "-", "┐",
    "|", "┌", "┐", "|",
    "|", "└", "┘", "|",
    "└", "-", "┐", "|",
    "┌", "-", "┘", "|",
    "└", "-", "-", "┘",
  ]
}

function syncClock(clockElement, glyp) {
    clockElement.childNodes[0].style.rotate = `${GLYPHS[glyp][0]}deg`
    clockElement.childNodes[1].style.rotate = `${GLYPHS[glyp][1]}deg`
}

function transformDigit(clockContainer, digit){
  const digitArray = digits[digit];
  
  if(clockContainer){
      Array.from(clockContainer.children).forEach((v, i)=>{
      syncClock(v,digitArray[i])
    })
  }
}

function makeTimeToContainer(timeContainer, time){
  let l = Math.floor(time/10);
  let r = time%10; 
  
  transformDigit(timeContainer.children[0], l); 
  transformDigit(timeContainer.children[1], r); 
}

let count = 0;
let run = 0;

function countDigit(){
  ++run;
  if (run > 60) 
  { 
    run = 0;
    if (count > 9){
      count = 0;
    }
    const now = new Date()

    const h = now.getHours()
    const m = now.getMinutes()
    const s = now.getSeconds()


    makeTimeToContainer(hour, h);
    makeTimeToContainer(min, m);
    makeTimeToContainer(sec, s);
  }

    requestAnimationFrame(countDigit);
}

requestAnimationFrame(countDigit);
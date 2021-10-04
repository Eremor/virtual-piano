const piano = document.querySelector('.piano')
const pianoKeys = piano.querySelectorAll('.piano-key')
const containerButtons = document.querySelector('.btn-container')
const btnNotes = containerButtons.querySelector('.btn-notes')
const btnLetters = containerButtons.querySelector('.btn-letters')
const btnFullScreen = document.querySelector('.fullscreen')
let isClick = false;
let isPress = true;

const playSound = src => {
  const audio = new Audio()
  audio.src = src;
  audio.currentTime = 0;
  audio.play()
}

const activePianoKey = elem => {
  const src = `assets/audio/${elem.dataset.note}.mp3`
  playSound(src)
  elem.classList.add('piano-key-active')
}

const clickPianoKey = e => {
  if(e.target.classList.contains('piano-key')) {
    activePianoKey(e.target)
  }
}

const removeActiveKey = e => {
  if(e.propertyName !== 'transform') return;
  e.target.classList.remove('piano-key-active')
}


const pressPianoKey = e => {
  if(e.code == 'AltLeft') return
  let key = e.code.slice(3,4)
  pianoKeys.forEach(item => {
    if(item.dataset.letter == key) {
      if(e.repeat != undefined) isPress = !e.repeat
      if(!isPress) return
      isPress = false
      activePianoKey(item)
    }
  })
}

const clickMouseDown = (e) => {
  clickPianoKey(e)
  if(e.target.classList.contains('piano-key')) {
    isClick = true
  }
}

const moveMouseOnPianoKey = e => {
  if(e.target.classList.contains('piano-key')) {
    if(isClick) activePianoKey(e.target)
  }
}

function toggleButton(e) {
  if(e.target.classList.contains('btn-letters')) {
    btnNotes.classList.remove('btn-active')
    btnLetters.classList.add('btn-active')
    pianoKeys.forEach(key => key.classList.add('piano-key-letter'))
  }
  if(e.target.classList.contains('btn-notes')) {
    btnLetters.classList.remove('btn-active')
    btnNotes.classList.add('btn-active')
    pianoKeys.forEach(key => key.classList.remove('piano-key-letter'))
  }
}

function toggleFullScreen() {
  if(!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    if(document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}

piano.addEventListener('mousedown', clickMouseDown)
piano.addEventListener('mouseover', moveMouseOnPianoKey)
piano.addEventListener('mouseup', () => isClick = false)
piano.addEventListener('mouseleave', () => isClick = false)
piano.addEventListener('transitionend', removeActiveKey)

containerButtons.addEventListener('click', toggleButton)

btnFullScreen.addEventListener('click', toggleFullScreen)

window.addEventListener('keydown', pressPianoKey)
window.addEventListener('keyup', () => isPress = true)
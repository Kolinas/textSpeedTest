const startBtn = document.querySelector('#start-btn')
const display = document.getElementById('timer');
const input = document.querySelector('#input')
const resultBlock = document.querySelector('#result')
const reload = document.querySelector('#reload')
const testStart = document.querySelector('.test')
const startBlock = document.querySelector('.start')
const timeDurition = document.querySelector('#time')

const select = document.querySelector('#select')

let duration = 0;
let textWriting = false 

// startBtn.addEventListener('click', () => {
//   input.removeAttribute('disabled')
//   input.focus()
//   startTimer(duration, display)
// })

input.addEventListener('input', isTextWriting)
select.addEventListener('click', selectValue)

function selectValue(e) {
    if (e.target.tagName === "BUTTON"){
        duration = parseInt(e.target.textContent)
        input.removeAttribute('disabled')
        startBlock.classList.remove('hide')
        select.classList.add('hide')
    }
}

function isTextWriting(){

    if (textWriting) return 

    if (!textWriting){
        textWriting = true
        startBlock.classList.add('hide')
        testStart.classList.remove('hide')
        timeDurition.textContent = duration
        startTimer(duration, display)
    }
}

function startTimer(duration, display) {
  let timer = duration-1;
//   startBtn.classList.add('hide')

  const interval = setInterval(function () {
    let minutes = Math.floor(timer / 60)
    let seconds = Math.floor(timer % 60)

    const showMinutes = minutes < 10 ? "0" + minutes : minutes;
    const showSeconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = showMinutes + ":" + showSeconds;
    timer--

    if (timer < 0) {
      clearInterval(interval);
      display.textContent = "Время вышло"
      input.setAttribute('disabled', true)
      showResult()
    }
  }, 1000);

}

function calculateTypingSpeed(numChars, timeInSeconds) {
    const charactersPerMinute = Math.trunc(numChars / timeInSeconds * 60);
    return charactersPerMinute;
  }


function showResult(){
  const result = input.value.split(' ').join('').length
  const static = document.querySelector('#wpm')
  const getTotal = calculateTypingSpeed(result, duration)
  resultBlock.classList.remove('hide')
  static.textContent = getTotal
}

function reloadService(){
  resultBlock.classList.add('hide')
//    startBtn.classList.remove('hide')
testStart.classList.add('hide')
  input.value = ''
  display.textContent = ""
  textWriting = false
  select.classList.remove('hide')
  duration = 0
}

reload.addEventListener('click', reloadService)


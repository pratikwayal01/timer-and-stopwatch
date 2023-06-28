// timer.js
let timerInterval;
let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let lapCount = 1;

function startTimer() {
  timerInterval = setInterval(function() {
    milliseconds++;
    if (milliseconds === 1000) {
      milliseconds = 0;
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
          minutes = 0;
          hours++;
        }
      }
    }
    updateDisplay();
  }, 1);
}
function startreverseTimer() {
  timerInterval = setInterval(function() {
    milliseconds--;
    if (milliseconds < 0) {
      milliseconds = 999;
      seconds--;
      if (seconds < 0) {
        seconds = 59;
        minutes--;
        if (minutes < 0) {
          minutes = 59;
          hours--;
          if (hours < 0) {
            clearInterval(timerInterval);
            alert("Time's up!");
            resetTimer();
          }
        }
      }
    }
    updateDisplay();
  }, 1);
}

function pauseTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  hours = 0;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  lapCount = 1;
  updateDisplay();
  clearLapRecords();
}

function lapTimer() {
  const lapTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}.${padZero(milliseconds)}`;
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
  document.getElementById('lapList').prepend(lapItem);
  lapCount++;
}

function setTimer() {
  const hourInput = document.getElementById('hourInput').value;
  const minuteInput = document.getElementById('minuteInput').value;
  const secondInput = document.getElementById('secondInput').value;

  hours = parseInt(hourInput) || 0;
  minutes = parseInt(minuteInput) || 0;
  seconds = parseInt(secondInput) || 0;
  milliseconds = 0;

  updateDisplay();

  clearInterval(timerInterval);
  startreverseTimer();
}

function updateDisplay() {
  document.querySelector('.hours').textContent = padZero(hours);
  document.querySelector('.minutes').textContent = padZero(minutes);
  document.querySelector('.seconds').textContent = padZero(seconds);
  document.querySelector('.milliseconds').textContent = padZero(milliseconds);
}

function padZero(num) {
  return num.toString().padStart(2, '0');
}

function clearLapRecords() {
  const lapList = document.getElementById('lapList');
  while (lapList.firstChild) {
    lapList.removeChild(lapList.firstChild);
  }
}
// Event listeners
document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('pauseBtn').addEventListener('click', pauseTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);
document.getElementById('lapBtn').addEventListener('click', lapTimer);
document.getElementById('setTimerBtn').addEventListener('click', setTimer);

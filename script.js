const timerDisplay = document.getElementById("timerDisplay");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const toggleModeBtn = document.getElementById("toggleMode");
const darkModeToggle = document.getElementById("darkModeToggle");
const alertSound = document.getElementById("alertSound");

const inputHours = document.getElementById("inputHours");
const inputMinutes = document.getElementById("inputMinutes");
const inputSeconds = document.getElementById("inputSeconds");
const timeInputsDiv = document.getElementById("timeInputs");

let isTimer = true;
let interval;
let totalSeconds = 0;
let running = false;

function pad(n) {
  return n.toString().padStart(2, "0");
}

function updateDisplay() {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  timerDisplay.textContent = `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}

function getInputTime() {
  const hrs = parseInt(inputHours?.value) || 0;
  const mins = parseInt(inputMinutes?.value) || 0;
  const secs = parseInt(inputSeconds?.value) || 0;
  return hrs * 3600 + mins * 60 + secs;
}

startBtn.onclick = () => {
  if (running) return;

  if (isTimer) {
    totalSeconds = getInputTime();
    if (totalSeconds <= 0) {
      alert("Please enter a valid time.");
      return;
    }
  }

  running = true;

  interval = setInterval(() => {
    if (isTimer) {
      totalSeconds--;
      if (totalSeconds <= 0) {
        clearInterval(interval);
        running = false;
        totalSeconds = 0;
        updateDisplay();
        alertSound.play();
      }
    } else {
      totalSeconds++;
    }
    updateDisplay();
  }, 1000);
};

pauseBtn.onclick = () => {
  clearInterval(interval);
  running = false;
};

resetBtn.onclick = () => {
  clearInterval(interval);
  running = false;
  totalSeconds = 0;
  alertSound.pause();
  alertSound.currentTime = 0;
  updateDisplay();
};

toggleModeBtn.onclick = () => {
  isTimer = !isTimer;
  resetBtn.click();
  toggleModeBtn.textContent = isTimer
    ? "Switch to Stopwatch"
    : "Switch to Timer";
  timeInputsDiv.style.display = isTimer ? "flex" : "none";
};

darkModeToggle.onclick = () => {
  document.body.classList.toggle("dark");
  darkModeToggle.textContent = document.body.classList.contains("dark")
    ? "☀️"
    : "🌙";
};

// Initial state
updateDisplay();
timeInputsDiv.style.display = "flex";

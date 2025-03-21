"use strict";
// Cache DOM elements
const displayEl = document.getElementById("display"),
      themeToggleEl = document.getElementById("theme-toggle"),
      historyListEl = document.getElementById("history-list");
let memory = "", calcHistory = [];
const clickSound = new Audio("click.mp3");

// Play sound
function playSound() {
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});
}

// Append value
function appendToDisplay(val) {
  playSound();
  if (displayEl.value === "0" || displayEl.value === "Error") displayEl.value = "";
  displayEl.value += val;
}

// Clear display
function clearDisplay() {
  playSound();
  displayEl.value = "";
}

// Delete last char
function deleteLast() {
  playSound();
  displayEl.value = displayEl.value.slice(0, -1);
}

// Calculate and update history
function calculateResult() {
  playSound();
  const exp = displayEl.value;
  try {
    const res = Function('"use strict"; return (' + exp + ')')();
    if (typeof res !== "number" || !isFinite(res)) throw new Error("Invalid");
    calcHistory.push(`${exp} = ${res}`);
    renderHistory();
    displayEl.value = res;
  } catch (e) {
    displayEl.value = "Error";
    setTimeout(clearDisplay, 1200);
  }
}

// Render history
function renderHistory() {
  historyListEl.innerHTML = "";
  calcHistory.slice().reverse().forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    historyListEl.appendChild(li);
  });
}

// Clear history
function clearHistory() {
  calcHistory = [];
  renderHistory();
}

// Memory functions
function memoryStore() {
  playSound();
  memory = displayEl.value;
}
function memoryRecall() {
  playSound();
  if (memory) appendToDisplay(memory);
}

// Theme toggle
themeToggleEl.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");
  themeToggleEl.textContent = document.body.classList.contains("dark-theme") ? "🌙" : "☀️";
});

// Keyboard support
document.addEventListener("keydown", e => {
  const key = e.key;
  if (/^[0-9.+\-*/]$/.test(key)) appendToDisplay(key);
  else if (key === "Enter") { e.preventDefault(); calculateResult(); }
  else if (key === "Backspace") deleteLast();
  else if (key === "Escape") clearDisplay();
});

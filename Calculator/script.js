"use strict";

/* =============================
   Cache DOM Elements & Variables
============================= */
const displayEl = document.getElementById("display");
const themeToggleEl = document.getElementById("theme-toggle");
const historyListEl = document.getElementById("history-list");
const clearHistoryBtn = document.getElementById("clear-history");
let memory = "";
let calcHistory = [];

// Preload click sound
const clickSound = new Audio("click.mp3");

/* =============================
   Utility: Play Sound
============================= */
function playSound() {
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {}); // Avoid promise errors in some browsers
}

/* =============================
   Append Input to Display
============================= */
function appendToDisplay(value) {
  playSound();
  if (displayEl.value === "0" || displayEl.value === "Error") {
    displayEl.value = "";
  }
  displayEl.value += value;
}

/* =============================
   Clear the Display
============================= */
function clearDisplay() {
  playSound();
  displayEl.value = "";
}

/* =============================
   Delete Last Character
============================= */
function deleteLast() {
  playSound();
  displayEl.value = displayEl.value.slice(0, -1);
}

/* =============================
   Calculate the Result and Update History
============================= */
function calculateResult() {
  playSound();
  let expression = displayEl.value;
  try {
    // Evaluate expression safely using Function constructor
    let result = Function('"use strict"; return (' + expression + ')')();
    if (typeof result !== "number" || !isFinite(result)) {
      throw new Error("Invalid Calculation");
    }
    updateHistory(expression, result);
    displayEl.value = result;
  } catch (error) {
    displayEl.value = "Error";
    setTimeout(clearDisplay, 1200);
  }
}

/* =============================
   Update Calculation History
============================= */
function updateHistory(expression, result) {
  const historyItem = `${expression} = ${result}`;
  calcHistory.push(historyItem);
  renderHistory();
}

/* =============================
   Render History to the UI
============================= */
function renderHistory() {
  historyListEl.innerHTML = "";
  calcHistory.slice().reverse().forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    historyListEl.appendChild(li);
  });
}

/* =============================
   Clear Calculation History
============================= */
function clearHistory() {
  calcHistory = [];
  renderHistory();
}

/* =============================
   Memory Functions
============================= */
function memoryStore() {
  playSound();
  memory = displayEl.value;
}
function memoryRecall() {
  playSound();
  if (memory) {
    appendToDisplay(memory);
  }
}

/* =============================
   Theme Toggle
============================= */
themeToggleEl.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");
  themeToggleEl.textContent = document.body.classList.contains("dark-theme") ? "🌙" : "☀️";
});

/* =============================
   Keyboard Support for Accessibility
============================= */
document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (/^[0-9.+\-*/]$/.test(key)) {
    appendToDisplay(key);
  } else if (key === "Enter") {
    event.preventDefault();
    calculateResult();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
    clearDisplay();
  }
});

/* =============================
   Additional Logging for Debugging (Optional)
============================= */
console.log("Ultimate Pro Calculator Loaded. Enjoy your experience!");

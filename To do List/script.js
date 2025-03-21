"use strict";

// Cache DOM elements
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskListEl = document.getElementById("task-list");
const clearTasksBtn = document.getElementById("clear-tasks");
const themeToggleEl = document.getElementById("theme-toggle");
let tasks = [];

// Toggle Dark/Light Theme
themeToggleEl.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");
  themeToggleEl.textContent = document.body.classList.contains("dark-theme")
    ? "🌙"
    : "☀️";
});

// Add Task
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = "";
    renderTasks();
  }
});

// Render Tasks to UI
function renderTasks() {
  taskListEl.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span>${task.text}</span>
      <div class="task-actions">
        <button onclick="toggleTask(${index})" title="Mark as Complete">✔️</button>
        <button onclick="deleteTask(${index})" title="Delete Task">🗑️</button>
      </div>
    `;
    taskListEl.appendChild(li);
  });
}

// Toggle Task Completion
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Delete Task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Clear All Tasks
clearTasksBtn.addEventListener("click", () => {
  tasks = [];
  renderTasks();
});

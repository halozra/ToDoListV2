const API_URL = 'http://localhost:3000/tasks'; // Sesuaikan dengan server backend kamu

// Fetch tasks from server
async function fetchTasks() {
  const response = await fetch(API_URL);
  const tasks = await response.json();
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="${task.status ? 'completed' : ''}">${task.title}</span>
      <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

// Add a new task
async function addTask(event) {
  event.preventDefault();
  const title = document.getElementById('task-title').value;
  const description = document.getElementById('task-desc').value;

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description })
  });

  document.getElementById('task-form').reset();
  fetchTasks();
}

// Delete a task
async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  fetchTasks();
}

// Attach event listener
document.getElementById('task-form').addEventListener('submit', addTask);

// Load tasks on page load
fetchTasks();

// Theme with persistence
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const THEME_KEY = 'theleaders:theme';

function applyTheme(theme){
  if(theme === 'dark') body.classList.add('dark');
  else body.classList.remove('dark');
  themeToggle.setAttribute('aria-pressed', theme === 'dark');
}

const saved = localStorage.getItem(THEME_KEY);
if(saved) applyTheme(saved);
else {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(prefersDark ? 'dark' : 'light');
}

themeToggle.addEventListener('click', () => {
  const isDark = body.classList.toggle('dark');
  const theme = isDark ? 'dark' : 'light';
  localStorage.setItem(THEME_KEY, theme);
  applyTheme(theme);
});

// To-do list logic with persistence
const form = document.getElementById('todoForm');
const input = document.getElementById('taskInput');
const tasksEl = document.getElementById('tasks');
const CLEAR_DONE = document.getElementById('clearDone');
const CLEAR_ALL = document.getElementById('clearAll');

let tasks = [];

function save(){
  localStorage.setItem('theleaders:tasks', JSON.stringify(tasks));
}

function render(){
  tasksEl.innerHTML = '';
  if(tasks.length === 0){
    const li = document.createElement('li');
    li.className = 'muted';
    li.textContent = 'Nenhuma tarefa — adicione algo acima ✨';
    tasksEl.appendChild(li);
    return;
  }
  tasks.forEach((t, i) => {
    const li = document.createElement('li');
    li.className = t.done ? 'done' : '';
    const span = document.createElement('div');
    span.className = 'task-text';
    span.textContent = t.text;
    span.tabIndex = 0;
    span.addEventListener('keydown', (e) => {
      if(e.key === 'Enter') toggleDone(i);
    });

    const actions = document.createElement('div');
    actions.className = 'task-actions';

    const check = document.createElement('button');
    check.className = 'ghost';
    check.innerText = t.done ? '✅' : '✔️';
    check.title = t.done ? 'Desmarcar' : 'Marcar como feita';
    check.addEventListener('click', () => toggleDone(i));

    const del = document.createElement('button');
    del.className = 'ghost';
    del.innerText = '🗑️';
    del.title = 'Remover';
    del.addEventListener('click', () => {
      tasks.splice(i,1); save(); render();
    });

    actions.appendChild(check);
    actions.appendChild(del);

    li.appendChild(span);
    li.appendChild(actions);
    tasksEl.appendChild(li);
  });
}

function toggleDone(i){
  tasks[i].done = !tasks[i].done;
  save();
  render();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if(!text) return;
  tasks.unshift({text, done:false, created: Date.now()});
  input.value = '';
  save();
  render();
});

CLEAR_DONE.addEventListener('click', () => {
  tasks = tasks.filter(t => !t.done);
  save();
  render();
});

CLEAR_ALL.addEventListener('click', () => {
  if(!confirm('Deseja realmente limpar todas as tarefas?')) return;
  tasks = [];
  save();
  render();
});

// Load initial
const savedTasks = localStorage.getItem('theleaders:tasks');
if(savedTasks) {
  try{ tasks = JSON.parse(savedTasks) } catch(e){ tasks = []; }
}
render();

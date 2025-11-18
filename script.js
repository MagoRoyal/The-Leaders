/* -------------------- ELEMENTOS -------------------- */
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const clearAll = document.getElementById("clearAll");

const notifSound = document.getElementById("notifSound");
const themeToggle = document.getElementById("themeToggle");
const notifyBox = document.getElementById("notify");

const clock = document.getElementById("clock");
const alarmHour = document.getElementById("alarmHour");
const alarmMinute = document.getElementById("alarmMinute");
const setAlarm = document.getElementById("setAlarm");
const clearAlarm = document.getElementById("clearAlarm");
const alarmSound = document.getElementById("alarmSound");

let alarmTime = null;
let alarmActive = false;

/* -------------------- NOTIFICAÇÃO -------------------- */
function notify(msg, color = "var(--accent)") {
    notifyBox.textContent = msg;
    notifyBox.style.background = color;
    notifyBox.classList.add("show");

    setTimeout(() => notifyBox.classList.remove("show"), 2000);
}

/* -------------------- RELÓGIO -------------------- */
function updateClock() {
    const now = new Date();
    const options = { timeZone: "America/Sao_Paulo" };

    const time = new Date(now.toLocaleString("en-US", options));

    const h = String(time.getHours()).padStart(2, "0");
    const m = String(time.getMinutes()).padStart(2, "0");
    const s = String(time.getSeconds()).padStart(2, "0");

    clock.textContent = `${h}:${m}:${s}`;

    // Verificar despertador
    if (alarmActive && alarmTime === `${h}:${m}`) {
        alarmSound.play();
        notify("⏰ Despertador tocando!", "var(--danger)");
        alarmActive = false;
    }
}
setInterval(updateClock, 1000);

/* -------------------- CONFIGURAR DESPERTADOR -------------------- */
for (let i = 0; i < 24; i++) {
    const opt = document.createElement("option");
    opt.value = opt.textContent = String(i).padStart(2, "0");
    alarmHour.appendChild(opt);
}

for (let i = 0; i < 60; i++) {
    const opt = document.createElement("option");
    opt.value = opt.textContent = String(i).padStart(2, "0");
    alarmMinute.appendChild(opt);
}

setAlarm.onclick = () => {
    alarmTime = `${alarmHour.value}:${alarmMinute.value}`;
    alarmActive = true;
    notify(`Despertador ajustado para ${alarmTime} ✔`, "var(--success)");
};

clearAlarm.onclick = () => {
    alarmActive = false;
    alarmTime = null;
    notify("Despertador cancelado.", "var(--danger)");
};

/* -------------------- TAREFAS -------------------- */
window.onload = () => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    saved.forEach(text => addTask(text, false));
};

function addTask(text = null, playSound = true) {
    const taskText = text || taskInput.value.trim();
    if (!taskText) return notify("Digite uma tarefa!", "var(--danger)");

    const li = document.createElement("li");
    li.className = "task";
    li.textContent = taskText;

    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
        notify("Tarefa concluída ✔", "var(--success)");
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑";
    delBtn.className = "del";
    delBtn.onclick = () => {
        li.remove();
        saveTasks();
        notify("Tarefa removida", "var(--danger)");
    };

    li.appendChild(delBtn);
    taskList.appendChild(li);

    if (playSound) notifSound.play();

    taskInput.value = "";
    saveTasks();
    notify("Tarefa adicionada ✔");
}

addBtn.onclick = () => addTask();
clearAll.onclick = () => {
    taskList.innerHTML = "";
    saveTasks();
    notify("Lista limpa!", "var(--danger)");
};

function saveTasks() {
    const texts = [...document.querySelectorAll(".task")]
        .map(li => li.childNodes[0].textContent);

    localStorage.setItem("tasks", JSON.stringify(texts));
}

/* -------------------- TEMA -------------------- */
themeToggle.onclick = () => {
    document.body.classList.toggle("dark");
    themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
    notify("Tema alterado!");
};}

setAlarm.onclick = () => {
    alarmTime = `${alarmHour.value}:${alarmMinute.value}`;
    alarmActive = true;
    notify(`Despertador ajustado para ${alarmTime} ✔`, "var(--success)");
};

clearAlarm.onclick = () => {
    alarmActive = false;
    alarmTime = null;
    notify("Despertador cancelado.", "var(--danger)");
};

/* -------------------- TAREFAS -------------------- */
window.onload = () => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    saved.forEach(text => addTask(text, false));
};

function addTask(text = null, playSound = true) {
    const taskText = text || taskInput.value.trim();
    if (!taskText) return notify("Digite uma tarefa!", "var(--danger)");

    const li = document.createElement("li");
    li.className = "task";
    li.textContent = taskText;

    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
        notify("Tarefa concluída ✔", "var(--success)");
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑";
    delBtn.className = "del";
    delBtn.onclick = () => {
        li.remove();
        saveTasks();
        notify("Tarefa removida", "var(--danger)");
    };

    li.appendChild(delBtn);
    taskList.appendChild(li);

    if (playSound) notifSound.play();

    taskInput.value = "";
    saveTasks();
    notify("Tarefa adicionada ✔");
}

addBtn.onclick = () => addTask();
clearAll.onclick = () => {
    taskList.innerHTML = "";
    saveTasks();
    notify("Lista limpa!", "var(--danger)");
};

function saveTasks() {
    const texts = [...document.querySelectorAll(".task")]
        .map(li => li.childNodes[0].textContent);

    localStorage.setItem("tasks", JSON.stringify(texts));
}

/* -------------------- TEMA -------------------- */
themeToggle.onclick = () => {
    document.body.classList.toggle("dark");
    themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
    notify("Tema alterado!");
};

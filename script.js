const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const emptyMessage = document.querySelector("#empty-message");
const count = document.querySelector("#task-count");

let tasks = [];

function renderTasks() {
  list.innerHTML = "";

  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = `task-item ${task.done ? "done" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.setAttribute("aria-label", `Concluir ${task.title}`);
    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      renderTasks();
    });

    const title = document.createElement("span");
    title.textContent = task.title;

    const removeButton = document.createElement("button");
    removeButton.className = "delete-button";
    removeButton.type = "button";
    removeButton.textContent = "Excluir";
    removeButton.addEventListener("click", () => {
      tasks = tasks.filter((current) => current.id !== task.id);
      renderTasks();
    });

    item.append(checkbox, title, removeButton);
    list.append(item);
  });

  emptyMessage.hidden = tasks.length > 0;
  count.textContent = `${tasks.length} ${tasks.length === 1 ? "tarefa" : "tarefas"}`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = input.value.trim();
  if (!title) return;

  tasks.push({ id: Date.now(), title, done: false });
  input.value = "";
  renderTasks();
  input.focus();
});

renderTasks();

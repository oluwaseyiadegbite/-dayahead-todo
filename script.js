const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const count = document.getElementById("count");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
  list.innerHTML = "";
  tasks.forEach((task, i) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.done) li.classList.add("done");
    li.addEventListener("click", () => {
      task.done = !task.done;
      save();
      render();
    });
    const del = document.createElement("button");
    del.textContent = "X";
    del.addEventListener("click", (e) => {
      e.stopPropagation();
      tasks.splice(i, 1);
      save();
      render();
    });
    li.appendChild(del);
    list.appendChild(li);
  });
  const left = tasks.filter((t) => !t.done).length;
  count.textContent = left + " task(s) left";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  tasks.push({ text: input.value.trim(), done: false });
  input.value = "";
  save();
  render();
});

render();

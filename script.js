let todos = JSON.parse(localStorage.getItem("todos")) || [];

const elements = {
  todo: document.querySelector("#todo"),
  addBtn: document.querySelector(".add-btn"),
  ul: document.querySelector("ul"),
  crossIcon: document.querySelector(".cross-icon"),
};

elements.addBtn.addEventListener("click", () => {
  if (!elements.todo.value.trim()) return;
  todos.push({ title: elements.todo.value, isCompleted: false });
  localStorage.setItem("todos", JSON.stringify(todos));
  elements.todo.value = "";
  showTodos();
});

const whichIcon = (isCompleted) => isCompleted ? "./assets/images/checked.png" : "./assets/images/unchecked.png";

const showTodos = () => {
  elements.ul.innerHTML = "";
  if (todos.length === 0) {
    const noTodo = document.createElement("p");
    noTodo.innerText = "No todo available!!";
    noTodo.classList.add("noTodo");
    elements.ul.appendChild(noTodo);
  }
  for (let i = 0; i < todos.length; i++) {
    const { title, isCompleted } = todos[i];
    const todoList = document.createElement("div");
    todoList.classList.add("todo-list");
    todoList.innerHTML = `
      <div class="first-section" onclick="handleToggle(${i})">
        <div class="checked-unchecked-icon">
          <img src="${whichIcon(isCompleted)}" alt="Icon" />
        </div>
          <li class="${isCompleted && "strike-through"}">${title}</li>
      </div>
      <button class="cross-icon" onclick="handleDelete(${i})"}>
        <i class="fa-solid fa-x fa-xs"></i>
      </button>
    `;
    elements.ul.appendChild(todoList);
  }
};

const handleDelete = (id) => {
  todos = todos.filter((_, i) => id !== i);
  localStorage.setItem("todos", JSON.stringify(todos));
  showTodos();
};

const handleToggle = (id) => {
  todos = todos.map((todo, i) => {
    return i === id ? { ...todo, isCompleted: !todo.isCompleted } : todo;
  });
  localStorage.setItem("todos", JSON.stringify(todos));
  showTodos();
};

showTodos();
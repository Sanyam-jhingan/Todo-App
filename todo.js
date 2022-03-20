const todoForm = document.querySelector(".todo-form")
const todoInput = document.querySelector(".todo-input")
const todoItemsList = document.querySelector(".todo-items")

let todos = []

todoForm.addEventListener("submit", function (event) {
  event.preventDefault()
  addTodo(todoInput.value)
})

function addTodo(item) {
  if (item !== "") {
    const todo = {
      id: Date.now(),
      name: item,
      completed: false,
    }
    todos.push(todo)
    addToLocalStorage(todos)
    todoInput.value = ""
  }
}

getFromLocalStorage()

function renderTodos(todos) {
  todoItemsList.innerHTML = ""
  todos.forEach(function (item) {
    const checked = item.completed ? "checked" : null
    const li = document.createElement("li")
    li.setAttribute("class", "item")
    li.setAttribute("data-key", item.id)

    const checkbox_input_el = document.createElement("input")
    checkbox_input_el.classList.add("checkbox")
    checkbox_input_el.type = "checkbox"

    li.appendChild(checkbox_input_el)

    const label_el = document.createElement("LABEL")
    label_el.setAttribute("for", "customCheckboxInput")

    li.appendChild(label_el)

    const task_input_el = document.createElement("input")
    task_input_el.classList.add("text")
    task_input_el.type = "text"
    task_input_el.value = item.name
    task_input_el.setAttribute("readonly", "readonly")

    li.appendChild(task_input_el)

    const task_edit_el = document.createElement("button")
    task_edit_el.classList.add("edit-button")
    task_edit_el.innerText = "Edit"

    const task_delete_el = document.createElement("button")
    task_delete_el.classList.add("delete-button")
    task_delete_el.innerText = "Delete"

    li.appendChild(task_edit_el)
    li.appendChild(task_delete_el)
    if (item.completed === true) {
      li.classList.add("checked")
      checkbox_input_el.checked = true
    }
    todoItemsList.append(li)
  })
}

function editTodo(e) {
  if (e.innerText.toLowerCase() == "edit") {
    e.innerText = "Save"
    e.previousSibling.removeAttribute("readonly")
    e.previousSibling.focus()
    for (let index = 0; index < todos.length; index++) {
      if (todos[index]["name"] === e.previousSibling.value) {
        console.log(todos[index]["name"])
        delete todos[index]["name"]
        break
      }
    }
  } else {
    e.innerText = "Edit"
    e.previousSibling.setAttribute("readonly", "readonly")
    userEnteredValue = e.previousSibling.value
    for (let index = 0; index < todos.length; index++) {
      if (
        e.parentElement.getAttribute("data-key") == todos[index]["id"]
      ) {
        todos[index]["name"] = userEnteredValue
      }
    }
    addToLocalStorage(todos)
   }
}

function addToLocalStorage(todos) {
  localStorage.setItem("todos", JSON.stringify(todos))
  renderTodos(todos)
}

function getFromLocalStorage() {
  const reference = localStorage.getItem("todos")
  if (reference) {
    todos = JSON.parse(reference)
    renderTodos(todos)
  }
}

function toggle(id) {
  todos.forEach(function (item) {
    if (item.id == id) {
      item.completed = !item.completed
    }
  })
  addToLocalStorage(todos)
}

function deleteTodo(id) {
  todos = todos.filter(function (item) {
    return item.id != id
  })
  addToLocalStorage(todos)
}

todoItemsList.addEventListener("click", function (event) {
  if (event.target.type === "checkbox") {
    toggle(event.target.parentElement.getAttribute("data-key"))
  }
  if (event.target.classList.contains("delete-button")) {
    deleteTodo(event.target.parentElement.getAttribute("data-key"))
  }
  if (event.target.matches(".edit-button")) {
    editTodo(event.target)
  }
})

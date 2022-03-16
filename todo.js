window.addEventListener("load", () => {
  const form = document.querySelector("#new-task-form")
  const input = document.querySelector("#new-task-input")
  const addBtn = document.querySelector("#new-task-submit")
  const tasks = document.querySelector("#tasks")

  input.onkeyup = () => {
    let task = input.value

    if (task.trim() != 0) {
      addBtn.classList.add("active")
    } else {
      addBtn.classList.remove("active")
    }
  }

  showTasks()

  form.addEventListener("submit", e => {
    e.preventDefault()

    let task = input.value

    const task_el = document.createElement("div")
    task_el.classList.add("task")

    const task_content_el = document.createElement("div")
    task_content_el.classList.add("content")

    task_el.appendChild(task_content_el)

    const task_input_el = document.createElement("input")
    task_input_el.classList.add("text")
    task_input_el.type = "text"
    task_input_el.value = task
    task_input_el.setAttribute("readonly", "readonly")

    task_content_el.appendChild(task_input_el)

    const task_actions_el = document.createElement("div")
    task_actions_el.classList.add("actions")

    const task_edit_el = document.createElement("button")
    task_edit_el.classList.add("edit")
    task_edit_el.innerText = "Edit"

    const task_delete_el = document.createElement("button")
    task_delete_el.classList.add("delete")
    task_delete_el.innerText = "Delete"

    task_actions_el.appendChild(task_edit_el)
    task_actions_el.appendChild(task_delete_el)

    task_el.appendChild(task_actions_el)

    tasks.appendChild(task_el)

    let userEnteredValue = input.value //getting input field value
    let getLocalStorageData = localStorage.getItem("New Todo") //getting localstorage
    if (getLocalStorageData == null) {
      //if localstorage has no data
      listArray = [] //create a blank array
    } else {
      listArray = JSON.parse(getLocalStorageData) //transforming json string into a js object
    }
    listArray.push(userEnteredValue) //pushing or adding new value in array
    localStorage.setItem("New Todo", JSON.stringify(listArray))

    input.value = ""

    task_edit_el.addEventListener("click", e => {
      if (task_edit_el.innerText.toLowerCase() == "edit") {
        task_edit_el.innerText = "Save"
        task_input_el.removeAttribute("readonly")
        task_input_el.focus()
        let storedNames = JSON.parse(localStorage.getItem("New Todo"))
        //console.log(task_input_el.value)
        //console.log(storedNames)

        for (let index = 0; index < storedNames.length; index++) {
          if (storedNames[index] === task_input_el.value) {
            //console.log(index)
            storedNames.splice(index, 1)
            //console.log(storedNames)
            localStorage.setItem("New Todo", JSON.stringify(storedNames))
            break
          }
        }
      } else {
        task_edit_el.innerText = "Edit"
        task_input_el.setAttribute("readonly", "readonly")
        let storedNames = JSON.parse(localStorage.getItem("New Todo"))
        console.log(storedNames)
        userEnteredValue = task_input_el.value
        storedNames.push(userEnteredValue) //pushing or adding new value in array
        localStorage.setItem("New Todo", JSON.stringify(storedNames))
      }
    })

    task_delete_el.addEventListener("click", e => {
      tasks.removeChild(task_el)
      let storedNames = JSON.parse(localStorage.getItem("New Todo"))
      //console.log(task_input_el.value)
      //console.log(storedNames)

      for (let index = 0; index < storedNames.length; index++) {
        if (storedNames[index] === task_input_el.value) {
          //console.log(index)
          storedNames.splice(index, 1)
          //console.log(storedNames)
          localStorage.setItem("New Todo", JSON.stringify(storedNames))
          break
        }
      }
    })
  })

  function showTasks() {
    let getLocalStorageData = localStorage.getItem("New Todo")
    if (getLocalStorageData == null) {
      listArray = []
    } else {
      listArray = JSON.parse(getLocalStorageData)
    }
    listArray.forEach((element, index) => {
      const task_el = document.createElement("div")
      task_el.classList.add("task")

      const task_content_el = document.createElement("div")
      task_content_el.classList.add("content")

      task_el.appendChild(task_content_el)

      const task_input_el = document.createElement("input")
      task_input_el.classList.add("text")
      task_input_el.type = "text"
      task_input_el.value = element
      task_input_el.setAttribute("readonly", "readonly")

      task_content_el.appendChild(task_input_el)

      const task_actions_el = document.createElement("div")
      task_actions_el.classList.add("actions")

      const task_edit_el = document.createElement("button")
      task_edit_el.classList.add("edit")
      task_edit_el.innerText = "Edit"

      const task_delete_el = document.createElement("button")
      task_delete_el.classList.add("delete")
      task_delete_el.innerText = "Delete"

      task_actions_el.appendChild(task_edit_el)
      task_actions_el.appendChild(task_delete_el)

      task_el.appendChild(task_actions_el)

      tasks.appendChild(task_el)

      task_edit_el.addEventListener("click", e => {
        if (task_edit_el.innerText.toLowerCase() == "edit") {
          task_edit_el.innerText = "Save"
          task_input_el.removeAttribute("readonly")
          task_input_el.focus()
          let storedNames = JSON.parse(localStorage.getItem("New Todo"))
          //console.log(task_input_el.value)
          //console.log(storedNames)

          for (let index = 0; index < storedNames.length; index++) {
            if (storedNames[index] === task_input_el.value) {
              //console.log(index)
              storedNames.splice(index, 1)
              //console.log(storedNames)
              localStorage.setItem("New Todo", JSON.stringify(storedNames))
              break
            }
          }
        } else {
          task_edit_el.innerText = "Edit"
          task_input_el.setAttribute("readonly", "readonly")
          let storedNames = JSON.parse(localStorage.getItem("New Todo"))
          //console.log(task_input_el.value)
          userEnteredValue = task_input_el.value
          storedNames.push(userEnteredValue) //pushing or adding new value in array
          localStorage.setItem("New Todo", JSON.stringify(storedNames))
        }
      })

      task_delete_el.addEventListener("click", e => {
        tasks.removeChild(task_el)
        let storedNames = JSON.parse(localStorage.getItem("New Todo"))
        //console.log(task_input_el.value)
        //console.log(storedNames)

        for (let index = 0; index < storedNames.length; index++) {
          if (storedNames[index] === task_input_el.value) {
            //console.log(index)
            storedNames.splice(index, 1)
            //console.log(storedNames)
            localStorage.setItem("New Todo", JSON.stringify(storedNames))
            break
          }
        }
      })
    })

    // task_edit_el.innerHTML = newLiTag;

    input.value = "" //once task added leave the input field blank
  }
})

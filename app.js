const todoInput = document.querySelector(".todo-input")
const todoBtn = document.querySelector(".todo-btn")
const todoList = document.querySelector(".todo-list")
const filterOption = document.querySelector(".filter-todo")

document.addEventListener("DOMContentLoaded",getTodos)
todoBtn.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteCheck)
filterOption.addEventListener("click", filterTodo)

function addTodo(e) {
    //ngăn hành vi default
    e.preventDefault()

    //tạo div chứa todo
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")

    //tạo li
    const newTodo = document.createElement("li")
    newTodo.innerText = todoInput.value
    newTodo.classList.add("todo-item")
    todoDiv.appendChild(newTodo)

    //thêm todo vào localStorage
    saveLocalTodos(todoInput.value)

    //nút check
    const completedBtn = document.createElement("button")
    completedBtn.innerHTML = `<i class='fas fa-check'></i>`
    completedBtn.classList.add("complete-btn")
    todoDiv.appendChild(completedBtn)

    //nút xoá
    const trashedBtn = document.createElement("button")
    trashedBtn.innerHTML = `<i class='fas fa-trash'></i>`
    trashedBtn.classList.add("trash-btn")
    todoDiv.appendChild(trashedBtn)

    //append vào list
    todoList.appendChild(todoDiv)
    
    //clear input
    todoInput.value = ""
}

function deleteCheck(e) {
    const item = e.target

    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement
        todo.classList.add("fall")
        removeLocalTodos(todo)
        todo.addEventListener("transitionend", () => {
            todo.remove()
        })
    }

    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement
        todo.classList.toggle("completed")
        filterTodo()
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes

    todos.forEach(function (todo) {

        switch (filterOption.value) {
            case "all":
                todo.style.display = "flex"
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex"
                } else {
                    todo.style.display = "none"
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex"
                } else {
                    todo.style.display = "none"
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    let todos
    if (localStorage.getItem("todos")===null) {
        todos=[]
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo)
    localStorage.setItem("todos",JSON.stringify(todos))
}

function getTodos(){
    let todos
    if (localStorage.getItem("todos")===null) {
        todos=[]
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach(function(todo){
        //tạo div chứa todo
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")

    //tạo li
    const newTodo = document.createElement("li")
    newTodo.innerText = todo
    newTodo.classList.add("todo-item")
    todoDiv.appendChild(newTodo)

    //nút check
    const completedBtn = document.createElement("button")
    completedBtn.innerHTML = `<i class='fas fa-check'></i>`
    completedBtn.classList.add("complete-btn")
    todoDiv.appendChild(completedBtn)

    //nút xoá
    const trashedBtn = document.createElement("button")
    trashedBtn.innerHTML = `<i class='fas fa-trash'></i>`
    trashedBtn.classList.add("trash-btn")
    todoDiv.appendChild(trashedBtn)

    //append vào list
    todoList.appendChild(todoDiv)
    })
}

function removeLocalTodos(todo){
    let todos
    if (localStorage.getItem("todos")===null) {
        todos=[]
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex),1)
    localStorage.setItem("todos",JSON.stringify(todos))
}
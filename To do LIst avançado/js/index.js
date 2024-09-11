const taskInput = document.querySelector('#task-input');
const btnTaskInput = document.querySelector("#add-task-btn");

const editTaks = document.querySelector("#edit-task");
const editInputTask = document.querySelector("#edit-input");
const saveEditBtn = document.querySelector("#set-edit-btn");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

const searchInput = document.querySelector("#search-input");

const searchRemove = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

const containerList = document.querySelector("#todo-list");
const listOfh3 = document.querySelector("#todo-list todo");

function addTask(e) {
    e.preventDefault();
    const valueTaskInput = taskInput.value;

    if (valueTaskInput === "") return;

    const div = document.createElement('div');
    div.className = "todo";

    const h3 = document.createElement('h3');
    h3.textContent = valueTaskInput;

    const btnFinish = document.createElement('button');
    btnFinish.className = 'finish-todo';
    btnFinish.innerHTML = '<i class="fas fa-check"></i>';

    const btnEdit = document.createElement('button');
    btnEdit.className = 'edit-todo';
    btnEdit.innerHTML = '<i class="fa-solid fa-pen"></i>';

    const btnRemove = document.createElement('button');
    btnRemove.className = 'remove-todo';
    btnRemove.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    containerList.appendChild(div);
    div.appendChild(h3);
    div.appendChild(btnFinish);
    div.appendChild(btnEdit);
    div.appendChild(btnRemove);

    taskInput.focus();

    // Eventos de botões das tarefas
    btnFinish.addEventListener("click", () => {
        div.classList.add("done");
    });

    btnEdit.addEventListener("click", () => {
        editTodo(h3);
        editTaks.classList.remove("hide");
    });

    btnRemove.addEventListener("click", () => {
        removeTodo(div);
    });
}

btnTaskInput.addEventListener("click", (e) => {
    addTask(e);
    taskInput.value = X"";
});

function editTodo(input){

    editInputTask.value = "";

    saveEditBtn.addEventListener("click", (e)=>{
        e.preventDefault();
        
        input.textContent = editInputTask.value
        editTaks.classList.add("hide");

    })
    
    cancelEditBtn.addEventListener("click", (e)=>{  
        e.preventDefault();
      
        editTaks.classList.add("hide");
    })
}


function removeTodo(div) {
    containerList.removeChild(div);
    taskInput.value = "";
}

searchInput.addEventListener( "keyup", (e)=>{

    const search = e.target.value;

    getSearchTodos(search);

});

//fazer filtro para ter toda a lista, ter só os feitos e ter só os para fazer

filterBtn.addEventListener("change", (e) => {
    const filterValue = e.target.value;

    filterTodos(filterValue);

})

console.log("TESTE");

const filterTodos = (filterValue) => {

    const todos = document.querySelectorAll(".todo");
    switch (filterValue) {
        case "all":
            todos.forEach((todo) =>
                todo.style.display = "flex"
            );
            break;
    
        case "done":
            todos.forEach((todo) =>
                todo.classList.contains("done")
                 ? (todo.style.display = "flex") 
                 : (todo.style.display = "none")
            );
            break;
        case "undone":
            todos.forEach((todo) =>
                !todo.classList.contains("done")
                    ? (todo.style.display = "flex") 
                    : (todo.style.display = "none")
            );
            break;

        default:
            break;
    }

}

//pesquisar dentre as tasks a pedida
const getSearchTodos = (search) => {
    let todos = document.querySelectorAll(".todo");


    todos.forEach((todo)=>{
        let todoTitle = todo.querySelector("h3").innerText.toLowerCase(); 

        const normalizedSearching = search.toLowerCase();

        todo.style.display="flex";

        if(!todoTitle.includes(normalizedSearching)){
            todo.style.display="none";
        }

    })
};

//localStorage

const getTodosLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || []

    return todos;
}

const saveTodoLocalStorage = (todo) =>{

    const todos = getTodosLocalStorage()
    todos.push(todo)
    localStorage.setItem("todos",JSON.stringify(todos))
}
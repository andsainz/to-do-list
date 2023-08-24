const inputTitle = document.querySelector('#title--input')
const inputDescription = document.querySelector('#description--input')
const inputId = document.querySelector('#id--input')
const addBtn = document.querySelector('.btn--add')

//SHOW TASK, GET
async function showTasks () {

    let result = await fetch("http://localhost:3000/tasks")
    let data = await result.json()

    data.forEach(task => {
        
        const li = document.createElement('li');
        const textTitle = document.createElement('p')
        const textDescription = document.createElement('p')
        
        li.innerHTML = `
        <input type="checkbox" class="taskCheckbox" data-id="${task.id}" ${task.completed ? 'checked' : ''} onchange="updateCompletedTask(${task.id}, this.checked)">
        <span>
        <h3>${task.title}</h3>
        <p>${task.description}<p>
        </span>
        <img class="buttons" id="editTask--btn" src="images/draw.png" onclick="editTask(${task.id})">
        <img class="buttons" id="removeTask--btn" src="images/close.png" onclick="removeTask(${task.id})">`
        li.appendChild(textTitle);
        li.appendChild(textDescription);
        ul.appendChild(li);
    });
}

document.addEventListener("DOMContentLoaded", showTasks)

//ADD TASK, POST
addBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const textTitle = inputTitle.value;
    const textDescription = inputDescription.value;


if(!inputId.value) {
        if(textTitle !== '' && textDescription !== ''){
            console.log(textTitle, textDescription)
            const response = await fetch ('http://localhost:3000/tasks', {
                method: 'POST',
                headers: {
                "Content-Type":"application/json"
                },
                body:JSON.stringify({
                
                title: textTitle,
                description: textDescription,
                createdAt: textDate,
                completed: false
                })
            });
        }
} else {
    const textId = inputId.value;
    const response = await fetch (`http://localhost:3000/tasks/${textId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: textTitle,
            description: textDescription
        })
    })
}

inputTitle.value = ""; //el input se queda en blanco
inputDescription.value= "";

});

//EDIT TASK, PUT
async function editTask(id){

    let result = await fetch(`http://localhost:3000/tasks/${id}`)
    let data = await result.json()
    inputTitle.value = data.title;
    inputDescription.value = data.description;
    inputId.value = data.id;
}


//REMOVE TASK, DELETE
async function removeTask (id){
    let result = await fetch("http://localhost:3000/tasks")
    let data = await result.json()

    data.forEach( async task =>{
        if( id === task.id){
            const response = await fetch (`http://localhost:3000/tasks/${id}`, {
            method: 'DELETE',
            })
        }
    })
}

//MARCAR UNA TAREA COMO COMPLETADA CON CHECKBOX
async function updateCompletedTask(id, completed){
    let result = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...task,
                    completed})
    })
}


//FILTRAR TAREAS
async function showFilteredTasks() {
    const ul = document.querySelector('ul');
    const select = document.querySelector('#filter');
    let filterBy = select.value;
    
    let tasks = await (await fetch(`http://localhost:3000/tasks`)).json();


    if (filterBy === 'pending') {
        tasks = tasks.filter(task => !task.completed);
    } else if (filterBy === 'completed') {
        tasks = tasks.filter(task => task.completed);
    }

    ul.innerHTML = '';

    // Mostrar las tareas filtradas
    tasks.forEach(task => {
        const li = document.createElement('li');
        const textTitle = document.createElement('p');
        const textDescription = document.createElement('p');
        
        li.innerHTML = `
            <div class="text--container">
            <input type="checkbox" class="taskCheckbox" data-id="${task.id}" ${task.completed ? 'checked' : ''} onchange="updateCompletedTask(${task.id}, this.checked)">
            <span>
                <h3>${task.title}</h3>
                <p>${task.description}</p>
            </span>
            </div>
            <div class="tools--container">
            <img class="buttons" id="editTask--btn" src="images/draw.png" onclick="editTask(${task.id})">
            <img class="buttons" id="removeTask--btn" src="images/close.png" onclick="removeTask(${task.id})">
            </div>`;

        li.appendChild(textTitle);
        li.appendChild(textDescription);
        ul.appendChild(li);
    });
}

// Agregar event listener al elemento select
const select = document.querySelector('#filter');
select.addEventListener('change', showFilteredTasks);

// Mostrar todas las tareas al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    showFilteredTasks();
});


//FECHA
/* let today = new Date()
let now = today.toLocaleString */
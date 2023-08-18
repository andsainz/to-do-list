const input = document.querySelector('input')
const addBtn = document.querySelector('.btn--add')
const ul = document.querySelector('ul')

//SHOW TASK, GET
async function showTasks () {

    let result = await fetch("http://localhost:3000/tasks")
    let data = await result.json()

    data.forEach(task => {
        
        const li = document.createElement('li');
        const p = document.createElement('p')
        const textDescription = document.createElement('p')
        
        li.innerHTML = `${task.title}<br>${task.description}<img id="editTask--btn" src="images/draw.png" onclick="editTask(${task.id})"><img id="removeTask--btn" src="images/close.png" onclick="removeTask(${task.id})">`
        li.appendChild(p);
        li.appendChild(textDescription);
        ul.appendChild(li);
    });
}

document.addEventListener("DOMContentLoaded", showTasks)

//ADD TASK, POST
addBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const text = input.value;
        if(text !== ''){
    const li = document.createElement('li');
    const p = document.createElement('p')
    p.textContent = text;
    li.appendChild(p);
    ul.appendChild(li);

    input.value = ""; //el input se queda en blanco
    empty.style.display = "none";
    

    const response = await fetch ('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            
            title: text,
            description: textDescription
        
        })
    });
}
});

//EDIT TASK, PUT
async function editTask(id){
    let nameTask = prompt("Edita la tarea")

    let result = await fetch("http://localhost:3000/tasks")
    let data = await result.json()

    data.forEach( async task =>{
        if( id === task.id){
            const response = await fetch (`http://localhost:3000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                ...task,
                title: nameTask,
                description: textDescription
            
            })
        });
        }
    })
}


//DELETE TASK, DELETE
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
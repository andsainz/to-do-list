const inputTitle = document.querySelector('#title--input')
const inputDescription = document.querySelector('#description--input')
const inputId = document.querySelector('#id--input')
const addBtn = document.querySelector('.btn--add')
const ul = document.querySelector('ul')

//SHOW TASK, GET
async function showTasks () {

    let result = await fetch("http://localhost:3000/tasks")
    let data = await result.json()

    data.forEach(task => {
        
        const li = document.createElement('li');
        const textTitle = document.createElement('p')
        const textDescription = document.createElement('p')
        
        li.innerHTML = `<h1>${task.title}</h1><br><p>${task.description}<p><img id="editTask--btn" src="images/draw.png" onclick="editTask(${task.id})"><img id="removeTask--btn" src="images/close.png" onclick="removeTask(${task.id})">`
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
    const textId = inputId.value;

if(textId === '') {
    console.log(textId)
        if(textTitle !== '' && textDescription !== ''){
            console.log(textTitle, textDescription)
    const response = await fetch ('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            
            title: textTitle,
            description: textDescription
        
        })
    });
}
else{
    
    
    const response = await fetch (`http://localhost:3000/tasks/${textId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: inputTitle,
            description: inputDescription
        })
    })
}
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
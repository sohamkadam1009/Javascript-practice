const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

function toGetToDos(){
    fetch(apiUrl + '?_limit=10')
    // .then(data => console.log(data))
    .then(response => {
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => data.forEach(element => {
        addTodoToDOM(element);
    })
    )
    .catch(error => console.error('Error:', error))

};
// This function is used to create a div with the class tod and we are appending title of the todo inside that div and setting the attribute id with the value data-id
function addTodoToDOM(todo){//passing data array
    const div = document.createElement('div');
    div.classList.add('todo');
    div.appendChild(document.createTextNode(todo.title));
    div.setAttribute('data-id',todo.id);
    
    if(todo.completed){
        div.classList.add('done');
    }

    document.getElementById('todo-list').appendChild(div);
};

function updateTodos(event){
    if(event.target.classList.contains('todo')){
        event.target.classList.toggle('done');
    }

    updateTodoDOM(event.target.dataset.id,event.target.classList.contains('done'))
}

function updateTodoDOM(id,completed){
  
        fetch(`${apiUrl}/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ completed }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
            if(!response.ok){
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => console.error('Error',error));
};

function additem(event){
    event.preventDefault();

    if(event.target.firstElementChild.value.trim() === ''){
        alert('Please enter a todo item');
        return;
    }

    const data = {
        title: event.target.firstElementChild.value,
        completed: false
    }

    fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      .then(response => {
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => addTodoToDOM(data))
    .catch(error => console.error('Error',error));

    event.target.firstElementChild.value = '';

};

function deleteTodo(event){
    let deletedElement = event.target.classList.contains('todo');
    if(deletedElement){
        const id = event.target.dataset.id;
        fetch(`${apiUrl}/${id}`, {
          method: 'DELETE',
        })
        .then(response =>response.json())
        .then(() => event.target.remove())
        .catch(error => console.error('Error',error));
    }
}

// toGetToDos();

function init(){
    document.addEventListener('DOMContentLoaded',toGetToDos);
    document.querySelector('#todo-list').addEventListener('click',updateTodos);
    document.querySelector('#todo-form').addEventListener('submit',additem);
    document.querySelector('#todo-list').addEventListener('dblclick',deleteTodo);

}

init();



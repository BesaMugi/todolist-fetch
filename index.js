const buttonTodo= document.getElementById('addTodoBtn')
const input = document.getElementById('newTodoInput');

let todoli = []

async function fetchTodo(){
    todoli = await fetch('https://jsonplaceholder.typicode.com/todos')
    .then(res => res.json())
    .then(data => data)
    getTodo(todoli)
}

fetchTodo()

function getTodo(todoList){
    const list = document.getElementById('todoList');
    list.textContent = '';
        for (let i = 0; i < todoList.length; i++) {
            const listItem = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todoList[i].completed;
            list.appendChild(checkbox);
            checkbox.addEventListener('change', (e) => {
                checkBoxTodo(todoList[i].id, checkbox);
            });
            
            const deleteBtn = document.createElement('button');
            deleteBtn.id = 'deleteBtn';
            deleteBtn.textContent = 'X';
            deleteBtn.addEventListener('click', (e) => {
                deleteTodo(todoList[i], deleteBtn.parentElement)
            })

            const todoText = document.createElement('span');
            todoText.textContent = todoList[i].title;
            
            listItem.append(checkbox,todoText,deleteBtn);
            list.appendChild(listItem);
        }
};

// доработать функцию которая будет добавлять новую задачу в API и обновлять Todo List
function addTodo(){
    fetch("https://jsonplaceholder.typicode.com/todos", {
        method: 'POST',
        body: JSON.stringify({title: input.value, completed: false}),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then(res => res.json())
    .then(data => {
        if (input.value.trim() === "") {
            return null;
        }
        todoli.unshift(data)
        getTodo(todoli)
        input.value = ''
    })
};


function deleteTodo(id, li){
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE'
    })
    .then(res => {
        console.log(res);
        if(res){
            li.remove()
        }
    })
}

buttonTodo.addEventListener("click", (e) => {
    e.preventDefault();
    addTodo();
});

function checkBoxTodo(todoId, checkbox){
    fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
        method: 'PATCH',
        body: JSON.stringify({completed: checkbox.checked}),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
}
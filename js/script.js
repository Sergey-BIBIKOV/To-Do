'use strict'

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let toDoData = [];

const storage = function () {
    if (localStorage.getItem('toDoStorage') != null) {
        toDoData = JSON.parse(localStorage.getItem('toDoStorage'));
        render();
    }
}

const render = function () {
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';

    toDoData.forEach(function (item) {
        const li = document.createElement('li')

        li.classList.add('todo-item')

        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';

        if (item.completed) {
            todoCompleted.append(li)
        } else {
            todoList.append(li)
        }

        li.querySelector('.todo-complete').addEventListener('click', function () {
            item.completed = !item.completed;
            render();
        })
        li.querySelector('.todo-remove').addEventListener('click', function () {
            const index = toDoData.indexOf(item);
            toDoData.splice(index, 1);
            render();
        })
    })
    localStorage.setItem('toDoStorage', JSON.stringify(toDoData));
}

todoControl.addEventListener('submit', function (event) {
    event.preventDefault()

    if (headerInput.value.trim() != '') {
        const newToDo = {
            text: headerInput.value,
            completed: false
        }

        toDoData.push(newToDo);
        headerInput.value = '';

        render()
    }
})

storage();

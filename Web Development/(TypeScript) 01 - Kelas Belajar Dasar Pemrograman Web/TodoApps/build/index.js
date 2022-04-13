"use strict";
const todos = [];
const RENDER_EVENT = 'render-todo';
const generatedId = () => {
    return new Date();
};
const generateTodoObject = (id, task, timestamp, isCompleted) => {
    return { id, task, timestamp, isCompleted };
};
const addTodo = () => {
    const textTodo = document.getElementById('title').value;
    const timestamp = document.getElementById('date').value;
    const id = generatedId();
    const todoObject = generateTodoObject(id, textTodo, timestamp, false);
    todos.push(todoObject);
    document.dispatchEvent(new Event(RENDER_EVENT));
};
const findTodo = (todoId) => {
    for (const todoItem of todos) {
        if (todoItem.id === todoId) {
            return todoItem;
        }
    }
    return null;
};
const addTaskToCompleted = (todoId) => {
    const todoTarget = findTodo(todoId);
    if (todoTarget == null)
        return;
    todoTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
};
const findTodoIndex = (todoId) => {
    const index = todos.findIndex(x => x.id == todoId);
    return index >= 0 ? index : -1;
};
const removeTaskFromCompleted = (todoId) => {
    const todoTarget = findTodoIndex(todoId);
    if (todoTarget === -1)
        return;
    todos.splice(todoTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
};
const undoTaskFromCompleted = (todoId) => {
    const todoTarget = findTodo(todoId);
    if (todoTarget == null)
        return;
    todoTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
};
const makeTodo = (todoObject) => {
    const textTitle = document.createElement('h2');
    textTitle.innerText = todoObject.task;
    const textTimestamp = document.createElement('p');
    textTimestamp.innerText = todoObject.timestamp;
    const textContainer = document.createElement('div');
    textContainer.classList.add('inner');
    textContainer.append(textTitle, textTimestamp);
    const container = document.createElement('div');
    container.classList.add('item', 'shadow');
    container.append(textContainer);
    container.setAttribute('id', `todo-${todoObject.id}`);
    if (todoObject.isCompleted) {
        const undoButton = document.createElement('button');
        undoButton.classList.add('undo-button');
        undoButton.addEventListener('click', function () {
            undoTaskFromCompleted(todoObject.id);
        });
        const trashButton = document.createElement('button');
        trashButton.classList.add('trash-button');
        trashButton.addEventListener('click', function () {
            removeTaskFromCompleted(todoObject.id);
        });
        container.append(undoButton, trashButton);
    }
    else {
        const checkButton = document.createElement('button');
        checkButton.classList.add('check-button');
        checkButton.addEventListener('click', function () {
            addTaskToCompleted(todoObject.id);
        });
        container.append(checkButton);
    }
    return container;
};
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form === null || form === void 0 ? void 0 : form.addEventListener('submit', function (event) {
        event.preventDefault();
        addTodo();
    });
});
document.addEventListener(RENDER_EVENT, function () {
    console.log(todos);
    const uncompletedTodoList = document.getElementById('todos');
    uncompletedTodoList.innerHTML = '';
    const completedTodoList = document.getElementById('completed-todos');
    completedTodoList.innerHTML = '';
    for (const todoItem of todos) {
        const todoElement = makeTodo(todoItem);
        if (!todoItem.isCompleted)
            uncompletedTodoList.append(todoElement);
        else
            completedTodoList.append(todoElement);
    }
});

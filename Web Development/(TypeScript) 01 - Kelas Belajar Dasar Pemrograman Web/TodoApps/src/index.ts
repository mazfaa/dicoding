"use strict"
interface Todos {
  id: Date,
  task: string,
  timestamp: string,
  isCompleted: boolean
}

const todos: Todos[] = [];
const RENDER_EVENT: string = 'render-todo';

const generatedId = () :Date => {
  return new Date();
}

const generateTodoObject = (id: Date, task: string, timestamp: string, isCompleted: boolean) => {
  return {id, task, timestamp, isCompleted};
}

const addTodo = () => {
  const textTodo: string|null|undefined = (<HTMLInputElement>document.getElementById('title')).value
  const timestamp: string|null = (<HTMLInputElement>document.getElementById('date')).value
  const id = generatedId()
  const todoObject = generateTodoObject(id, textTodo, timestamp, false);
  todos.push(todoObject);
  document.dispatchEvent(new Event(RENDER_EVENT))
}

const findTodo = (todoId: Date): Todos|null => {
  for (const todoItem of todos) {
    if (todoItem.id === todoId) {
      return todoItem;
    }
  }
  return null;
}

const addTaskToCompleted = (todoId: Date) => {
  const todoTarget = findTodo(todoId);
  if (todoTarget == null) return;
  
  todoTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
}

const findTodoIndex = (todoId: Date) : number => {
  const index: number = todos.findIndex(x => x.id == todoId)
  return index >= 0 ? index : -1;
}

const removeTaskFromCompleted = (todoId: Date) => {
  const todoTarget: number = findTodoIndex(todoId);
  if (todoTarget === -1) return;
  todos.splice(todoTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
}

const undoTaskFromCompleted = (todoId: Date) => {
  const todoTarget = findTodo(todoId);
  if (todoTarget == null) return;
  todoTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
}

const makeTodo = (todoObject: Todos): HTMLDivElement => {
  const textTitle: HTMLHeadingElement = document.createElement('h2');
  textTitle.innerText = todoObject.task;

  const textTimestamp: HTMLParagraphElement = document.createElement('p');
  textTimestamp.innerText = todoObject.timestamp;

  const textContainer: HTMLDivElement = document.createElement('div');
  textContainer.classList.add('inner');
  textContainer.append(textTitle, textTimestamp);

  const container: HTMLDivElement = document.createElement('div');
  container.classList.add('item', 'shadow');
  container.append(textContainer);
  container.setAttribute('id', `todo-${todoObject.id}`);

  if (todoObject.isCompleted) {
    const undoButton: HTMLButtonElement = document.createElement('button');
    undoButton.classList.add('undo-button');
    undoButton.addEventListener('click', function () {
      undoTaskFromCompleted(todoObject.id);
    });

    const trashButton: HTMLButtonElement = document.createElement('button');
    trashButton.classList.add('trash-button');
    trashButton.addEventListener('click', function () {
      removeTaskFromCompleted(todoObject.id);
    });

    container.append(undoButton, trashButton);
  } else {
    const checkButton = document.createElement('button');
    checkButton.classList.add('check-button');
    checkButton.addEventListener('click', function () {
      addTaskToCompleted(todoObject.id);
    });

    container.append(checkButton);
  }

  return container;
}

document.addEventListener('DOMContentLoaded', function () {
  const form: HTMLElement|null = (<HTMLFormElement>document.getElementById('form'));
  form?.addEventListener('submit', function (event) {
    event.preventDefault();
    addTodo();
  });
});

document.addEventListener(RENDER_EVENT, function () {
  console.log(todos);
  const uncompletedTodoList: HTMLElement|null = (<HTMLDivElement>document.getElementById('todos'));
  uncompletedTodoList.innerHTML = '';

  const completedTodoList: HTMLElement|null = (<HTMLDivElement>document.getElementById('completed-todos'));
  completedTodoList.innerHTML = '';

  for (const todoItem of todos) {
    const todoElement: HTMLDivElement = makeTodo(todoItem);
    if (!todoItem.isCompleted) 
      uncompletedTodoList.append(todoElement);
    else
      completedTodoList.append(todoElement);
  }
});

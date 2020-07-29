import { getTodos } from '../services';

export const CREATE_TODO = 'CREATE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const APPEND_TODO = 'APPEND_TODO';

export const createTodo = (todoItem) => {
  return {
    type: CREATE_TODO,
    payload: todoItem,
  };
};

export const updateTodo = (todoItem) => {
  return {
    type: UPDATE_TODO,
    payload: todoItem,
  };
};

export const deleteTodo = (todoItem) => {
  return {
    type: DELETE_TODO,
    payload: todoItem,
  };
};

export const appendTodos = (todoItems) => {
  return {
    type: APPEND_TODO,
    payload: todoItems,
  };
};

// READ MORE AT: https://stackoverflow.com/a/34599594/5022624

// Asycn Action creator
export const loadTodos = (dispatch, url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => dispatch(appendTodos(data)));
};

export const loadTodosByCustomMiddleware = (url) => {
  // this inner function gets called by custom middleware from store.js with store.dispatch and store.getState
  return (dispatch) => {
    // loadTodosByCustomMiddleware
    return fetch(url)
      .then((response) => response.json())
      .then((data) => dispatch(appendTodos(data)));
  };
};

export const loadTodosByThunk = () => {
  return (dispatch) => {
    // loadTodosByThunk
    return getTodos()
      .then((response) => response.json())
      .then((data) => dispatch(appendTodos(data)));
  };
};

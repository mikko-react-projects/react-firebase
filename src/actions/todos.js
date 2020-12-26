import {
  ADD_TODO,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILURE,
  FETCH_TODOS,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
  DELETE_TODO,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAILURE,
  UPDATE_TODO,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAILURE
} from '../constants/actionTypes';

export const addTodo = new_todo => ({
  type: ADD_TODO,
  new_todo
})

export const addTodoSuccess = (id, todo, date) => ({
  type: ADD_TODO_SUCCESS,
  id,
  todo,
  date
})

export const addTodoFailure = error => ({
  type: ADD_TODO_FAILURE,
  error
})

export const fetchTodos = () => ({
  type: FETCH_TODOS
})

export const fetchTodosSuccess = data => ({
  type: FETCH_TODOS_SUCCESS,
  data
})

export const fetchTodosFailure = error => ({
  type: FETCH_TODOS_FAILURE,
  error
})

export const deleteTodo = id => ({
  type: DELETE_TODO,
  id
})

export const deleteTodoSuccess = id => ({
  type: DELETE_TODO_SUCCESS,
  id
})

export const deleteTodoFailure = error => ({
  type: DELETE_TODO_FAILURE,
  error
})

export const updateTodo = index => ({
  type: UPDATE_TODO,
  index
})

export const updateTodoSuccess = index => ({
  type: UPDATE_TODO_SUCCESS,
  index
})

export const updateTodoFailure = error => ({
  type: UPDATE_TODO_FAILURE,
  error
})

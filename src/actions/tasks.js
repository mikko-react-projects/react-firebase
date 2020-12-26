import {
  ADD_TASK,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAILURE,
  FETCH_TASKS,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  DELETE_TASK,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  UPDATE_TASK,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILURE,
} from '../constants/actionTypes';

export const addTask = task => ({
  type: ADD_TASK,
  task
})

export const addTaskSuccess = payload => ({
  type: ADD_TASK_SUCCESS,
  payload
})

export const addTaskFailure = error => ({
  type: ADD_TASK_FAILURE,
  error
})

export const fetchTasks = () => ({
  type: FETCH_TASKS
})

export const fetchTasksSuccess = tasks => ({
  type: FETCH_TASKS_SUCCESS,
  tasks
})

export const fetchTasksFailure = error => ({
  type: FETCH_TASKS_FAILURE,
  error
})

export const deleteTask = id => ({
  type: DELETE_TASK,
  id
})

export const deleteTaskSuccess = id => ({
  type: DELETE_TASK_SUCCESS,
  id
})

export const deleteTaskFailure = error => ({
  type: DELETE_TASK_FAILURE,
  error
})

export const updateTask = update => ({
  type: UPDATE_TASK,
  update
})

export const updateTaskSuccess = (id, new_task) => ({
  type: UPDATE_TASK_SUCCESS,
  id,
  new_task
})

export const updateTaskFailure = error => ({
  type: UPDATE_TASK_FAILURE,
  error
})

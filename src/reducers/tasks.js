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

const initialState = {
  tasks: [],
  task: [],
  id: '',
  update: [],
  loading: false,
  success: false,
  error: []
}

export default function tasks (state = initialState, action) {
  switch(action.type) {
    case ADD_TASK:
      return {
        ...state,
        task: action.task,
        loading: true,
        success: false,
        error: []
      }
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        loading: false,
        success: true,
        error: []
      }
    case ADD_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case FETCH_TASKS:
      return {
        ...state,
        loading: true,
        success: false,
        error: []
      }
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.tasks,
        loading: false,
        success: true,
        error: []
      }
    case FETCH_TASKS_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case DELETE_TASK:
      return {
        ...state,
        id: action.id,
        loading: true,
        success: false,
        error: []
      }
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks].filter(x => {
          return x.id !== action.id
        }),
        loading: false,
        success: true,
        error: []
      }
    case DELETE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case UPDATE_TASK:
      return {
        ...state,
        update: action.update,
        loading: true,
        success: false,
        error: []
      }
    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.id ? [...task.tasks, action.new_task] : task
        ),
        loading: false,
        success: true,
        error: []
      }
    case UPDATE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    default:
      return state;
  }
}

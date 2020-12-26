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

const initialState = {
  data: [],
  new: '',
  id: '',
  index: '',
  loading: false,
  success: false,
  error: []
}

export default function todos (state = initialState, action) {
  switch(action.type) {
    case ADD_TODO:
      return {
        ...state,
        new: action.new_todo,
        loading: true,
        success: false,
        error: []
      }
    case ADD_TODO_SUCCESS:
      const pload = {
        id: action.id,
        todo: action.todo,
        done: false,
        date: {
          seconds: action.date
        }
      }
      return {
        ...state,
        data: [...state.data, pload],
        loading: false,
        success: true,
        error: []
      }
    case ADD_TODO_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case FETCH_TODOS:
      return {
        ...state,
        loading: true,
        success: false,
        error: []
      }
    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
        success: true,
        error: []
      }
    case FETCH_TODOS_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case DELETE_TODO:
      return {
        ...state,
        id: action.id,
        loading: true,
        success: false,
        error: []
      }
    case DELETE_TODO_SUCCESS:
      return {
        ...state,
        data: [...state.data].filter(x => {
          return x.id !== action.id
        }),
        loading: false,
        success: true,
        error: []
      }
    case DELETE_TODO_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case UPDATE_TODO:
      return {
        ...state,
        index: action.index,
        loading: true,
        success: false,
        error: []
      }
    case UPDATE_TODO_SUCCESS:
      return {
        ...state,
        data: state.data.map(todo =>
          todo.id === action.index ? {...todo, done: !todo.done} : todo
        ),
        loading: false,
        success: true,
        error: []
      }
    case UPDATE_TODO_FAILURE:
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

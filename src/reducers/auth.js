import {
  LOG_OUT,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE
} from '../constants/actionTypes';

const initialState = {
  data: [],
  loading: false,
  success: false,
  error: []
}

export default function auth (state = initialState, action) {
  switch(action.type) {
    case LOG_OUT:
      return {
        ...state,
        data: [],
        loading: true,
        success: false,
        error: []
      }
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: []
      }
    case LOG_OUT_FAILURE:
      return {
        ...state,
        data: [],
        loading: false,
        success: false,
        error: action.error
      }
    case SIGN_IN:
      return {
        ...state,
        data: action.data,
        loading: true,
        success: false,
        error: []
      }
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
        success: true,
        error: []
      }
    case SIGN_IN_FAILURE:
      return {
        ...state,
        data: [],
        loading: false,
        success: false,
        error: action.error
      }
    case SIGN_UP:
      return {
        ...state,
        data: action.data,
        loading: true,
        success: false,
        error: []
      }
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
        success: true,
        error: []
      }
    case SIGN_UP_FAILURE:
      return {
        ...state,
        data: [],
        loading: false,
        success: false,
        error: action.error
      }
    default:
      return state;
  }
}

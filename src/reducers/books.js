import {
  ADD_BOOK,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAILURE,
  FETCH_BOOKS,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE
} from '../constants/actionTypes';

const initialState = {
  data: [],
  new: {},
  book: {},
  loading: false,
  success: false,
  error: []
}

export default function todos (state = initialState, action) {
  switch(action.type) {
    case ADD_BOOK:
      return {
        ...state,
        new: action.new_book,
        loading: true,
        success: false,
        error: []
      }
    case ADD_BOOK_SUCCESS:
      return {
        ...state,
        book: action.book,
        loading: false,
        success: true,
        error: []
      }
    case ADD_BOOK_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case FETCH_BOOKS:
      return {
        ...state,
        loading: true,
        success: false,
        error: []
      }
    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
        success: true,
        error: []
      }
    case FETCH_BOOKS_FAILURE:
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

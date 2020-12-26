import {
  ADD_BOOK,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAILURE,
  FETCH_BOOKS,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE
} from '../constants/actionTypes';

export const addProduct = new_book => ({
  type: ADD_BOOK,
  new_book
})

export const addBookSuccess = book => ({
  type: ADD_BOOK_SUCCESS,
  book
})

export const addBookFailure = error => ({
  type: ADD_BOOK_FAILURE,
  error
})

export const fetchbooks = () => ({
  type: FETCH_BOOKS
})

export const fetchBooksSuccess = data => ({
  type: FETCH_BOOKS_SUCCESS,
  data
})

export const fetchBooksFailure = error => ({
  type: FETCH_BOOKS_FAILURE,
  error
})

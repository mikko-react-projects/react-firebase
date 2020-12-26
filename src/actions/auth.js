
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

export const logOut = () => ({
  type: LOG_OUT
})

export const logOutSuccess = data => ({
  type: LOG_OUT_SUCCESS,
  data
})

export const logOutFailure = error => ({
  type: LOG_OUT_FAILURE,
  error
})

export const signUp = data => ({
  type: SIGN_UP,
  data
})

export const signUpSuccess = data => ({
  type: SIGN_UP_SUCCESS,
  data
})

export const signUpFailure = error => ({
  type: SIGN_UP_FAILURE,
  error
})

export const signIn = data => ({
  type: SIGN_IN,
  data
})

export const signInSuccess = data => ({
  type: SIGN_IN_SUCCESS,
  data
})

export const signInFailure = error => ({
  type: SIGN_IN_FAILURE,
  error
})

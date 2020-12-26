import { put, fork, takeLatest, call } from 'redux-saga/effects';
import {
  LOG_OUT,
  SIGN_UP,
  SIGN_IN
} from '../constants/actionTypes';
import {
  logOutSuccess, logOutFailure,
  signUpSuccess, signUpFailure,
  signInSuccess, signInFailure,
} from '../actions/auth';
import rsf from '../firebase/rsf'

export function* logOut() {
  try {
    const data = yield call(rsf.auth.signOut);
    localStorage.removeItem('todoToken');
    yield put(logOutSuccess(data));
  } catch(error) {
    yield put(logOutFailure(error));
  }
}

export function* signUp(data) {
  try {
    const user = yield call(rsf.auth.createUserWithEmailAndPassword, data.data.email, data.data.password);
    yield put(signUpSuccess(user));
  } catch(error) {
    yield put(signUpFailure(error));
  }
}

export function* signIn(data) {
  try {
    const user = yield call(rsf.auth.signInWithEmailAndPassword, data.data.email, data.data.password);
    const payload = {
      token: user.user.uid,
      email: user.user.email
    }
    localStorage.todoToken = payload;
    yield put(signInSuccess(payload));
  } catch(error) {
    yield put(signInFailure(error));
  }
}

export function* watchLogOut() {
  yield takeLatest(LOG_OUT, logOut);
}

export function* watchSignUp() {
  yield takeLatest(SIGN_UP, signUp);
}

export function* watchSignIn() {
  yield takeLatest(SIGN_IN, signIn);
}
// eslint-disable-next-line
export default function* () {
  yield fork(watchLogOut);
  yield fork(watchSignUp);
  yield fork(watchSignIn);
}

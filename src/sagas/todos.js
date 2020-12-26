import { put, fork, takeLatest, call } from 'redux-saga/effects';
import {
  ADD_TODO,
  FETCH_TODOS,
  DELETE_TODO,
  UPDATE_TODO
} from '../constants/actionTypes';
import {
  addTodoSuccess, addTodoFailure,
  fetchTodosSuccess, fetchTodosFailure,
  deleteTodoSuccess, deleteTodoFailure,
  updateTodoSuccess, updateTodoFailure
} from '../actions/todos';
import rsf from '../firebase/rsf'

export function* addTodo(param) {
  try {
    const new_date = new Date();
    const docRef = yield call(rsf.firestore.addDocument,'todos',
    {
      todo: param.new_todo,
      done: false,
      date: new_date,
    });
    yield put(addTodoSuccess(
      docRef.id,
      param.new_todo,
      Math.round(new_date.getTime()/1000)
    ));
  } catch(error) {
    yield put(addTodoFailure(error));
  }
}

export function* fetchTodos() {
  try {
    const snap = yield call(rsf.firestore.getCollection, 'todos');
    const res = [];
    for (let i = 0; i < snap.docs.length; i++) {
      res.push({
        id: snap.docs[i].id,
        todo: snap.docs[i].data().todo,
        done: snap.docs[i].data().done,
        date: {seconds: snap.docs[i].data().date.seconds}
      })
    }
    yield put(fetchTodosSuccess(res));
  } catch(error) {
    yield put(fetchTodosFailure(error));
  }
}

export function* deleteTodo(data) {
  try {
    yield call(rsf.firestore.deleteDocument, `todos/${data.id}`);
    yield put(deleteTodoSuccess(data.id));
  } catch(error) {
    yield put(deleteTodoFailure(error));
  }
}

export function* updateTodo(data) {
  try {
    yield call(rsf.firestore.updateDocument, `todos/${data.index}`, {
      done: true,
    });
    yield put(updateTodoSuccess(data.index));
  } catch(error) {
    yield put(updateTodoFailure(error));
  }
}

export function* watchAddTodo() {
  yield takeLatest(ADD_TODO, addTodo);
}

export function* watchFetchTodos() {
  yield takeLatest(FETCH_TODOS, fetchTodos);
}

export function* watchDeleteTodo() {
  yield takeLatest(DELETE_TODO, deleteTodo);
}

export function* watchUpdateTodo() {
  yield takeLatest(UPDATE_TODO, updateTodo);
}
// eslint-disable-next-line
export default function* () {
  yield fork(watchAddTodo);
  yield fork(watchFetchTodos);
  yield fork(watchDeleteTodo);
  yield fork(watchUpdateTodo);
}

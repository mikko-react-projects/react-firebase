import { put, fork, takeLatest, call } from 'redux-saga/effects';
import {
  ADD_TASK,
  FETCH_TASKS,
  DELETE_TASK,
  UPDATE_TASK
} from '../constants/actionTypes';
import {
  addTaskSuccess, addTaskFailure,
  fetchTasksSuccess, fetchTasksFailure,
  deleteTaskSuccess, deleteTaskFailure,
  updateTaskSuccess, updateTaskFailure
} from '../actions/tasks';
import rsf from '../firebase/rsf'

export function* addTask(task) {
  try {
    const docRef = yield call(rsf.firestore.addDocument,'tasks', task.task);
    yield put(addTaskSuccess({id: docRef.id, ...task.task}));
  } catch(error) {
    yield put(addTaskFailure(error));
  }
}

export function* fetchTasks() {
  try {
    const snap = yield call(rsf.firestore.getCollection, 'tasks');
    const res = [];
    for (let i = 0; i < snap.docs.length; i++) {
        res.push({
          id: snap.docs[i].id,
          year: snap.docs[i].data().year,
          month: snap.docs[i].data().month,
          day: snap.docs[i].data().day,
          tasks: [...snap.docs[i].data().tasks]
        })
    }
    yield put(fetchTasksSuccess(res));
  } catch(error) {
    yield put(fetchTasksFailure(error));
  }
}

export function* deleteTask(task) {
  try {
    yield call(rsf.firestore.deleteDocument, `tasks/${task.id}`);
    yield put(deleteTaskSuccess(task.id));
  } catch(error) {
    yield put(deleteTaskFailure(error));
  }
}

export function* updateTask(task) {
  console.log(task.update)
  try {
    yield call(rsf.firestore.updateDocument, `tasks/${task.update.task.id}`, {
      tasks: [...task.update.task.tasks, task.update.new_task]
    });
    yield put(updateTaskSuccess(task.update.task.id, task.update.new_task));
  } catch(error) {
    yield put(updateTaskFailure(error));
  }
}

export function* watchAddTask() {
  yield takeLatest(ADD_TASK, addTask);
}

export function* watchFetchTasks() {
  yield takeLatest(FETCH_TASKS, fetchTasks);
}

export function* watchDeleteTask() {
  yield takeLatest(DELETE_TASK, deleteTask);
}

export function* watchUpdateTask() {
  yield takeLatest(UPDATE_TASK, updateTask);
}

// eslint-disable-next-line
export default function* () {
  yield fork(watchAddTask);
  yield fork(watchFetchTasks);
  yield fork(watchDeleteTask);
  yield fork(watchUpdateTask);
}

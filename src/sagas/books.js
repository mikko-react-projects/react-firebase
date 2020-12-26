import { put, fork, takeLatest, call } from 'redux-saga/effects';
import {
  ADD_BOOK,
  FETCH_BOOKS
} from '../constants/actionTypes';
import {
  addBookSuccess, addBookFailure,
  fetchBooksSuccess, fetchBooksFailure
} from '../actions/books';
import rsf from '../firebase/rsf'

export function* addProduct(action) {
  console.log(action)
  try {
    const task = rsf.storage.uploadFile(action.new_product.name, action.new_product.file);
    task.on('state_changed', snapshot => {
      const pct = (snapshot.bytesTransferred * 100) / snapshot.totalBytes
      console.log(`${pct}%`)
    })
    yield task;
    const urlWithToken = yield call(rsf.storage.getDownloadURL, action.new_product.name)
    const url_list = urlWithToken.split("&token=");
    const url = url_list[0];
    const docRef = yield call(rsf.firestore.addDocument,'books',
    {
      bookName: action.new_product.bookName,
      author: action.new_product.author,
      publisher: action.new_product.publisher,
      year: action.new_product.year,
      category: action.new_product.category,
      price: action.new_product.price,
      url: url
    });
    yield put(addBookSuccess({
      id: docRef.id,
      bookName: action.new_product.bookName,
      author: action.new_product.author,
      publisher: action.new_product.publisher,
      year: action.new_product.year,
      category: action.new_product.category,
      price: action.new_product.price,
      url: url
    }));
} catch(error) {
    yield put(addBookFailure(error));
  }
}

export function* fetchbooks() {
  try {
    const snap = yield call(rsf.firestore.getCollection, 'books');
    const res = [];
    for (let i = 0; i < snap.docs.length; i++) {
      res.push({
        id: snap.docs[i].id,
        bookName: snap.docs[i].data().bookName,
        author: snap.docs[i].data().author,
        publisher: snap.docs[i].data().publisher,
        year: snap.docs[i].data().year,
        category: snap.docs[i].data().category,
        price: snap.docs[i].data().price,
        url: snap.docs[i].data().url
      })
    }
    yield put(fetchBooksSuccess());
  } catch(error) {
    yield put(fetchBooksFailure(error));
  }
}

export function* watchAddProduct() {
  yield takeLatest(ADD_BOOK, addProduct);
}

export function* watchFetchbooks() {
  yield takeLatest(FETCH_BOOKS, fetchbooks);
}
// eslint-disable-next-line
export default function* () {
  yield fork(watchAddProduct);
  yield fork(watchFetchbooks);
}

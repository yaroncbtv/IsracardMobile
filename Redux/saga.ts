import {call, put, takeLatest} from 'redux-saga/effects';
import {getApi} from '../Api/apiService';
import {addBookToList} from './appSlice';
import {Book} from '../Interface/Book';

function* fetchBooksSaga() {
  try {
    const books: Book[] = yield call(
      getApi,
      'https://potterapi-fedeperin.vercel.app/en/books',
    );
    const updatedBooks = books.map(book => ({
      ...book,
      isSave: false,
    }));
    yield put(addBookToList(updatedBooks));
  } catch (error: any) {
    console.log(error);
  }
}

export function* booksSaga() {
  yield takeLatest('books/fetchBooks', fetchBooksSaga);
}

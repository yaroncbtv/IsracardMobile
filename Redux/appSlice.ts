import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from './store';
import {Book} from '../Interface/Book';
interface State {
  value: number;
  booksList: Book[];
  bookFavoritesList: Book[];
}

const initialState: State = {
  value: 0,
  booksList: [],
  bookFavoritesList: [],
};

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    addBookToList: (state, action: PayloadAction<Book[]>) => {
      state.booksList = action.payload;
    },
    saveBookToFavoritesList: (state, action: PayloadAction<Book>) => {
      state.bookFavoritesList.push(action.payload);
    },
    saveAllBooksToFavoritesList: (state, action: PayloadAction<Book[]>) => {
      state.bookFavoritesList = action.payload;
    },
    removeBookFromFavoritesList: (state, action: PayloadAction<Book>) => {
      state.bookFavoritesList = state.bookFavoritesList.filter(
        item => item.index !== action.payload.index,
      );
    },
  },
});

export const {
  addBookToList,
  saveBookToFavoritesList,
  removeBookFromFavoritesList,
  saveAllBooksToFavoritesList,
} = appSlice.actions;

export const selectCount = (state: RootState) => state.appSlice.value;

export default appSlice.reducer;

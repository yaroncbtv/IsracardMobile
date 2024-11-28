import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from './store';
import {Book} from '../Interface/Book';
interface State {
  value: number;
  booksList: Book[];
  bookFavoritesList: Book[];
}

// Define the initial state using that type
const initialState: State = {
  value: 0,
  booksList: [],
  bookFavoritesList: [],
};

export const appSlice = createSlice({
  name: 'appSlice',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    addBookToList: (state, action: PayloadAction<Book[]>) => {
      state.booksList = action.payload;
    },
    saveBookToFavoritesList: (state, action: PayloadAction<Book>) => {
      state.bookFavoritesList.push(action.payload);
    },
    removeBookFromFavoritesList: (state, action: PayloadAction<Book>) => {
      console.log(action.payload.index);

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
} = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.appSlice.value;

export default appSlice.reducer;

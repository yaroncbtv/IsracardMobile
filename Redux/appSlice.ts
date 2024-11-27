import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from './store';

// Define a type for the slice state
interface Book {
  number: number;
  title: string;
  originalTitle: string;
  releaseDate: string;
  description: string;
  pages: number;
  cover: string;
  index: number;
}

interface State {
  value: number;
  booksList: Array<Book>;
}

// Define the initial state using that type
const initialState: State = {
  value: 0,
  booksList: [],
};

export const appSlice = createSlice({
  name: 'counter',
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
    addBookToList: (state, action: PayloadAction<Array<Book>>) => {
      state.booksList = action.payload;
    },
  },
});

export const {increment, decrement, incrementByAmount} = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.appSlice.value;

export default appSlice.reducer;

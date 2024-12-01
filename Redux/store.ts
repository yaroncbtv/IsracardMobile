import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import appSlice from './appSlice';
import {persistReducer, persistStore} from 'redux-persist';
import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {booksSaga} from './saga';

const CACHE_PURGE_KEY = 'lastPurgeTimestamp';
const PURGE_INTERVAL = 24 * 60 * 60 * 1000;

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  appSlice: appSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});
sagaMiddleware.run(booksSaga);

export const persistor = persistStore(store);

const checkAndPurgeCache = async () => {
  try {
    const lastPurgeTimestamp = await AsyncStorage.getItem(CACHE_PURGE_KEY);
    const now = Date.now();

    if (
      !lastPurgeTimestamp ||
      now - parseInt(lastPurgeTimestamp, 10) >= PURGE_INTERVAL
    ) {
      await persistor.purge();
      console.log('Cache purged after 24 hours.');

      await AsyncStorage.setItem(CACHE_PURGE_KEY, now.toString());
    } else {
      console.log('Cache is still valid.');
    }
  } catch (error) {
    console.error('Error checking or purging cache:', error);
  }
};

// Run the purge check on app start
checkAndPurgeCache();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

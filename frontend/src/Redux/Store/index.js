import { createStore, compose } from 'redux';
import CombinedReducers from '../Reducers/index';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['AuthReducer'],
};
const persistedReducer = persistReducer(persistConfig, CombinedReducers);
const composeEnhancer =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    : null || compose;
export const store = createStore(persistedReducer, composeEnhancer);
export const persistor = persistStore(store);
export const dispatchAction = store.dispatch;

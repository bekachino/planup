import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { dataReducer } from '../features/data/dataSlice';
import { userReducer } from '../features/user/usersSlice';

const usersPersistConfig = {
  key: 'PlanUp:user',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  userState: persistReducer(usersPersistConfig, userReducer),
  dataState: dataReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

export const persistor = persistStore(store);

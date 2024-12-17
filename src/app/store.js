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
import { filtersDataReducer } from '../features/statuses/filtersDataSlice';
import { worksReducer } from '../features/works/worksSlice';

const usersPersistConfig = {
  key: 'PlanUp:user',
  storage,
  whitelist: ['user'],
};

const worksPersistConfig = {
  key: 'PlanUp:works',
  storage,
  whitelist: ['shownFields'],
};

const rootReducer = combineReducers({
  userState: persistReducer(usersPersistConfig, userReducer),
  dataState: dataReducer,
  filtersDataState: filtersDataReducer,
  worksState: persistReducer(worksPersistConfig, worksReducer),
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

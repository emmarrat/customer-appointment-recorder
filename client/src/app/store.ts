import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { usersReducer } from '../dispatchers/users/usersSlice';

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist/es/constants';
import { expertReducer } from '../dispatchers/experts/expertsSlice';
import { serviceHoursReducer } from '../dispatchers/serviceHours/serviceHoursSlice';
import { appointmentsReducer } from '../dispatchers/appointemtns/appointmentsSlice';
import { categoriesReducer } from '../dispatchers/categories/categoriesSlice';

const usersPersistConfig = {
  key: 'appointment-recorder:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  users: persistReducer(usersPersistConfig, usersReducer),
  experts: expertReducer,
  serviceHours: serviceHoursReducer,
  appointments: appointmentsReducer,
  categories: categoriesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

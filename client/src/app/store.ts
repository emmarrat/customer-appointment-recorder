import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {usersReducer} from "../features/users/usersSlice";

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants';
import {expertReducer} from "../features/experts/expertsSlice";
import {serviceHoursReducer} from "../features/serviceHours/serviceHoursSlice";

const usersPersistConfig = {
  key: 'appointment-recorder:users',
  storage,
  whitelist: ['user']
}

const rootReducer = combineReducers({
  users: persistReducer(usersPersistConfig,usersReducer),
  experts: expertReducer,
  serviceHours: serviceHoursReducer,
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
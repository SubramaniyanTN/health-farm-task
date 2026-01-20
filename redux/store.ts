import {
  combineReducers,
  configureStore
} from '@reduxjs/toolkit';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import AuthSlice from './auth/auth';
import HasSeenWelcomeSlice from './hasSeenWelcome/hasSeenWelcome';
import { reduxStorage } from './mmkvStorage';
import ThemeSlice from './theme/theme';

const reducers = combineReducers({
  auth: AuthSlice,
  hasSeenWelcome: HasSeenWelcomeSlice,
  theme: ThemeSlice,
});

const rootReducer = (
  state: ReturnType<typeof reducers> | undefined,
  action: { type: string },
) => {
  if (action.type === 'RESET_ALL') {
    return reducers(
      {
        hasSeenWelcome: state?.hasSeenWelcome,
        theme: state?.theme,
      } as ReturnType<typeof reducers>,
      action,
    );
  }
  return reducers(state, action);
};

const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
  key: 'root',
  storage: reduxStorage,
  blacklist: [
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false });
  },
});

export const persistor = persistStore(store);

export type ReduxStoreType = typeof store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

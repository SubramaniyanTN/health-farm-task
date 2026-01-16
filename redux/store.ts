import {
  combineReducers,
  configureStore,
  ConfigureStoreOptions,
} from '@reduxjs/toolkit';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import { reduxStorage } from './mmkvStorage';

const reducers = combineReducers({
});

const rootReducer = (
  state: ReturnType<typeof reducers> | undefined,
  action: { type: string },
) => {
  if (action.type === 'RESET_ALL') {
    state = undefined;
  }
  return reducers(state, action);
};

const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
  key: 'root',
  storage: reduxStorage,
  blacklist: [
    // "ForceUpdateReducer"
    "ConfirmationModalReducer",
    "BottomSheetReducer",
    "ChatReducer",
    "MessageReducer",
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const createEnhancers: ConfigureStoreOptions['enhancers'] = (
  getDefaultEnhancers,
) => {
  if (__DEV__) {
    const reactotron = require('../ReactotronConfig').default;
    return getDefaultEnhancers().concat(reactotron.createEnhancer());
  } else {
    return getDefaultEnhancers();
  }
};

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false });
  },
  enhancers: createEnhancers,
});

export const persistor = persistStore(store);

export type ReduxStoreType = typeof store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

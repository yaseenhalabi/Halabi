import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import themeSlice from './themeSlice';
import onboardingSlice from './onboardingSlice';
import contactsSlice from './contactsSlice';
import tagsSlice from './tagsSlice';
import selectionSlice from './selectionSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  user: userSlice,
  theme: themeSlice,
  onboarding: onboardingSlice,
  contacts: contactsSlice,
  tags: tagsSlice,
  selection: selectionSlice,
});
// const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  // reducer: persistedReducer,
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/PURGE', 'persist/REHYDRATE'],
        ignoredPaths: ['register', 'rehydrate'],
      },
    }),
});

// const persistor = persistStore(store);

// export { store, persistor };
export { store };
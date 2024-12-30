import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import themeSlice from './themeSlice';
import contactsSlice from './contactsSlice';
import tagsSlice from './tagsSlice';
import selectContactsSlice from './selectContactsSlice';
import filterContactsSlice from './filterContactsSlice';
import filterTagsSlice from './filterTagsSlice';
import selectTagsSlice from './selectTagsSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  user: userSlice,
  theme: themeSlice,
  contacts: contactsSlice,
  tags: tagsSlice,
  selection: selectContactsSlice,
  filter: filterContactsSlice,
  filterTags: filterTagsSlice,
  tagSelection: selectTagsSlice,
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
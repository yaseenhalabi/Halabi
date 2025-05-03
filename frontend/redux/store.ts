import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userSlice from "./userSlice";
import themeSlice, { initialThemeState } from "./themeSlice";
import contactsSlice from "./contactsSlice";
import tagsSlice from "./tagsSlice";
import selectContactsSlice from "./selectContactsSlice";
import filterContactsSlice from "./filterContactsSlice";
import filterTagsSlice from "./filterTagsSlice";
import selectTagsSlice from "./selectTagsSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  version: 3, // ⬅️ Bump version
  whitelist: ["user", "theme", "contacts", "tags", "filter", "filterTags"],
  migrate: async (state: any) => {
    if (state) {
      return {
        ...state,
        theme: initialThemeState,
      };
    }
    return state;
  },
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

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/PURGE",
          "persist/REHYDRATE",
        ],
        ignoredPaths: ["register", "rehydrate"],
      },
    }),
});

export const persistor = persistStore(store);

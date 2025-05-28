import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tag } from "../utils/types";
const initialState: Tag[] = [];

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    setTags: (state, action: PayloadAction<Tag[]>) => {
      return action.payload;
    },
    addTag: (state, action: PayloadAction<Tag>) => {
      const exists = state.some((tag) => tag.id === action.payload.id);
      if (exists) return state;
      return [action.payload, ...state];
    },
    removeTag: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter((tag) => tag.id !== action.payload.id);
    },
    updateTag: (state, action: PayloadAction<Tag>) => {
      return state.map((tag) =>
        tag.id === action.payload.id ? action.payload : tag
      );
    },
    deleteSelectedTags: (state, action: PayloadAction<string[]>) => {
      return state.filter((tag) => !action.payload.includes(tag.id));
    },
    resetTags: (state) => {
      return [] as Tag[];
    },
  },
});

export const {
  setTags,
  addTag,
  removeTag,
  updateTag,
  deleteSelectedTags,
  resetTags,
} = tagsSlice.actions;

export default tagsSlice.reducer;

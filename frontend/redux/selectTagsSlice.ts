import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const selectTagsSlice = createSlice({
  name: "tagSelection",
  initialState: {
    selectedTags: [] as string[],
    tagsSelectionMode: false,
  },
  reducers: {
    addSelectedTag: (state, action: PayloadAction<string>) => {
      state.selectedTags.push(action.payload);
    },
    removeSelectedTag: (state, action: PayloadAction<string>) => {
      state.selectedTags = state.selectedTags.filter(
        (tagId) => tagId !== action.payload
      );
    },
    resetSelectedTags: (state) => {
      state.selectedTags = [];
    },
    setTagsSelectionMode: (state, action: PayloadAction<boolean>) => {
      state.tagsSelectionMode = action.payload;
    },
  },
});

export const {
  addSelectedTag,
  removeSelectedTag,
  resetSelectedTags,
  setTagsSelectionMode,
} = selectTagsSlice.actions;

export default selectTagsSlice.reducer;

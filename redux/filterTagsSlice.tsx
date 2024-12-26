import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SortType = 'name' | 'peopleCount' | null;

type FilterTagsState = {
  selectedTagIds: string[];
  sortBy: SortType;
  reverse: boolean;
}
const initialState: FilterTagsState = {
  selectedTagIds: [],
  sortBy: null,
  reverse: false,
};

const filterTagsSlice = createSlice({
  name: 'filterTags',
  initialState,
  reducers: {
    setSelectedFilterTags: (state, action: PayloadAction<string[]>) => {
      state.selectedTagIds = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortType>) => {
      state.sortBy = action.payload;
    },
    setReverse: (state, action: PayloadAction<boolean>) => {
        state.reverse = action.payload;
    },
    resetFilters: (state) => {
      state.selectedTagIds = [];
      state.sortBy = null;
      state.reverse = false;
    },
  },
});

export const { setSelectedFilterTags, setSortBy, resetFilters, setReverse } = filterTagsSlice.actions;

export default filterTagsSlice.reducer;
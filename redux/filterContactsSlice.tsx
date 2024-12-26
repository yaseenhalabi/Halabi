import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SortType = 'name' | 'birthday' | 'tagCount' | null;

type FilterState = {
    selectedTagIds: string[];
    sortBy: SortType;
}

const initialState: FilterState = {
    selectedTagIds: [],
    sortBy: null
}

const filterContactsSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSelectedFilterTags: (state, action: PayloadAction<string[]>) => {
            state.selectedTagIds = action.payload;
        },
        setSortBy: (state, action: PayloadAction<SortType>) => {
            state.sortBy = action.payload;
        },
        resetFilters: (state) => {
            state.selectedTagIds = [];
            state.sortBy = null;
        }
    }
});

export const { setSelectedFilterTags, setSortBy, resetFilters } = filterContactsSlice.actions;
export default filterContactsSlice.reducer;

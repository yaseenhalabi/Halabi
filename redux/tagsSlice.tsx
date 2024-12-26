import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tag } from '../utils/types';
import { testTags } from '../utils/testdata';

const initialState: Tag[] = testTags;

const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        setTags: (state, action: PayloadAction<Tag[]>) => {
            return action.payload;
        },
        addTag: (state, action: PayloadAction<Tag>) => {
            return [...state, action.payload];
        },
        removeTag: (state, action: PayloadAction<{ id: string }>) => {
            return state.filter(tag => tag.id !== action.payload.id);
        },
        updateTag: (state, action: PayloadAction<Tag>) => {
            return state.map(tag => tag.id === action.payload.id ? action.payload : tag);
        },
        deleteSelectedTags: (state, action: PayloadAction<string[]>) => {
            return state.filter(tag => !action.payload.includes(tag.id));
        }
    }
});

export const { setTags, addTag, removeTag, updateTag, deleteSelectedTags } = tagsSlice.actions;

export default tagsSlice.reducer;
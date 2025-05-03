import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setContacts } from './contactsSlice';

type SelectionState = {
    contactsSelectionMode: boolean;
    tagsSelectMode: boolean;
    selectedTags: string[];
    selectedContacts: string[];
}

const initialState: SelectionState = {
    contactsSelectionMode: false,
    tagsSelectMode: false,
    selectedTags: [],
    selectedContacts: []
}
const selectContactsSlice = createSlice({
    name: 'selection',
    initialState: initialState,
    reducers: {
        setContactsSelectionMode: (state, action: PayloadAction<boolean>) => {
            return {
                ...state,
                contactsSelectionMode: action.payload
            }
        },
        setTagsSelectMode: (state, action: PayloadAction<boolean>) => {
            return {
                ...state,
                tagsSelectMode: action.payload
            }
        },
        addSelectedContact: (state, action: PayloadAction<{ id: string}>) => {
            return {
                ...state,
                selectedContacts: [...state.selectedContacts, action.payload.id]
            }
        },
        addSelectedTag: (state, action: PayloadAction<{ id: string}>) => {
            return {
                ...state,
                selectedTags: [...state.selectedTags, action.payload.id]
            }
        },
        removeSelectedContact: (state, action: PayloadAction<{ id: string}>) => {
            return {
                ...state,
                selectedContacts: state.selectedContacts.filter(contact => contact !== action.payload.id)
            }
        },
        removeSelectedTag: (state, action: PayloadAction<{ id: string}>) => {
            return {
                ...state,
                selectedTags: state.selectedTags.filter(tag => tag !== action.payload.id)
            }
        },
        resetSelectedContacts: (state) => {
            return {
                ...state,
                selectedContacts: [],
                contactsSelectionMode: false
            }
        },
        resetSelectedTags: (state) => {
            return {
                ...state,
                selectedTags: []
            }
        }
    }
});

export const { setContactsSelectionMode, setTagsSelectMode, addSelectedContact, addSelectedTag, removeSelectedContact, removeSelectedTag, resetSelectedContacts, resetSelectedTags } = selectContactsSlice.actions;

export default selectContactsSlice.reducer;
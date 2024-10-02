import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '../utils/types';
import { testContacts } from '../utils/testdata'; 

const initialState: Contact[] = testContacts;

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        setContacts: (state, action: PayloadAction<Contact[]>) => {
            return action.payload;
        },
        updateContact: (state, action: PayloadAction<Contact>) => {
            return state.map(contact => contact.id === action.payload.id ? action.payload : contact);
        },
        addContact: (state, action: PayloadAction<Contact>) => {
            return [...state, action.payload];
        },
        removeContact: (state, action: PayloadAction<{ id: string }>) => {
            return state.filter(contact => contact.id !== action.payload.id);
        }
    }
});

export const { setContacts, updateContact, addContact, removeContact } = contactsSlice.actions;

export default contactsSlice.reducer;
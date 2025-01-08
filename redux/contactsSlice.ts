import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact, Tag } from '../utils/types';
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
        updateContactId: (state, action: PayloadAction<{ oldId: string, newId: string }>) => {
            return state.map(contact => contact.id === action.payload.oldId ? { ...contact, id: action.payload.newId } : contact);
        },
        addContact: (state, action: PayloadAction<Contact>) => {
            return [action.payload, ...state];
        },
        addMultipleContacts: (state, action: PayloadAction<Contact[]>) => {
            return [...action.payload, ...state]
        },
        removeContact: (state, action: PayloadAction<{ id: string }>) => {
            return state.filter(contact => contact.id !== action.payload.id);
        },
        addTagToContact: (state, action: PayloadAction<{ contactId: string, tagId: string }>) => {
            return state.map(contact => contact.id === action.payload.contactId ? { ...contact, tags: [...contact.tags, action.payload.tagId] } : contact);
        },
        removeTagFromContact: (state, action: PayloadAction<{ contactId: string, tagId: string }>) => {
            return state.map(contact => contact.id === action.payload.contactId ? { ...contact, tags: contact.tags.filter(tagId => tagId !== action.payload.tagId) } : contact);
        },
        deleteSelectedContacts: (state, action: PayloadAction<string[]>) => {
            return state.filter(contact => !action.payload.includes(contact.id));
        },
        deleteSelectedTagsFromContacts: (state, action: PayloadAction<string[]>) => {
            return state.map(contact => ({ ...contact, tags: contact.tags.filter(tagId => !action.payload.includes(tagId)) }));
        },
        resetContacts: (state) => {
            return [] as Contact[];
        }
    }
});

export const { setContacts, updateContact, updateContactId, addContact, addMultipleContacts, removeContact, addTagToContact, removeTagFromContact, resetContacts, deleteSelectedTagsFromContacts } = contactsSlice.actions;

export default contactsSlice.reducer;
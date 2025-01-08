import { createSlice } from '@reduxjs/toolkit';


const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        index: 1,
        themes: [
            {
                name: 'dark',
                background: '#000000',
                backgroundSecondary: '#141414',
                backgroundTertiary: '#202020',
                button: '#202020',
                smallTag: '#232135',
                text: {
                    full: '#ffffff',
                    semi: '#A6A6A6',
                    muted: '#5B5B5B',
                    semiFull: '#DBDBDB',
                },
            },
            {
                name: 'light',
                background: 'white',
                backgroundSecondary: '#F0F0F0',
                backgroundTertiary: '#E0E0E0',
                button: '#E9E9E9',
                smallTag: '#E9E9E9',
                text: {
                    full: 'black',
                    semi: '#666666',
                    muted: '#333333',
                    semiFull: '#333333',
                },
            },
        ],
    },
    reducers: {
        setTheme: (state, action) => {
            switch (action.payload) {
                case 'dark':
                    state.index = 0;
                    break;
                case 'light':
                    state.index = 1;
                    break;
                default:
                    state.index = 0;
                    break;
            }  
        },
    }
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
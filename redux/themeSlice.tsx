import { createSlice } from '@reduxjs/toolkit';


const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        index: 0,
        themes: [
            {
                name: 'dark',
                background: '#000000',
                backgroundSecondary: '#141414',
                button: '#202020',
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
                backgroundSecondary: '#141414',
                button: '#202020',
                text: {
                    full: 'black',
                    semi: '#A6A6A6',
                    muted: '#5B5B5B',
                    semiFull: '#DBDBDB',
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
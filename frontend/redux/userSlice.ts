import { createSlice } from '@reduxjs/toolkit';

type User = {
    id: string;
    isTutorialComplete: boolean;
}
const userSlice = createSlice({
    name: 'user',
    initialState: {
        isTutorialComplete: false
    } as User,
    reducers: {
        setUser: (state, action) => {
            return action.payload;
        },
        setTutorialComplete: (state) => {
            state.isTutorialComplete = true;
        }
    }
});

export const { setUser, setTutorialComplete } = userSlice.actions;

export default userSlice.reducer;
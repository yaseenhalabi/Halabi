import { createSlice } from '@reduxjs/toolkit';

type User = {
    id: string;
}
const userSlice = createSlice({
    name: 'user',
    initialState: {
    } as User,
    reducers: {
        setUser: (state, action) => {
            return action.payload;
        }
    }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
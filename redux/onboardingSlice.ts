import { createSlice } from '@reduxjs/toolkit';

const onboardingSlice = createSlice({
    name: 'onboarding',
    initialState: {
        isOnboarding: true,
        page: 1, 
   },
    reducers: {
        finishOnboarding: (state, action) => {
            return {...state, isOnboarding: false};
        },
        setPage: (state, action) => {
            return {...state, page: action.payload};
        }
    }
});

export const {finishOnboarding, setPage} = onboardingSlice.actions;

export default onboardingSlice.reducer;
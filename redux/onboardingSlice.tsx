import { createSlice } from '@reduxjs/toolkit';

const onboardingSlice = createSlice({
    name: 'onboarding',
    initialState: true,
    reducers: {
        finishOnboarding: (state, action) => {
            return false;
        }
    }
});

export const {finishOnboarding} = onboardingSlice.actions;

export default onboardingSlice.reducer;